import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/api/commentApi";

const AddComment = ({ postId }) => {
  const [txt, setTxt] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (txt.trim() === "") return toast.error("Please write something");
    dispatch(createComment({ text: txt, postId }));
    setTxt("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <ToastContainer theme="colored" position="bottom-right" />
      <h4 className="text-xl font-bold text-gray-800 mb-4">Leave a comment</h4>
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          type="text"
          placeholder="Write your comment..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaPaperPlane size={16} /> Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
