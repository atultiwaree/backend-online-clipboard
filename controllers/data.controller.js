const { data_store_model, aggregate_data } = require("../models/data_store.model");
const utils = require("../helpers/utility.functions");
const { msgConstants } = require("../helpers/msg.constants");

module.exports.serving_controller = (req, res) => {
  return res.json({ data: "served" });
};

module.exports.getter_controller = async (req, res) => {
  let aggResult = await aggregate_data(req.params.params_id);

  if (aggResult?.length > 0 && aggResult[0].timeCreated?.toString() === aggResult[0].destroyIn?.toString())
    await data_store_model.updateOne({ _id: aggResult[0]._id }, { view: 1 });

  return res.status(200).json(utils.create_success_response(msgConstants.dataRetrived, aggResult));
};

module.exports.setter_controller = async (req, res) => {
  let obj = Object.assign({});
  for (const i of ["data", "deviceId", "params"]) {
    if (!req.body[i]) return res.json(utils.create_failure_response(`${i} is required field.`));
    else obj[i] = req.body[i];
  }

  if (req.body?.destroyIn) obj["destroyIn"] = utils.set_timer(req.body.destroyIn);

  const isAlreadyExists = await data_store_model.findOne({ params: req.body.params }).select({ __v: 0 });
  if (!isAlreadyExists) {
    await data_store_model(obj).save();
    return res.status(200).json(utils.create_success_response(msgConstants.newFieldCreated));
  } else return res.status(400).json(utils.create_failure_response(msgConstants.tryWithAnotherUrl));
};

module.exports.updater_controller = async (req, res) => {
  for (const i of ["data", "deviceId", "params"])
    if (!req.body[i]) return res.json(utils.create_failure_response(`${i} is required field.`));

  const isDataCreated = await data_store_model.findOne({ params: req.body.params });

  if (isDataCreated) {
    if (isDataCreated.deviceId === req.body.deviceId) {
      isDataCreated["data"] = req.body.data;
      await isDataCreated.save();
      return res.status(200).json(utils.create_success_response(msgConstants.linkUpdatedSuccessfully));
    } else return res.status(400).json(utils.create_failure_response(msgConstants.notAuthenticUser));
  } else return res.status(400).json(utils.create_failure_response(msgConstants.linkWasNotCreated));
};
