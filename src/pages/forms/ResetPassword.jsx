import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaLock, FaRedoAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getResetPAssword, resetPassword } from "../../redux/api/passwordApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPAssword(userId, token));
  }, [userId, token, dispatch]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    if (confirmPassword.trim() === "")
      return toast.error("Please confirm your password");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer theme="colored" position="bottom-right" />
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
            <p className="text-gray-500 mt-2">Enter your new password</p>
          </div>
          <form onSubmit={formSubmitHandler} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <FaRedoAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <FaRedoAlt /> Reset Password
            </button>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-600 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
