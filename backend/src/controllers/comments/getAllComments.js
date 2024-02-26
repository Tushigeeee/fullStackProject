const mongoose = require("mongoose");
const Comment = require("../../models/comment");

const getAllComments = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ message: "Id is not valid" });
  }

  try {
    const comments = await Comment.find({ productId }).populate({
      path: "user",
      select: "email",
    });

    if (!comments.length) {
      return res.status(404).json({ message: "Comments not found" });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllComments,
};
