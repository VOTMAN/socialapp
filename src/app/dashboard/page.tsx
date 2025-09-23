"use client";

import Link from "next/link";
import { Suspense, useContext } from "react";
import PostList from "@/Components/PostList";
import { UserContext } from "@/Contexts/UserContext";
import Image from "next/image";

const Dashboard = () => {
  const data = useContext(UserContext);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Section */}
      {data?.user && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-10 text-center border border-white/20">
          <div className="flex flex-col items-center gap-4">
            {/* Profile image */}
            {data.user.image ? (
              <Image
                width={96}
                height={96}
                src={data.user.image}
                alt={data.user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-500 text-white text-3xl font-bold">
                {data.user.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name + Email */}
            <div>
              <h2 className="text-2xl font-bold text-indigo-100">
                {data.user.name}
              </h2>
              <p className="text-sm text-indigo-200">{data.user.email}</p>
            </div>

            {/* Meta info */}
            <div className="flex gap-6 text-indigo-200 text-sm mt-2">
              <p>
                Joined:{" "}
                {new Date(data.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>
                Last Active:{" "}
                {new Date(data.user.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Title */}
      <p className="text-center text-4xl mb-10 text-indigo-100">
        {data?.user
          ? `${data?.user.name}'s Dashboard`
          : "Please Login to view your Posts"}
      </p>

      {/* Create Post Button */}
      <div className="flex items-center justify-center mb-8">
        <Link href="/dashboard/newPost" className="cursor-pointer">
          <button className="border-4 cursor-pointer border-cyan-300 p-2 hover:border-cyan-200 hover:bg-violet-300 hover:text-black hover:font-bold transition">
            Create a New Post
          </button>
        </Link>
      </div>

      {/* Post List */}
      <Suspense fallback="Loading the posts...">
        {data?.user && <PostList type={data.user.id} />}
      </Suspense>
    </div>
  );
};
export default Dashboard;
