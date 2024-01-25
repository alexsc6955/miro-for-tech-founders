const router = require("express").Router();
const indexController = require("../controller");

module.exports = (app) => {
  router.post("/build-business-model", indexController.buildBusinessModel);

  app.use("/api", router);
};