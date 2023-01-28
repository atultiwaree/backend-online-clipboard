const mongoose = require("mongoose");

const data_store_model_schema = mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      default: null,
    },
  },
  { createdAt: true }
);
