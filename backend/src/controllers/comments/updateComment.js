const mongoose = require("mongoose");
const Comment = require("../../models/comment");

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  if (!comment) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const product = await product
      .findById(productId)
      .populate({
        path: "comments",
        populate: { path: "user", select: ["email", "name", "userImage"] },
      })
      .populate({
        path: "user",
        select: ["email", "name", "userImage"],
      });

    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateComment,
};
