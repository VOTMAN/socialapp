"use client";

import { UserContext } from "@/Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import getPosts from "@/utils/getPosts";
import getUserPosts from "@/utils/getUserPosts";

const PostList = ({ type }: { type: string }) => {
  const user = useContext(UserContext);
  console.log(user);
  const [userPosts, setUserPosts] = useState<
    {
      user: string | null;
      content: string;
      image?: string;
      time: Date | null;
    }[]
  >([]);

  useEffect(() => {
    if (type == "all") {
      const fetchUserPosts = async () => {
        const res = await getPosts();
        if (res.success && res.data != undefined) {
          const newPosts = res.data.map((p) => ({
            user: p.user?.name ?? "",
            content: p.post.content ?? "",
            image: p.post.imageUrl ?? undefined,
            time: p.post.createdAt,
          }));
          setUserPosts(newPosts);
          console.log(userPosts);
        }
      };
      fetchUserPosts();
    } else {
      const fetchUserPosts = async (userId: string) => {
        const res = await getUserPosts(userId);
        if (res.success && res.data != undefined) {
          const newPosts = res.data.map((p) => ({
            user: user?.user?.name ?? "",
            content: p.content ?? "",
            image: p.imageUrl ?? undefined,
            time: p.createdAt,
          }));
          setUserPosts(newPosts);
          console.log(userPosts);
        }
      };
      if (user?.user?.id !== null && user?.user?.id !== undefined) {
        fetchUserPosts(user.user.id);
      }
    }
  }, [user]);

  return (
    <div>
      {user?.user && (
        <div className="grid grid-cols-1 place-content-center gap-4 mx-5">
          <h4 className="text-2xl text-center">
            {type == "all" ? "All" : "Your"} Posts
          </h4>
          {userPosts.map((p, index) => (
            <Post
              user={p.user || ""}
              key={index}
              content={p.content}
              imageId={p.image ? p.image : null}
              time={p.time ? p.time : null}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
