import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
    userscount: null,
    profiles: [],
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    setloading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
    setuserCount(state, action) {
      state.userscount = action.payload;
    },
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileAction = profileSlice.actions;
export { profileAction, profileReducer };
