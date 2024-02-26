const Product = require("../../models/product");

const getAllProducts = async (req, res) => {
  const userId = req.user._id;
  const sort = { createdAt: -1 };
  const products = await Product.find({
    $or: [{ userId }, { type: "public" }],
  })
    .populate({
      path: "comments",
      options: { sort: { createdAt: "desc" } },
      populate: {
        path: "user",
        select: ["email", "profilePicUrl", "name"],
      },
    })

    .populate({
      path: "user",
      select: ["email", "profilePicUrl", "name"],
    })
    .sort(sort);

  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }

  res.status(200).json(products);
};

module.exports = { getAllProducts };
