import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/api/authApi";
import { HiOutlineMail, HiCheckCircle, HiXCircle } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerifed, loading } = useSelector((state) => state.auth);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <AiOutlineLoading3Quarters className="animate-spin text-5xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-10"></div>
          <div className="relative p-8 text-center">
            {isEmailVerifed ? (
              <>
                <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <HiCheckCircle className="text-5xl text-green-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Email Verified!
                </h1>
                <p className="text-gray-600 mb-8">
                  Your email address has been successfully verified. You can now
                  log in to your account.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <HiOutlineMail className="mr-2 text-xl" />
                  Go to Login
                </Link>
              </>
            ) : (
              <>
                <div className="mx-auto flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                  <HiXCircle className="text-5xl text-red-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Verification Failed
                </h1>
                <p className="text-gray-600 mb-6">
                  The verification link is invalid or has expired. Please check
                  your email or try registering again.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-xl shadow-md hover:bg-gray-900 transition-colors duration-200"
                >
                  Back to Register
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Need help?{" "}
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
