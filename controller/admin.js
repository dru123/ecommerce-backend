const Store = require("../models/store");
const Device = require("../models/devices");
const { default: mongoose } = require("mongoose");
exports.addDevice = async (req, res, next) => {
  //converting id into the objectid
  const storeID = mongoose.Types.ObjectId(req.params.storeId);

  //getting the body from request
  const { title, price, description } = req.body;
  try {
    // get store from database
    const store = await Store.findById({ _id: storeID });

    if (!store) {
      res.status(404).json({
        message: "No Store Found",
      });
    }

    //get device from database
    const storeDevices = await store.populate("devices");
    if (storeDevices.devices.length > 0) {
      //checking device should not be already exist...
      const checkExistenceDevice = storeDevices.devices.filter(
        (product) => product.title === title
      );
      if (checkExistenceDevice) {
        res.status(409).json({
          message: "Already exists",
        });
      }
    }
    //create device inthe db
    const device = await Device.create({
      title: title,
      price: price,
      description: description,
      storeId: req.params.storeId,
    });
    device.save();
    store.devices.push(device);
    store.save();
    res.status(200).json({
      message: "device successfully added",
      device: device,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong";
    }
    next(error);
  }
};
exports.addStore = async (req, res, next) => {
  try {
    //creating store
    const { name, description } = req.body;
    const store = await Store.create({
      name: name,
      description: description,
      devices: [],
    });
    store.save();
    //sending response to the server
    res.status(200).json({
      message: "Store Suuccesfully created",
      storeId: store._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Something went wrong";
    }
    next(error);
  }
};
