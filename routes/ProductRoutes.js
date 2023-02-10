const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const HttpError = require("../middleware/http-error");

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Get product by id
router.get("/:id", async (req, res, next) => {
  let product;
  const id = req.params.id;
  try {
    product = await Product.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Fetching product failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    product: product,
  });
});

// Get product by pharmacy
router.get("/pharmacy-products/:pharmacy", async (req, res) => {
  let products;
  const pharmacy = req.params.pharmacy;
  try {
    products = await Product.find({ pharmacy: pharmacy });
  } catch (err) {
    const error = new HttpError(
      "Fetching product failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    products: products,
  });
});

// Add product
router.post("/add", async (req, res, next) => {
  console.log(req.body);
  // products array???!!!!!
  let {
    name,
    description,
    price,
    stock,
    image,
    needsPrescription,
    category,
    pharmacy,
  } = req.body;

  let existingProduct;
  try {
    existingProduct = await Product.findOne({
      name: name,
      description: description,
      price: price,
      stock: stock,
      image: image,
      needsPrescription: needsPrescription,
      // Category array???!!!
      //   [category]
      // category:
      pharmacy: pharmacy,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating product failed, please try again later.",
      500
    );
    return next(error);
  }
  //
  if (existingProduct) {
    // console.log(existingUsers)
    const error = new HttpError(
      "Product already exists, please try again.",
      422
    );
    return next(error);
  }
  console.log("2");

  try {
    createdProduct = new Product({
      name,
      description,
      price,
      stock,
      image,
      needsPrescription,
      category,
      pharmacy,
    });
    await createdProduct.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
});

// Remove product by id
router.post("/remove/:id", async (req, res, next) => {
  let product;
  const id = req.params.id;
  try {
    product = await Product.findOneAndRemove({ _id: id });
  } catch (err) {
    const error = new HttpError(
      "Removing product failed, please try again later.",
      500
    );
    console.log(err);
    return next(error);
  }
  res.json({
    product: product,
  });
});

module.exports = router;
