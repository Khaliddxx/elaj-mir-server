const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    type: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    headerPic: {
      type: String,
    },
    openTime: {
      type: String,
    },
    closeTime: {
      type: String,
    },
    open: {
      type: Boolean,
    },
    city: {
      type: String,
    },
    deliveryFee: {
      type: Number,
    },
    serviceFee: {
      type: Number,
    },
    deliveryTime: {
      type: Number,
    },
    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true,
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
