import { useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/api/categoryApi";

const AddCategoriesForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title Is Required");
    dispatch(createCategory({ title }));
    setTitle("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h6 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaPlus className="text-blue-500" /> Add New Category
      </h6>
      <form onSubmit={formSubmitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Title
          </label>
          <input
            type="text"
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter category title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2"
        >
          <FaPlus size={14} /> Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoriesForm;
