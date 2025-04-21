import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { commentBlog } from "../reducers/blogsReducer";
import { TextField, Button } from "@mui/material";
import { failureNotification } from "../reducers/notificationReducer";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const blogId = useParams().id;
  const dispatch = useDispatch();

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      await dispatch(commentBlog(blogId, comment));
      setComment("");
    } catch (error) {
      failureNotification("it was not possible to comment");
    }
  };

  return (
    <form onSubmit={sendComment}>
      <TextField
        size="small"
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained">add comment</Button>
    </form>
  );
};

export default CommentForm;
