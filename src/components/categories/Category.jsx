import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../pages/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { getPostBasedOnCategory } from "../../redux/api/postsApi";

const Category = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postCategory } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Posts in "{category}"
          </h1>
          <p className="text-gray-500 text-lg">
            {postCategory?.length}{" "}
            {postCategory?.length === 1 ? "post" : "posts"} found
          </p>
        </div>

        {postCategory?.length > 0 ? (
          <PostList posts={postCategory} />
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">
              No posts found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
