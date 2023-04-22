// This code imports the required modules, then creates two routes:
// /register and /login.

// The /register route takes in data from the registration form,
// checks if the email is already in use,
// hashes the password and creates a new user in the database.

// The /login route takes in data from the login form,
// checks if the email and password match the ones stored in the database and creates and signs a JWT token.

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Pharmacy");

// const Pharmacy = require("../models/Pharmacy");

const HttpError = require("../middleware/http-error");
// const Pharmacy = require("../models/Pharmacy");

// Get all accounts
router.get("/getall", async (req, res, next) => {
  const accounts = await Account.find({});
  console.log(`${new Date()} - ${req.method} ${req.url}`);
  res.send(accounts);
});

// Get Account by id
router.get("/:id", async (req, res) => {
  let pharmacy;
  const id = req.params.id;
  try {
    pharmacy = await Account.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Fetching pharmacies failed, please try again later.",
      500
    );
    console.log(err);
    // return next(error);
  }
  res.json({
    pharmacy: pharmacy,
  });
});

// Register Account
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, type } = req.body;

    // check if the email is already in use
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).send("Email already in use");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new account
    const account = new Account({
      email,
      password: hashedPassword,
      name: name,
      type: type,
    });
    await account.save();

    // create and sign a JWT
    const token = jwt.sign({ accountId: account._id }, "secretkey");

    // send the token as a response
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering new user please try again.");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, type } = req.body;

    // check if the email and password are correct
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(400).send("Email or password is incorrect");
    }
    const valid = await bcrypt.compare(password, account.password);
    if (!valid) {
      return res.status(400).send("Email or password is incorrect");
    }

    // create and sign a JWT
    const token = jwt.sign({ accountId: account._id }, "secretkey");
    const id = account._id;
    const t = account.type;

    // send the token as a response
    res.send({ token, id, t });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error logging in please try again.");
  }
});

// Edit Pharmacy
router.post("/edit", async (req, res, next) => {
  console.log(req.body);
  const idd = req.body._id;
  let {
    name,
    profilePic,
    description,
    headerPic,
    openTime,
    closeTime,
    open,
    city,
    deliveryFee,
    serviceFee,
    deliveryTime,
  } = req.body;

  try {
    // createdPharmacy = new Pharmacy({
    //   name,
    //   profilePic,
    //   headerPic,
    //   openTime,
    //   closedTime,
    //   open,
    //   city,
    //   deliveryFee,
    //   serviceFee,
    // });
    await Account.findByIdAndUpdate(idd, {
      name: name,
      profilePic: profilePic,
      headerPic: headerPic,
      description: description,
      openTime: openTime,
      closeTime: closeTime,
      open: open,
      city: city,
      deliveryFee: deliveryFee,
      serviceFee: serviceFee,
      deliveryTime: deliveryTime,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Editing pharmacy failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).send("updated");
});

module.exports = router;
