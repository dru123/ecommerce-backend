const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema for storing the object
const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
  ],
});
module.exports = mongoose.model("Store", storeSchema);
