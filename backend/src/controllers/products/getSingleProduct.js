const Product = require("../../models/product");
const mongoose = require("mongoose");

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.status(200).json(product);
};
module.exports = { getSingleProduct };
