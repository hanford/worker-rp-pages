import useReflare from "reflare";

const handleRequest = async (request: Request): Promise<Response> => {
  const reflare = await useReflare();

  reflare.push({
    path: "/order*",
    upstream: {
      domain: "localhost",
      protocol: "http",
      port: 4999,
    },
  });

  reflare.push({
    path: "/admin*",
    upstream: {
      domain: "localhost",
      protocol: "http",
      port: 4997,
    },
  });

  reflare.push({
    path: "/checkout*",
    upstream: {
      domain: "localhost",
      protocol: "http",
      port: 4998,
    },
  });

  reflare.push({
    path: "/*",
    upstream: {
      domain: "localhost",
      protocol: "http",
      port: 4996,
    },
  });

  return reflare.handle(request);
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
