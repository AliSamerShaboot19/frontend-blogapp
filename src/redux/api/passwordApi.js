import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

export function Forgotpassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email,
      });
      console.log(data);

      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function getResetPAssword(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(passwordActions.setError());
    }
  };
}

export function resetPassword(newPassword, user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(passwordActions.setError());
    }
  };
}
