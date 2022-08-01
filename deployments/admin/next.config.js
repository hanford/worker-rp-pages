const debug = process.env.NODE_ENV !== "production";

const config = {
  basePath: "/admin",
  assetPrefix: !debug ? "/admin/" : undefined,
};

module.exports = config;
