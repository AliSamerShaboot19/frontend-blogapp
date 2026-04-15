import React, { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetALlposts, deletePost } from "../../redux/api/postsApi";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(GetALlposts());
  }, [dispatch]);

  const deletePostHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(id));
        swal("Your post has been deleted!", { icon: "success" });
      } else {
        swal("Post is safe");
      }
    });
  };

  return (
    <AdminLayout title="Posts">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Posts
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post Title
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post, idx) => (
                <tr key={post._id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.user.profilePhoto?.url}
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {post?.user?.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                    {post?.title}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/post/details/${post._id}`}
                        className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                      >
                        <FaEye /> View
                      </Link>
                      <button
                        onClick={() => deletePostHandler(post._id)}
                        className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PostsTable;
