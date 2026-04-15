import { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import swal from "sweetalert";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchAllComments } from "../../redux/api/commentApi";
import { Link } from "react-router-dom";

const CommentTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  const deleteCommentHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(id));
        swal("Comment has been deleted!", { icon: "success" });
      } else {
        swal("Comment is safe");
      }
    });
  };

  return (
    <AdminLayout title="Comments">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Comments
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
                  Comment
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comments.map((comment, idx) => (
                <tr key={comment?._id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {comment?.user?.profilePhoto ? (
                        <img
                          src={comment?.user?.profilePhoto.url}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <FaUserCircle className="w-6 h-6 text-gray-400" />
                      )}
                      <Link
                        to={`/profile/${comment?.user?._id}`}
                        className="text-sm font-medium text-gray-900"
                      >
                        {comment?.username}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                    {comment?.text}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => deleteCommentHandler(comment?._id)}
                      className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                    >
                      <FaTrashAlt /> Delete
                    </button>
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

export default CommentTable;
