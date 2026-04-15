import { Link } from "react-router-dom";
import { FaUsers, FaNewspaper, FaTags, FaComments } from "react-icons/fa";
import AddCategoriesForm from "./AddCategoriesForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/api/categoryApi";
import { getUserCount } from "../../redux/api/profileApi";
import { getPostsCount } from "../../redux/api/postsApi";
import { fetchAllComments } from "../../redux/api/commentApi";

const Adminmain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { userscount } = useSelector((state) => state.profile);
  const { postCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUserCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, [dispatch]);

  const stats = [
    {
      label: "Users",
      value: userscount?.count,
      icon: FaUsers,
      link: "/admin-dashboard/users-table",
      color: "bg-blue-500",
    },
    {
      label: "Posts",
      value: postCount,
      icon: FaNewspaper,
      link: "/admin-dashboard/posts-table",
      color: "bg-green-500",
    },
    {
      label: "Categories",
      value: categories?.length,
      icon: FaTags,
      link: "/admin-dashboard/categories-table",
      color: "bg-purple-500",
    },
    {
      label: "Comments",
      value: comments?.length,
      icon: FaComments,
      link: "/admin-dashboard/comments-table",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            to={stat.link}
            className="bg-white rounded-xl shadow-md p-4 sm:p-5 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-3 group-hover:underline">
              See All {stat.label} →
            </p>
          </Link>
        ))}
      </div>
      <AddCategoriesForm />
    </div>
  );
};

export default Adminmain;
