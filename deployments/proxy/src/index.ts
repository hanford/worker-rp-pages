// import useReflare from "reflare";

// const handleRequest = async (request: Request): Promise<Response> => {
//   const reflare = await useReflare();

//   const isLocalRequest = request.url.includes("localhost");

//   console.log(request.url);

//   reflare.push({
//     path: "/order*",
//     upstream: {
//       domain: isLocalRequest ? "localhost" : "order.jackhanford.com",
//       protocol: isLocalRequest ? "http" : "https",
//       port: isLocalRequest ? 4999 : undefined,
//     },
//   });

//   reflare.push({
//     path: "/admin",
//     upstream: {
//       domain: isLocalRequest ? "localhost" : "admin-mfe.pages.dev",
//       protocol: isLocalRequest ? "http" : "https",
//       port: isLocalRequest ? 4997 : 80,
//     },
//   });

//   reflare.push({
//     path: "/checkout*",
//     upstream: {
//       domain: isLocalRequest ? "localhost" : "checkout.jackhanford.com",
//       protocol: isLocalRequest ? "http" : "https",
//       port: isLocalRequest ? 4998 : undefined,
//     },
//   });

//   reflare.push({
//     path: "/*",
//     upstream: {
//       domain: isLocalRequest ? "localhost" : "menu.jackhanford.com",
//       protocol: isLocalRequest ? "http" : "https",
//       port: isLocalRequest ? 4996 : undefined,
//     },
//   });

//   return reflare.handle(request);
// };

// addEventListener("fetch", (event) => {
//   event.respondWith(handleRequest(event.request));
// });

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

const map = {
  order: {
    dev: "localhost",
    port: "4999",
    prod: "https://order.jackhanford.com",
  },
  checkout: {
    dev: "localhost",
    port: "4998",
    prod: "https://checkout.jackhanford.com",
  },
  admin: {
    dev: "localhost",
    port: "4997",
    prod: "https://admin.jackhanford.com",
  },
  menu: {
    dev: "localhost",
    port: "4996",
    prod: "https://menu.jackhanford.com",
  },
};

async function handleRequest(request: Request) {
  const url = new URL(request.url);

  const { pathname, hostname } = url;

  const isLocal = hostname.includes("localhost");
  const envKey = isLocal ? "dev" : "prod";
  let destination = "menu";

  if (pathname.startsWith("/admin")) {
    destination = "admin";
  } else if (pathname.startsWith("/checkout")) {
    destination = "checkout";
  } else if (pathname.startsWith("/order")) {
    destination = "order";
  }

  if (isLocal) {
    url.port = map[destination].port;
  } else {
    url.pathname = url.pathname.replace(`/${destination}`, "");
  }

  url.hostname = map[destination][envKey];

  // eslint-disable-next-line
  // @ts-ignore
  const response = await fetch(url, request);
  return response;
}
