const debug = process.env.NODE_ENV !== "production";

const config = {
  basePath: "/checkout",
  assetPrefix: !debug ? "/checkout/" : undefined,
};

module.exports = config;
