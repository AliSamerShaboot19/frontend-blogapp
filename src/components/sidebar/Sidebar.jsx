import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/api/categoryApi";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-lg shadow-md py-2 sm:py-3 px-2 sm:px-4 sticky top-20 sm:top-24 z-10 overflow-x-auto whitespace-nowrap scrollbar-thin">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-max">
        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800 border-r-2 border-blue-500 pr-2 sm:pr-3">
          CATEGORIES
        </span>

        <div className="flex gap-1.5 sm:gap-2 md:gap-3">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/posts/categories/${cat.title}`}
              className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 active:scale-95"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
