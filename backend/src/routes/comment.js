const express = require("express");
const auth = require("../middleware/auth");

const { getAllComments } = require("../controllers/comments");
const { createComment } = require("../controllers/comments");
const { deleteComment } = require("../controllers/comments");
const { updateComment } = require("../controllers/comments");

const router = express.Router();

router.use(auth);

router.get("/:productId/comments", getAllComments);

router.post("/:productId/comments", createComment);

router.delete("/:productId/comments/:commentId", deleteComment);

router.put("/:productId/comments/:commentId", updateComment);

module.exports = router;
