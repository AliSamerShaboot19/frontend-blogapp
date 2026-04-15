import { useState } from "react";
import swal from "sweetalert";
import { FaEdit, FaTrashAlt, FaUserCircle } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/api/commentApi";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  const [editingComment, setEditingComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "This comment will be permanently deleted.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await dispatch(deleteComment(commentId));
        swal("Comment deleted!", { icon: "success" });
      } else {
        swal("Your comment is safe");
      }
    });
  };

  const openEditModal = (comment) => {
    setEditingComment(comment);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h4 className="text-xl font-bold text-gray-800 mb-5">
        {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
      </h4>
      <div className="space-y-6">
        {comments?.map((comment) => (
          <div
            key={comment?._id}
            className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex items-start gap-3">
              <FaUserCircle className="w-8 h-8 text-gray-400" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <Link
                    to={`/profile/${comment?.user}`}
                    className="font-semibold text-indigo-800"
                  >
                    {comment?.username}
                  </Link>
                  <span className="text-xs text-gray-400"></span>
                </div>
                <p className="text-gray-700">{comment?.text}</p>
                {user?._id === comment?.user && (
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => openEditModal(comment)}
                      className="text-gray-400 hover:text-green-600 transition text-sm flex items-center gap-1"
                    >
                      <FaEdit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => deleteCommentHandler(comment?._id)}
                      className="text-gray-400 hover:text-red-600 transition text-sm flex items-center gap-1"
                    >
                      <FaTrashAlt size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <UpdateCommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comment={editingComment}
      />
    </div>
  );
};

export default CommentList;
