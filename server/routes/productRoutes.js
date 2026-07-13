const express = require("express");
const router = express.Router();

// TEST PRODUCTS DATA
let products = [];

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  res.json(products);
});

// ADD PRODUCT
router.post("/", (req, res) => {
  const product = { id: Date.now(), ...req.body };
  products.push(product);
  res.json(product);
});

module.exports = router;