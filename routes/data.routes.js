const express = require("express");
const { getter_controller, setter_controller } = require("../controllers/data.controller");
const { async_try_catch_middleware } = require("../middleware/try_catch.middleware");
const routes = express.Router();

routes.get("/", async_try_catch_middleware(getter_controller));
routes.post("/savedata", async_try_catch_middleware(setter_controller));

module.exports = routes;
