const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    headerPic: {
      type: String,
    },
    openTime: {
      type: Date,
    },
    closeTime: {
      type: Date,
    },
    open: {
      type: Boolean,
    },
    location: {
      type: String,
    },
    deliveryFee: {
      type: Number,
    },
    serviceFee: {
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
