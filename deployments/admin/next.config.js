const debug = process.env.NODE_ENV !== "production";

console.log({ debug });

const config = {
  basePath: "/admin",
  assetPrefix: !debug ? "/admin/" : undefined,
};

module.exports = config;
