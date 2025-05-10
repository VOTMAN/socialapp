import { authClient } from "@/utils/auth-client";
import Image from "next/image";
import Link from "next/link";

const GithubButton = ({ data }: any) => {
  console.log("BTN", data);
  const signIn = async () => {
    const res = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    // console.log(res);
  };
  return (
    <div className="flex gap-5 items-center">
      {data == null ? (
        <div>
          <button className="cursor-pointer" onClick={signIn}>
            Sign In
          </button>
        </div>
      ) : null}
      {data != null ? (
        <div>
          <Link href="/dashboard">
            <Image
              src={data.image}
              alt="User Image and Dashboard"
              width={50}
              height={50}
              className="w-20 h-20 bg-gray-400 hover:opacity-50"
            />
          </Link>

          {data.user == null && (
            <button
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/";
              }}
              className="border-2 px-1 min-w-full my-1"
            >
              Logout
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default GithubButton;
