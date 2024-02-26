const Comment = require("../../models/comment");
const Product = require("../../models/product");

const createComment = async (req, res) => {
  const { productId } = req.params;
  const { comment } = req.body;

  const userId = req.user._id;

  try {
    if (!comment || !productId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingProduct = await Product.findById(productId);
    console.log(existingProduct);
    if (!existingProduct) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    const newComment = await Comment.create({
      comment,
      user: userId,
      product: productId,
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { comments: newComment._id } },
      { new: true }
    )
      .populate({
        path: "comments",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user", select: "email" },
      })
      .populate({
        path: "user",
        select: "email",
      });

    return res.status(201).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
};
