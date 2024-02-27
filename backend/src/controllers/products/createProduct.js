const Product = require("../../models/product");

const createProduct = async (req, res) => {
  const { name, price, description, category, type, image } = req.body;
  const userId = req.user._id;
  const userEmail = req.user.email;
  if (!name || !price || !description || !category || !type || !image) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const createProduct = await Product.create({
      name,
      price,
      description,
      category,
      user: userId,
      type,
      userEmail,
      image,
    });
    const product = await Product.findById(createdProduct._id)
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user", select: ["email", "userImage", "name"] },
      })

      .populate({
        path: "user",
        select: ["email", "userImage", "name"],
      });

    const user = await user.findById(userId);
    user.products.push(createProduct._id);
    await user.save();
    res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
};
