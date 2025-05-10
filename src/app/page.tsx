import PostList from "@/Components/PostList";

const Home = () => {
  return (
    <div>
      <p className="text-center text-5xl mb-10 text-indigo-100">Home</p>
      <div>
        <PostList type="all" />
      </div>
    </div>
  );
};
export default Home;
