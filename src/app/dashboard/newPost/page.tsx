"use client";

import { UserContext } from "@/Contexts/UserContext";
import makePost from "@/utils/makePost";
import { CldUploadWidget } from "next-cloudinary";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";



const NewPost = () => {
  const res = useContext(UserContext)
  useEffect(() => {
    if (res?.user == null) {
      alert("Login to access this page");
      redirect("/dashboard")
    }
  }, [res])

  const handleSubmit = async (imageInfo?: string) => {
    if (res?.user != null) {
      // @ts-expect-error wrong
      const content = document.getElementById("con").value;
      if (!content.trim()) {
        alert("Enter some content");
        window.location.href="/dashboard/newPost"
        return;
      }
      const d = await makePost(content, res.user, imageInfo);

      if (d.success) {
        alert("Posted");
        // console.log(d)
        redirect("/dashboard")
      }
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl text-bold">New Post</h1>
      {res?.user == null ? (
        <div>Login</div>
      ) : (
        <div className="border-2 flex justify-center items-center">
          <div className="flex flex-col gap-5 justify-center items-center">
            <div className="items-center">
              <label htmlFor="" className="text-2xl">
                Whats on you mind?
              </label>
              <br />
              <textarea
                name="content"
                id="con"
                className="border-1 p-5 text-red-100"
                required
              ></textarea>
            </div>

            <CldUploadWidget
              options={{ sources: ["local", "camera"] }}
              signatureEndpoint="/api/sign-cloudinary-params"
              // @typescript-eslint/no-unused-vars wrong
              onSuccess={(result) => {
                if (result.info == undefined) {
                  handleSubmit();
                } else {
                  if (
                    typeof result.info !== "string" &&
                    result.info.public_id
                  ) {
                    handleSubmit(result.info.public_id);
                  }
                }
              }}
              onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
              onError={() => {
                alert("Some error occurred try again");
                window.location.href = "/dashboard/newPost";
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  open();
                }
                return (
                  <button
                    className="border-cyan-800 bg-violet-400 rounded-lg p-2 m-2 border-2 hover:bg-cyan-400 transition hover:text-black"
                    onClick={handleOnClick}
                  >
                    Post with Image
                  </button>
                );
              }}
            </CldUploadWidget>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="border-cyan-800 bg-violet-400 rounded-lg p-2 m-2 border-2 hover:bg-cyan-400 transition hover:text-black"
            >
              Just Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewPost;
