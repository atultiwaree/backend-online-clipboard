const express = require("express");
const routes = express.Router();

const main_routes = require("./data.routes");

routes.use("/", main_routes);

module.exports = routes;
