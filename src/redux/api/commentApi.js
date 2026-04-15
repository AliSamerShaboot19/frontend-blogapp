import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { commentAction } from "../slices/commentSlice";

// Create Comment
export function createComment(newcomment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newcomment, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(postActions.addCommentToPost(data));
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// update comment
export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        comment,
        {
          headers: { Authorization: "Bearer " + getState().auth.user.token },
        }
      );
      dispatch(postActions.updateCommentPost(data));
      toast.success("Comment updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// delete Comment
export function deleteComment(commentID) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentID}`, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(commentAction.deleteComments(commentID));
      dispatch(postActions.deleteCommentPost(commentID));
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// fetch all comments
export function fetchAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments/all`, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(commentAction.setComments(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}
