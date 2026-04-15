import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/api/commentApi";

const UpdateCommentModal = ({ isOpen, onClose, comment }) => {
  const [text, setText] = useState(comment?.text || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment) {
      setText(comment.text || "");
    }
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Comment cannot be empty");
    await dispatch(updateComment(comment?._id, { text }));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6 mx-auto"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-gray-800">Edit Comment</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes size={22} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your comment
                </label>
                <textarea
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
                  placeholder="Edit your comment..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <FaSave size={18} /> Save Changes
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpdateCommentModal;
