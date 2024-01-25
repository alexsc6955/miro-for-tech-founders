const router = require("express").Router();

module.exports = (app) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api", router);
};