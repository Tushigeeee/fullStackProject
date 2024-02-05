const Product = require("../../models/product");
const mongoose = require("mongoose");

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.status(200).json({ message: "Product deleted successfully" });
};
module.exports = { deleteProduct };
