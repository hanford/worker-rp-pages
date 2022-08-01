import { createServer } from "http";
import httpProxy from "http-proxy";
import express from "express";

const PORT = process.env.PORT || 5000;
const app = express();

const admin = httpProxy.createProxyServer({
  target: "http://localhost:4997",
  ws: true,
});

const checkout = httpProxy.createProxyServer({
  target: "http://localhost:4998",
  ws: true,
});

const order = httpProxy.createProxyServer({
  target: "http://localhost:4999",
  ws: true,
});

const menu = httpProxy.createProxyServer({
  target: "http://localhost:4996",
  ws: true,
});

const server = createServer(app);

app.get("/admin*", function proxy(req, res) {
  admin.web(req, res, {}, function onProxyError(err) {
    // eslint-disable-next-line no-console
    console.log("Error!", err);
  });
});

app.get("/checkout*", function proxy(req, res) {
  checkout.web(req, res, {}, function onProxyError(err) {
    // eslint-disable-next-line no-console
    console.log("Error!", err);
  });
});

app.get("/order*", function proxy(req, res) {
  order.web(req, res, {}, function onProxyError(err) {
    // eslint-disable-next-line no-console
    console.log("Error!", err);
  });
});

app.get("/*", function proxy(req, res) {
  menu.web(req, res, {}, function onProxyError(err) {
    // eslint-disable-next-line no-console
    console.log("Error!", err);
  });
});

// Proxy websockets (HMR)
server.on("upgrade", function proxy(req, socket, head) {
  if (req.url.includes("checkout")) {
    checkout.ws(req, socket, head);
  } else if (req.url.includes("admin")) {
    admin.ws(req, socket, head);
  } else if (req.url.includes("order")) {
    order.ws(req, socket, head);
  } else {
    menu.ws(req, socket, head);
  }
});

console.log("frontend-proxy listening on", PORT);

server.listen(PORT);
