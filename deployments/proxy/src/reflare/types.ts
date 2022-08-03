export interface UpstreamOptions {
  domain: string;
  protocol?: "http" | "https";
  port?: number;
  timeout?: number;
  weight?: number;
  pathRewrite?: (k: string) => string;
}

export interface Route {
  path: string;
  upstream: UpstreamOptions;
  methods?: string[];
}

export interface Context {
  route: Route;
  hostname: string;
  request: Request;
  response: Response;
  upstream: UpstreamOptions | null;
}

export type RouteList = Route[];

export interface Reflare {
  handle: (request: Request) => Promise<Response>;
  unshift: (route: Route) => void;
  push: (route: Route) => void;
}

export type Middleware = (
  context: Context,
  next: () => Promise<void | null> | void | null
) => Promise<void | null> | void | null;

export interface Pipeline {
  push: (...middlewares: Middleware[]) => void | null;
  execute: (context: Context) => Promise<void | null>;
}
