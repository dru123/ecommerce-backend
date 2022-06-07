const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deviceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
});
module.exports = mongoose.model("Device", deviceSchema);
