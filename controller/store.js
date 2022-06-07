const Device = require("../models/devices");
const Store = require("../models/store");
exports.getStore = async (req, res, next) => {
  const store = await Store.find();
  if (!store) {
    return res.status(404).json({ message: "no store found" });
  }
  res.status(200).json({
    message: "successfuly get stores",
    storeData: store,
  });
};
exports.getDevice = async (req, res, next) => {
  const devices = await Device.find();
  if (!devices) {
    return res.status(404).json({ message: "no devices found" });
  }
  res.status(200).json({
    message: "successfuly get devices",
    devicesData: devices,
  });
};
