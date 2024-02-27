import React, { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { UpdateProductComment } from "./EditCommentModal";
import { useParams } from "react-router-dom";

export const EditComment = (props) => {
  const { id } = useParams();
  const { comment } = props;
  const [commentObject, setCommentObject] = useState({});
  const [openUpdateCommentModal, setOpenUpdateCommentModal] = useState(false);
  const handleOpenUpdateCommentModal = () => setOpenUpdateCommentModal(true);
  const handleCloseUpdateCommentModal = () => setOpenUpdateCommentModal(false);
  const { currentUser } = useUserContext();
  const handleUpdateComment = async () => {
    setCommentObject(comment);
    handleOpenUpdateCommentModal();
  };
  console.log(comment);

  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <p>{comment.comment}</p>
      </div>
      <div style={{ marginLeft: "auto" }}>
        {currentUser.user.id === comment.user._id && (
          <button
            style={{
              width: "80px",
              height: "40px",
              borderRadius: "6px",
              border: "none",
            }}
            onClick={() => handleUpdateComment(comment)}
          >
            Update
          </button>
        )}
      </div>
      <UpdateProductComment
        productId={id}
        comment={commentObject}
        open={openUpdateCommentModal}
        handleClose={handleCloseUpdateCommentModal}
      />
    </div>
  );
};
