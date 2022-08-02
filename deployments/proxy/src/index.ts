import useReflare from "reflare";

const handleRequest = async (request: Request): Promise<Response> => {
  const reflare = await useReflare();

  const isLocalRequest = request.url.includes("localhost");

  console.log(request.url);

  reflare.push({
    path: "/order*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "order.jackhanford.com",
      protocol: isLocalRequest ? "http" : "https",
      port: isLocalRequest ? 4999 : undefined,
    },
  });

  reflare.push({
    path: "/admin*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "admin.jackhanford.com",
      protocol: isLocalRequest ? "http" : "https",
      port: isLocalRequest ? 4997 : undefined,
    },
  });

  reflare.push({
    path: "/checkout*",
    upstream: {
      domain: isLocalRequest ? "localhost" : "checkout.jackhanford.com",
      protocol: isLocalRequest ? "http" : "https",
      port: isLocalRequest ? 4998 : undefined,
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
