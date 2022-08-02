import { useUpstream } from "./upstream";
import { createResponse, getHostname } from "./utils";

import {
  Context,
  Reflare,
  Route,
  Pipeline,
  RouteList,
  Middleware,
} from "./types";

const filter = (request: Request, routeList: RouteList): Route | void => {
  const url = new URL(request.url);
  for (const route of routeList) {
    if (route.methods === undefined || route.methods.includes(request.method)) {
      const re = RegExp(
        `^${route.path
          .replace(/(\/?)\*/g, "($1.*)?")
          .replace(/\/$/, "")
          .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3")
          .replace(/\.(?=[\w(])/, "\\.")
          .replace(/\)\.\?\(([^[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`
      );
      if (url.pathname.match(re)) {
        return route;
      }
    }
  }
  return undefined;
};

const useReflare = async (): Promise<Reflare> => {
  const pipeline = usePipeline(useUpstream);

  const routeList: RouteList = [];

  const handle = async (request: Request): Promise<Response> => {
    const route = filter(request, routeList);

    if (route === undefined) {
      return createResponse(
        "Failed to find a route that matches the path and method of the current request",
        500
      );
    }

    const context: Context = {
      request,
      route,
      hostname: getHostname(request),
      response: new Response("Unhandled response"),
      upstream: route.upstream,
    };

    try {
      await pipeline.execute(context);
    } catch (error) {
      if (error instanceof Error) {
        context.response = createResponse(error.message, 500);
      }
    }
    return context.response;
  };

  const unshift = (route: Route) => {
    routeList.unshift(route);
  };

  const push = (route: Route) => {
    routeList.push(route);
  };

  return {
    handle,
    unshift,
    push,
  };
};

const usePipeline = (...initMiddlewares: Middleware[]): Pipeline => {
  const stack: Middleware[] = [...initMiddlewares];

  const push: Pipeline["push"] = (...middlewares: Middleware[]) => {
    stack.push(...middlewares);
  };

  const execute: Pipeline["execute"] = async (context) => {
    const runner = async (prevIndex: number, index: number): Promise<void> => {
      if (index === prevIndex) {
        throw new Error("next() called multiple times");
      }
      if (index >= stack.length) {
        return;
      }

      const middleware = stack[index];
      const next = async () => runner(index, index + 1);
      await middleware(context, next);
    };

    await runner(-1, 0);
  };

  return {
    push,
    execute,
  };
};

export default useReflare;
