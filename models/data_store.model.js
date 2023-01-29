const mongoose = require("mongoose");

const data_store_model_schema = mongoose.Schema(
  {
    deviceId: {
      type: String,
      require: true,
    },
    data: {
      type: String,
      default: null,
    },
    params: {
      type: String,
      default: null,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports.data_store_model = mongoose.model("Data", data_store_model_schema);

module.exports.aggregate_data = (params_id) => {
  let aggreation_array = [
    {
      $lookup: {
        from: "datas",
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$params", params_id],
              },
            },
          },
          {
            $project: {
              _id: 0,
              params: 1,
              data: 1,
              deviceId: 1,
            },
          },
        ],
        as: "data",
      },
    },
    {
      $unwind: {
        path: "$data",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        data: 1,
        _id: 0,
      },
    },
  ];
  return this.data_store_model.aggregate(aggreation_array);
};
