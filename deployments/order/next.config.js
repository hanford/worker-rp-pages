const debug = process.env.NODE_ENV !== "production";

const config = {
  basePath: "/order",
  assetPrefix: !debug ? "/order/" : undefined,
  // async headers() {
  //   // if (debug) return [];

  //   return [
  //     {
  //       source: '/',
  //       headers: [{ key: 'cache-control', value: 'public, max-age=240, s-maxage=60' }],
  //     },
  //     {
  //       source: '/board/:entityId',
  //       headers: [{ key: 'cache-control', value: 'public, max-age=240, s-maxage=60' }],
  //     },
  //   ];
  // },
};

// https://nextjs.org/docs/advanced-features/output-file-tracing
// This is used in the docker file
// config.experimental.outputStandalone = true;

module.exports = config;
