import Image from "next/image";



const Comment = (data: {
    id: string,
    name: string | null,
    userImg: string | null,
    time: Date | null,
    content: string
  }) => {
  return (
    <>
      <div className="border border-gray-500 mb-10 flex flex-col justify-between">
        <div className="flex justify-between border-b border-gray-300 p-3">
          <div className="flex gap-5 align-middle items-center">
            <Image priority src={data.userImg || ""} alt="userImage" width={50} height={50} className="rounded-full"/>
            <p>{data.name}</p>
          </div>
          <p>{data.time?.toString()}</p>
        </div>
        <div className="p-3">
        {data.content}
        </div>
      </div>
    </>
  );
};
export default Comment;
