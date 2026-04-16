import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative pb-[56.25%] overflow-hidden bg-gray-100">
        <img
          src={post?.image?.url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            {post?.user?.profilePhoto && 
            <img src={post?.user?.profilePhoto?.url}
              alt={post?.user?.username}
              className="w-6 h-6 rounded-full object-cover"
            /> 
            }            
            <strong className="text-gray-700">Author:</strong>
            <Link
              to={profileLink}
              className="text-blue-600 hover:underline font-medium"
            >
              {username ? username : post?.user?.username}
            </Link>
          </div>
          <div>{new Date(post?.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="mb-3">
          <h4 className="text-xl font-bold text-gray-800 line-clamp-2">
            {post?.title}
          </h4>
          <Link
            to={`/posts/categories/${post.category}`}
            className="inline-block mt-1 text-xs font-semibold text-blue-500 uppercase tracking-wide hover:text-blue-700"
          >
            {post.category}
          </Link>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>
        <Link
          to={`/post/details/${post._id}`}
          className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center gap-1 self-start"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default PostItem;
