const express = require("express");
const router = express.Router();
const Pharmacy = require("../models/Pharmacy");
const HttpError = require("../middleware/http-error");

// Get all pharmacies
router.get("/", async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.send(pharmacies);
});

// Get pharmacy by id
router.get("/:id", async (req, res) => {
  let pharmacy;
  const id = req.params.id;
  try {
    pharmacy = await Pharmacy.find({ id: __id });
  } catch (err) {
    const error = new HttpError(
      "Fetching pharmacies failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    pharmacy: pharmacy,
  });
});

// Add pharmacy
router.post("/add", async (req, res, next) => {
  console.log(req.body);
  // products array???!!!!!
  let {
    name,
    profilePic,
    headerPic,
    openTime,
    closedTime,
    open,
    city,
    deliveryFee,
    serviceFee,
    DeliveryTime,
  } = req.body;

  let existingPharmacy;
  try {
    existingPharmacy = await Pharmacy.findOne({
      name: name,
      profilePic: profilePic,
      headerPic: headerPic,
      openTime: openTime,
      closedTime: closedTime,
      open: open,
      city: city,
      deliveryFee: deliveryFee,
      serviceFee: serviceFee,
      DeliveryTime: DeliveryTime,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating card failed, please try again later.",
      500
    );
    return next(error);
  }
  //
  if (existingPharmacy) {
    // console.log(existingUsers)
    const error = new HttpError(
      "Pharmacy already exists, please try again.",
      422
    );
    return next(error);
  }
  console.log("2");

  try {
    createdPharmacy = new Pharmacy({
      name,
      profilePic,
      headerPic,
      openTime,
      closedTime,
      open,
      city,
      deliveryFee,
      serviceFee,
    });
    await createdPharmacy.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating pharmacy failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ pharmacy: createdPharmacy });
});

// Remove pharmacy by id
router.post("remove/:id", async (req, res, next) => {
  let pharmacy;
  const id = req.params.id;
  try {
    pharmacy = await Pharmacy.findOneAndRemove({ id: __id });
  } catch (err) {
    const error = new HttpError(
      "Removing pharmacy failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
});

module.exports = router;
