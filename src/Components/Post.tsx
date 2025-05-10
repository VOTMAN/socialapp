import { CldImage } from "next-cloudinary";

const Post = (data: {
  user: string;
  content: string;
  imageId: string | null;
  time: Date | null;
}) => {
  return (
    <div className="flex flex-col justify-center align-middle min-w-fit border-amber-200 border p-5 my-7 gap-5">
      <div className="flex justify-around">
        <p>{data.user}</p>
        <p>{(data.time?.toTimeString()) + " - " + (data.time?.toDateString())}</p>
      </div>
      <hr />
      <p>{data.content}</p>
      <hr />
      {data.imageId != null ? (
        <div className="flex flex-col items-center">
          <CldImage
            width={800}
            height={450}
            src={(data.imageId as string) || ""}
            alt="Some Image"
            className="max-w-full bg-gray-700 max-h-screen mb-6"
          />

        </div>
      ) : null}
      <hr />
      <div className="flex gap-5">
        <div className="flex gap-2">
          <button>Like</button>
          <span>5</span>
        </div>
        <div className="flex gap-2">
          <button>Comment</button>
          <span>2</span>
        </div>
      </div>
    </div>
  );
};
export default Post;
