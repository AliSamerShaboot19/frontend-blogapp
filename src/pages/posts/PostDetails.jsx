import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import { FaEdit, FaTrashAlt, FaThumbsUp, FaUserCircle } from "react-icons/fa";
import UpdatePostModal from "../posts/UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  FetchSinglePost,
  ToggleLikePost,
} from "../../redux/api/postsApi";

const PostDetails = () => {
  const { id } = useParams();
  const { post } = useSelector((state) => state.post);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        swal("Your post is safe");
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(FetchSinglePost(id));
  }, [id, dispatch]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Post not found</h2>
          <Link to="/posts" className="text-blue-600 mt-4 inline-block">
            ← Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <ToastContainer theme="colored" position="bottom-right" />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={post?.image?.url}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post?.title}
            </h1>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              {post?.user?.profilePhoto ? (
                <img
                  src={post?.user?.profilePhoto?.url}
                  alt={post?.user?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <Link
                  to={`/profile/${post?.user?._id}`}
                  className="font-semibold text-gray-800 hover:text-blue-600"
                >
                  {post?.user?.username}
                </Link>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()} •{" "}
                  {new Date(post.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
              {post.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              {user && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FaThumbsUp
                    onClick={() => dispatch(ToggleLikePost(post?._id))}
                    className="text-blue-500 cursor-pointer"
                  />
                  <span>{post?.likes?.length || 0} likes</span>
                </div>
              )}
              {user?._id === post?.user?._id && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-gray-500 hover:text-green-600 transition"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={deletePostHandler}
                    className="text-gray-500 hover:text-red-600 transition"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          {user ? (
            <AddComment postId={post?._id} />
          ) : (
            <p className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md shadow-sm text-sm font-medium">
              To write a comment you should login first
            </p>
          )}
          <br />
          <CommentList comments={post?.comments} />
        </div>
      </div>
      <UpdatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </div>
  );
};

export default PostDetails;
