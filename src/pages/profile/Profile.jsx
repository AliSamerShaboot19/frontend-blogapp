import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import { FaCamera, FaCalendarAlt, FaTrashAlt, FaEdit } from "react-icons/fa";
import UpdateProfileModal from "../profile/UpdateProfileModal";
import { useDispatch } from "react-redux";
import {
  deleteProfile,
  GetUserProfile,
  uploadProflePhoto,
} from "../../redux/api/profileApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostItem from "../posts/PostItem";
import { logoutUser } from "../../redux/api/authApi";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, isProfileDeleted } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetUserProfile(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  const formSubmitDefault = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select an image");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProflePhoto(formData));
    setFile(null);
    toast.success("Profile picture updated!");
  };

  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account and all data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
        swal("Account has been deleted!", { icon: "success" });
      } else {
        swal("Your account is safe");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <ToastContainer theme="colored" position="bottom-right" />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4 flex justify-center">
              <div className="relative">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : profile?.profilePhoto?.url ||
                        "https://via.placeholder.com/112"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover bg-white shadow-md"
                />
                {user?._id === profile?._id && (
                  <form
                    onSubmit={formSubmitDefault}
                    className="absolute bottom-0 flex gap-2"
                  >
                    <label
                      htmlFor="file"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full shadow-md transition flex items-center justify-center"
                    >
                      <FaCamera size={14} />
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      name="file"
                      id="file"
                      className="hidden"
                      accept="image/*"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-900 h-8 w-20 text-white rounded-full font-bold"
                    >
                      Upload
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {profile?.username}
              </h1>
              <p className="text-gray-600 mt-1">{profile?.bio}</p>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mt-2">
                <FaCalendarAlt size={14} />
                <span>
                  Joined{" "}
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toDateString()
                    : "recently"}
                </span>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {user?._id === profile?._id && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <FaEdit /> Update Profile
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            {profile?.username} posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile?.posts && profile.posts.length > 0 ? (
              profile.posts.map((post) => (
                <PostItem
                  key={post._id}
                  post={post}
                  username={profile?.username}
                  userId={profile?._id}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-2 text-center py-8">
                No posts yet.
              </p>
            )}
          </div>
        </div>
        {user?._id === profile?._id && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Danger Zone
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Once you delete your account, all your posts and data will be
              permanently removed.
            </p>
            <button
              onClick={deleteAccountHandler}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <FaTrashAlt /> Delete Account
            </button>
          </div>
        )}
      </div>
      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export default Profile;
