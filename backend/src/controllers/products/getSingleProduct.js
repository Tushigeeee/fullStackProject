const Product = require("../../models/product");
const mongoose = require("mongoose");

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const sort = { createdAt: -1 };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  const product = await Product.findById(id)
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: { path: "user", select: ["email", "profilePicUrl", "name"] },
    })
    .populate({
      path: "user",
      select: ["email", "profilePicUrl", "name"],
    })
    .sort(sort);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.status(200).json(product);
};
module.exports = { getSingleProduct };
