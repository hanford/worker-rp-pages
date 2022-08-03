const debug = process.env.NODE_ENV !== "production";

const config = {
  basePath: "/order",
  assetPrefix: !debug ? "/order/" : undefined,
};

module.exports = config;
