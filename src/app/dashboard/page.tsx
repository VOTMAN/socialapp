"use client";

import Link from "next/link";
import { useContext } from "react";
import PostList from "@/Components/PostList";
import { UserContext } from "@/Contexts/UserContext";

const Dashboard = () => {
  const data = useContext(UserContext);

  return (
    <div>
      <p className="text-center text-4xl mb-10 text-indigo-100">
        {data?.user
          ? `${data?.user.name}'s Dashboard`
          : "Please Login to view your Posts"}
      </p>
      <div className="flex items-center justify-center mb-8">
        <Link href="/dashboard/newPost" className="cursor-pointer">
          <button className="border-4 cursor-pointer border-cyan-300 p-2 hover:border-cyan-200 hover:bg-violet-300 hover:text-black hover:font-bold transition">
            Create a New Post
          </button>
        </Link>
      </div>
      {data?.user && <PostList type={data.user.id} />}
    </div>
  );
};
export default Dashboard;
