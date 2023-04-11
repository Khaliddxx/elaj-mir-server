const express = require("express");
const router = express.Router();
const twilio = require("twilio");
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

    // send WhatsApp message
    const client = twilio(
      "ACe0883d72de212647a808c758ceb5035e",
      "6616563e28067897e2a3d8a342590555"
    );
    try {
      const message = await client.messages.create({
        body: `New order from ${order.name} (${order.phone}): ${order.total} SDG`,
        from: `whatsapp:+14155238886`,
        to: `whatsapp:+201273671302`,
      });
      console.log(`Message sent: ${message.sid}`);
    } catch (error) {
      console.error(`Error sending message: ${error}`);
    }
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

// Remove order by id
router.post("/remove/:id", async (req, res, next) => {
  let order;
  const id = req.params.id;
  try {
    order = await Order.findOneAndRemove({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Removing product failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    order: order,
  });
});

// Update order status by id
router.post("/update-status/:id/:status", async (req, res, next) => {
  const id = req.params.id;
  const status = req.params.status;
  let order;

  try {
    order = await Order.findOneAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      "Updating order status failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.json({
    order: order,
  });
});

module.exports = router;
