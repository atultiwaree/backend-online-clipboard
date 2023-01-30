const mongoose = require("mongoose");

const data_store_model_schema = mongoose.Schema({
  deviceId: {
    type: String,
    require: true,
  },
  data: {
    type: String,
    default: null,
  },
  view: {
    type: Number,
    default: 0,
  },
  timeCreated: {
    type: Date,
    default: new Date(),
  },
  destroyIn: {
    type: Date,
    default: new Date(),
  },
  params: {
    type: String,
    default: null,
    require: true,
  },
});

module.exports.data_store_model = mongoose.model("Data", data_store_model_schema);

module.exports.aggregate_data = (params_id) => {
  let aggreation_array = [
    {
      $addFields: {
        nowTiming: new Date(),
      },
    },
    {
      $match: {
        $expr: {
          $or: [
            {
              $and: [{ $eq: ["$timeCreated", "$destroyIn"] }, { $eq: ["$view", 0] }, { $eq: ["$params", params_id] }],
            },
            {
              $and: [{ $lt: ["$nowTiming", "$destroyIn"] }, { $eq: ["$params", params_id] }],
            },
          ],
        },
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
    // {
    //   $lookup: {
    //     from: "datas",
    //     let: { paramas_match: params_id },
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $eq: ["$params", "$$paramas_match"],
    //           },
    //         },
    //       },
    //     ],
    //     as: "user_data",
    //   },
    // },
    // {
    //   $unwind: {
    //     path: "$user_data",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    // { $limit: 1 },
    // {
    //   $project: {
    //     _id: 0,
    //     user_data: {},
    //     limit: 1,
    //   },
    // },
  ];

  return this.data_store_model.aggregate(aggreation_array);
};
