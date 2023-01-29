const express = require("express");
const dc = require("../controllers/data.controller");
const { async_try_catch_middleware } = require("../middleware/try_catch.middleware");
const routes = express.Router();

routes.get("/", async_try_catch_middleware(dc.serving_controller));
routes.get("/:params_id", async_try_catch_middleware(dc.getter_controller));
routes.post("/savedata", async_try_catch_middleware(dc.setter_controller));
routes.put("/updatedata", async_try_catch_middleware(dc.updater_controller));

module.exports = routes;
