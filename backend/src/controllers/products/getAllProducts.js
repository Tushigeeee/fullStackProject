const Product = require("../../models/product");

const getAllProducts = async (req, res) => {
  const userId = req.user._id;
  const products = await Product.find({
    $or: [{ userId }, { type: "public" }],
  });

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json(products);
};

module.exports = { getAllProducts };
