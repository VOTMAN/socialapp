"use client";

import { useContext, SetStateAction, useState } from "react";
import { likePost, dislikePost } from "@/utils/like";
import { makeComment } from "@/utils/comment";
import { UserContext } from "@/Contexts/UserContext";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { redirect, usePathname } from "next/navigation";

import {
  Heart,
  MessageCircleDashed,
  ScanSearch,
  SendHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const Post = (data: {
  id: string;
  user: string;
  userId: string;
  content: string;
  imageId: string | null;
  time: Date | null;
  liked: boolean;
  likedCount: number;
}) => {
  const currPath = usePathname();
  const reg = new RegExp("/post.*");

  const user = useContext(UserContext);
  const [like, setLike] = useState<boolean>(data.liked);
  const [comment, setComment] = useState<string>("");
  const [likeCount, setLikeCount] = useState<number>(data.likedCount);

  const handleLike = async () => {
    if (!like) {
      await likePost(user?.user?.id ?? "", data.id);
      setLike(!like);
      setLikeCount(likeCount + 1);
    } else {
      await dislikePost(user?.user?.id ?? "", data.id);
      setLike(!like);
      setLikeCount(likeCount - 1);
    }
  };

  const handleComment = async () => {
    const res = await makeComment(data.id, user?.user?.name ?? "", comment);
    if (!res?.success) {
      alert("Server Error, Try again");
      redirect("/post/" + data.id);
    } else {
      window.location.reload()
    }
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center align-middle min-w-fit border-amber-200 border p-5 my-7 gap-5">
      <div className="flex justify-around">
      <Link href={`/dashboard/${data.userId}`}>
    <span className="hover:underline font-semibold text-indigo-300">
      {data.user}
    </span>
  </Link>
  <p className="text-sm text-gray-400">
    {data.time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} •{" "}
    {data.time?.toLocaleDateString()}
  </p>
</div>
      <hr />
      <p>{data.content}</p>
      <hr />
      {data.imageId != null ? (
        <div className="flex flex-col items-center">
          <CldImage
          priority
            width={800}
            height={450}
            src={(data.imageId as string) || ""}
            alt="Some Image"
            className="max-w-full bg-gray-700 max-h-screen mb-6"
          />
        </div>
      ) : null}
      <hr />
      <div className="flex gap-5 justify-between">
        <div className="flex gap-2">
          <div className="flex gap-2">
            {!reg.test(currPath) && (
              <>
                {!like && (
                  <button onClick={handleLike} className="cursor-pointer">
                    <Heart color="#7d9ade" />
                  </button>
                )}
                {like && (
                  <button onClick={handleLike} className="cursor-pointer">
                    <Heart color="#7d9ade" fill="#7d9ade" />
                  </button>
                )}
                <span>{likeCount}</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <MessageCircleDashed />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Comment</DialogTitle>
                  <DialogDescription>Type out your comment</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-10">
                  <div className="grid grid-cols-4 grid-rows-4 gap-4">
                    <input
                      id="name"
                      value={comment}
                      onChange={handleChange}
                      className="col-span-4 row-span-4 border-1"
                    />
                  </div>
                </div>
                <DialogClose asChild>
                  <DialogFooter>
                    <button type="submit" onClick={handleComment}>
                      <SendHorizontal />
                    </button>
                  </DialogFooter>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Link href={`/post/${data.id}`}>
          <ScanSearch />
        </Link>
      </div>
    </div>
  );
};
export default Post;
