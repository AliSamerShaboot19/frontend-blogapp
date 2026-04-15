import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const res = await request.post("/api/auth/login", user);
      dispatch(authActions.login(res.data));
      localStorage.setItem("userinfo", JSON.stringify(res.data));
      toast.success("Login successful");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userinfo");
    toast.info("Logged out");
  };
}

// register
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data?.message));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
      toast.success("Email verified successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}
