const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pharmacyName: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    selectedLocation: {
      type: {
        lat: Number,
        lng: Number,
      },
      required: true,
    },
    prescription: {
      type: String,
      required: false,
    },
    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true,
    //   },
    // ],
    cartItems: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
