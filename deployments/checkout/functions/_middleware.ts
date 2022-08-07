import { decode } from "nsm-fork/dist/utils";
import encodedManifest from "./next-static-manifest.json";

const manifest = decode(JSON.stringify(encodedManifest));

const dynamicRouteMiddleware: PagesFunction = async ({ next, request }) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/checkout")) {
    url.pathname = url.pathname.replace("/checkout", "");
  }

  // const matchingRoute = manifest.find((k) => {
  //   return k.dynamic
  //     ? url.pathname.match(new RegExp(k.regex))
  //     : k.src === url.pathname;
  // });

  // if (matchingRoute) {
  //   url.pathname = matchingRoute.src;
  // }

  const response = await next(
    new Request(url, {
      // https://discord.com/channels/595317990191398933/910978223968518144/1004857811513131038
      // https://github.com/cloudflare/wrangler2/issues/370
      // @ts-expect-error
      cf: request.cf,
    })
  );

  // if (matchingRoute) {
  //   response.headers.set("x-match", matchingRoute.src);
  // }

  response.headers.set("x-middleware", url.href);
  response.headers.set("x-manifest", JSON.stringify(manifest));

  return response;
};

export const onRequest = [dynamicRouteMiddleware];
