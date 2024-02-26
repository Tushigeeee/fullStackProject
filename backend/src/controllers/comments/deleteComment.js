const mongoose = require("mongoose");
const Comment = require("../../models/comment");
const Product = require("../../models/product");

const deleteComment = async (req, res) => {
  const { commentId, productId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(productId) ||
    !mongoose.Types.ObjectId.isValid(commentId)
  ) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const product = await product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  const filteredComments = product.comments.filter(
    (comment) => comment != commentId
  );

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...req.body, comments: filteredComments },
    { new: true }
  )
    .populate({
      path: "comments",
      populate: { path: "user", select: "email" },
    })
    .populate({
      path: "user",
      select: "email",
    });

  res.status(200).json(updatedProduct);
};

module.exports = {
  deleteComment,
};
