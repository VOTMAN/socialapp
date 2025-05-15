"use client";

import Post from "@/Components/Post";
import { redirect, useParams } from "next/navigation";
import { getPostById } from "@/utils/post";
import { useEffect, useState } from "react";
import CommentList from "@/Components/CommentList";

const postPage = () => {
  const { id } = useParams();

  const [postData, setPostData] = useState<
    | {
        id: string;
        name: string;
        content: string | null;
        imageUrl: string | null;
        createdAt: Date | null;
      }
    | undefined
  >();

  useEffect(() => {
    const fetchPostDetails = async () => {
      const { data, success, error } = await getPostById(id as string);
      // console.log(data)
      if (success && data != undefined) {
        setPostData({
          id: data[0].post.id,
          name: data[0].userName as string,
          content: data[0].post.content,
          imageUrl: data[0].post.imageUrl,
          createdAt: data[0].post.createdAt,
        });
      } else {
        console.error(error);
      }
    };
    fetchPostDetails();
  }, []);

  return (
    <>
      <Post
        id={id as string}
        user={postData?.name!}
        content={postData?.content!}
        imageId={postData?.imageUrl!}
        time={postData?.createdAt!}
        liked={null!}
        likedCount={undefined!}
      />
      <div>
        <CommentList />
      </div>
    </>
  );
};
export default postPage;
