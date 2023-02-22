const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpError = require("./middleware/http-error");

const accountRoutes = require("./routes/AccountRoutes");
const productRoutes = require("./routes/ProductRoutes");
const pharmacyRoutes = require("./routes/PharmacyRoutes");
const orderRoutes = require("./routes/OrderRoutes");

mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,*"
  );
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/api/account", accountRoutes);
app.use("/api/product", productRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/orders", orderRoutes);

app.use("/", (req, res) => res.send("OK"));
// last route
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  console.log(error);
  throw error;
});

const uri = process.env.DATABASE_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server Started");
      console.log(`Running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
