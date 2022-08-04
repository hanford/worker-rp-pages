import { decode } from "next-static-manifest/dist/utils";
// @ts-expect-error
import encodedManifest from "./next-static-manifest.json";

const manifest = decode(JSON.stringify(encodedManifest));

const dynamicRouteMiddleware = async ({ next, request }) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/order")) {
    url.pathname = url.pathname.replace("/order", "");
  }

  const matchingRoute = manifest.find((k) => {
    return k.dynamic
      ? url.pathname.match(new RegExp(k.regex))
      : k.src === url.pathname;
  });

  if (matchingRoute) {
    url.pathname = matchingRoute.src;
  }

  console.log({ url });

  const response = await next(new Request(url.href));

  response.headers.set("_middleware", true);

  return response;
};

export const onRequest = [dynamicRouteMiddleware];
