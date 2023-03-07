const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// required to handle POST/PUT/PATCH
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// prefix routes with /api
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});

module.exports = server;
