import PostList from "@/Components/PostList";
import { Suspense } from "react";

const Home = () => {
  return (
    <div>
      <p className="text-center text-5xl mb-10 text-indigo-100">Home</p>
      <div>
        <Suspense fallback="Loading the posts...">
          <PostList type="all" />
        </Suspense>
      </div>
    </div>
  );
};
export default Home;
