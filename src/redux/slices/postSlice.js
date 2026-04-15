// postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postCount: null,
    postCategory: [],
    loading: false,
    isCreatedPost: false,
    post: null,
  },
  reducers: {
    setPost(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, actions) {
      state.postCount = actions.payload;
    },
    setPostsCategory(state, action) {
      state.postCategory = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isCreatedPost = true;
      state.loading = false;
    },
    clearPostCreated(state) {
      state.isCreatedPost = false;
    },
    setPostDetails(state, action) {
      state.post = action.payload;
    },
    setLike(state, action) {
      state.post.likes = action.payload.likes;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
    updateCommentPost(state, action) {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteCommentPost(state, action) {
      const comment = state.post.comments.find((c) => c._id === action.payload);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
    },
    updatePostImage(state, action) {
      if (state.post) {
        state.post.image = action.payload;
      }
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postActions, postReducer };
