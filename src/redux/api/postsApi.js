// postsApi.js (only the changed parts, but full file shown)
import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch post based on page number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// posts count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/posts/count");
      dispatch(postActions.setPostsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// fetch posts based on category
export function getPostBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(postActions.setPostsCategory(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// create post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearPostCreated());
      }, 2000);
    } catch (error) {
      dispatch(postActions.clearLoading());
      toast.error(error.response.data.message);
    }
  };
}

// post details
export function FetchSinglePost(PostId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${PostId}`);
      dispatch(postActions.setPostDetails(data));
    } catch (error) {
      dispatch(postActions.clearLoading());
      toast.error(error.response.data.message);
    }
  };
}

// post likes
export function ToggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// update post
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePost(data.PostId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
}

// get All posts

export function GetALlposts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
