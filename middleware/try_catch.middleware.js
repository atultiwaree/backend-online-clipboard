const { msgConstants } = require("../helpers/msg.constants");
const utils = require("../helpers/utility.functions");

module.exports.async_try_catch_middleware = (loaded_function) => {
  return async (req, res) => {
    try {
      await loaded_function(req, res);
    } catch (error) {
      console.log("::::Controller Error - ::::", error.message, error.stack);
      return res.status(400).json(utils.create_failure_response(msgConstants.somethingWentWrong));
    }
  };
};
