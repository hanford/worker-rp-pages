## Worker proxy for CF Pages

This repo houses a proof of concept using Cloudflare workers to reverse proxy many different frontend applications hosted on Cloudflare Pages.

To get this repo up and running locally:

```
pnpm install
pnpm dev
```

Note that we're using [Miniflare](https://miniflare.dev/) for local development, and the Proxy (CF worker), is currently using a fork of [Reflare](https://github.com/xiaoyang-sde/reflare) while we wait on a PR to be merged.
