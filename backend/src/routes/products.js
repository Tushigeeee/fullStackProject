const express = require("express");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);
// GET /products --> get all products
router.get("/", getAllProducts);

// GET /products/:id --> get single product
router.get("/:id", getSingleProduct);

// POST /products --> create a new product
router.post("/", createProduct);

// PUT /products/:id --> update a product
router.put("/:id", updateProduct);

// DELETE /products/:id --> delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
