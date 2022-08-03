import useReflare from "./reflare";

const handleRequest = async (request: Request): Promise<Response> => {
  const reflare = await useReflare();

  const isLocalRequest = request.url.includes("localhost");

  console.log(request.url);

  reflare.push({
    path: "/order*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "order.jackhanford.com",
      protocol: isLocalRequest ? undefined : "https",
      port: isLocalRequest ? 4999 : undefined,
      pathRewrite: (path) => {
        console.log({ path });
        // const matchingRoute = routes.find((k) => {
        //   return k.dynamic ? route.match(new RegExp(k.regex)) : k.src === route;
        // });
        if (isLocalRequest) return path;
        return path.replace("/order", "");
      },
    },
  });

  reflare.push({
    path: "/admin*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "admin.jackhanford.com",
      protocol: isLocalRequest ? undefined : "https",
      port: isLocalRequest ? 4997 : 80,
      pathRewrite: (path) => {
        if (isLocalRequest) return path;
        return path.replace("/admin", "");
      },
    },
  });

  reflare.push({
    path: "/checkout*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "checkout.jackhanford.com",
      protocol: isLocalRequest ? undefined : "https",
      port: isLocalRequest ? 4998 : undefined,
      pathRewrite: (path) => {
        if (isLocalRequest) return path;
        return path.replace("/checkout", "");
      },
    },
  });

  reflare.push({
    path: "/*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "menu.jackhanford.com",
      protocol: isLocalRequest ? "http" : "https",
      port: isLocalRequest ? 4996 : undefined,
    },
  });

  return reflare.handle(request);
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
