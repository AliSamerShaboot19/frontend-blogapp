import { profileAction } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// Get User Profile
export function GetUserProfile(userID) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userID}`);
      dispatch(profileAction.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// update profile photo

export function uploadProflePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await request.post(
        "/api/users/profile/profile-picture",
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + state.auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileAction.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPoto(data.profilePhoto));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// update info profile

export function updateProfle(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + state.auth.user.token,
          },
        }
      );
      dispatch(profileAction.updateProfile(data));
      dispatch(authActions.setUserName(data.username));

      const user = JSON.parse(localStorage.getItem("userinfo"));
      user.username = data?.username;
      localStorage.setItem("userinfo", JSON.stringify(user));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete account
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileAction.setloading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileAction.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(profileAction.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileAction.clearLoading());
    }
  };
}

// get user count
export function getUserCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileAction.setuserCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get All users Profile
export function getAllUsersProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileAction.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
