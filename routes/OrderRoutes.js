const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new order
router.post("/create", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders by pharmacy
router.get("/pharmacy-orders/:pharmacy", async (req, res) => {
  let orders;
  const pharmacy = req.params.pharmacy;
  try {
    orders = await Order.find({ pharmacy: pharmacy });
  } catch (err) {
    const error = new HttpError(
      "Fetching product failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    orders: orders,
  });
});

module.exports = router;
