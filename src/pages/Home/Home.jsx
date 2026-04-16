import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import PostList from "../posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../redux/api/postsApi";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

 

  useEffect(() => {
    dispatch(fetchPosts(1));
    window.scrollTo(0, 0);
  }, [dispatch]);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 mb-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Welcome to Blog
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Discover stories, ideas, and insights from our community
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Sidebar />
        <div className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3 mt-8">
          Latest Posts
        </div>
        <PostList posts={posts} />
        <Link
          to="/posts"
          className="text-blue-600 font-medium mt-4 hover:text-blue-800 inline-flex items-center gap-1"
        >
          See All Posts →
        </Link>
      </div>
    </div>
  );
};

export default Home;
