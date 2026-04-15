import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userinfo")
      ? JSON.parse(localStorage.getItem("userinfo"))
      : null,
    registerMessage: null,
    isEmailVerifed: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUserPoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUserName(state, action) {
      state.user.username = action.payload;
    },
    setIsEmailVerified(state) {
      state.isEmailVerifed = true;
      state.registerMessage = null;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
