import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
};

export default PostList;
