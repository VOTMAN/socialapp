"use client";

import { UserContext } from "@/Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { getAllPosts, getUserPosts } from "@/utils/post";
import { getPostLikes, getUserLikes } from "@/utils/like";

const PostList = ({ type }: { type: string }) => {
  const user = useContext(UserContext);

  const [userPosts, setUserPosts] = useState<
    {
      id: string;
      user: string | null;
      content: string;
      image?: string;
      time: Date | null;
    }[]
  >([]);
  const [postsLiked, setPostsLiked] = useState<{ postId: string | null }[]>([]);
  const [likedCount, setLikedCount] = useState<
    { postId: string; likes: number }[] | undefined
  >([]);
  useEffect(() => {
    const fetchUserLikes = async () => {
      const res = await getUserLikes(user?.user?.id ?? "");
      if (res?.success) {
        const liked = res.data.map((l) => ({
          postId: l.postId ?? "",
        }));
        setPostsLiked(liked);
      }
    };
    fetchUserLikes();

    const fetchLikeCount = async () => {
      const res = await getPostLikes();
      setLikedCount(res.data);
    };
    fetchLikeCount();
    if (type == "all") {
      const fetchUserPosts = async () => {
        const res = await getAllPosts();
        if (res.success && res.data != undefined) {
          const newPosts = res.data.map((p) => ({
            id: p.post.id ?? "",
            user: p.user?.name ?? "",
            content: p.post.content ?? "",
            image: p.post.imageUrl ?? undefined,
            time: p.post.createdAt,
          }));
          setUserPosts(newPosts);
          // console.log(userPosts);
        }
      };
      fetchUserPosts();
    } else {
      const fetchUserPosts = async (userId: string) => {
        const res = await getUserPosts(userId);
        if (res.success && res.data != undefined) {
          const newPosts = res.data.map((p) => ({
            id: p.id ?? "",
            user: user?.user?.name ?? "",
            content: p.content ?? "",
            image: p.imageUrl ?? undefined,
            time: p.createdAt,
          }));
          setUserPosts(newPosts);
          // console.log(userPosts);
        }
      };
      if (user?.user?.id !== null && user?.user?.id !== undefined) {
        fetchUserPosts(user.user.id);
      }
    }
  }, [type]);

  return (
    <div>
      {user?.user && (
        <div className="grid grid-cols-1 place-content-center gap-4 mx-5">
          <h4 className="text-2xl text-center">
            {type == "all" ? "All" : "Your"} Posts
          </h4>
          {userPosts.map((p, index) => (
            <Post
              id={p.id}
              user={p.user || ""}
              key={index}
              content={p.content}
              imageId={p.image ? p.image : null}
              time={p.time ? p.time : null}
              liked={postsLiked.some((likedPost) => likedPost.postId === p.id)}
              likedCount={
                likedCount?.find((like) => like.postId === p.id)?.likes || 0
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
