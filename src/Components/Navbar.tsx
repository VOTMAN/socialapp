"use client";

import GithubButton from "@/Components/GithubButton";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/Contexts/UserContext";

const Navbar = () => {
  const user = useContext(UserContext)
  return (
    <nav className="flex gap-5 justify-between items-center p-6 border-b border-b-blue-400 my-5">
      <div className="flex items-center align-middle gap-4">
        <span className="hover:underline underline-offset-4"><Link href="/">Home</Link></span>
          <Link href="/about" className="hover:underline underline-offset-4">About</Link>
      </div>
      <div>

        <GithubButton
          id={user?.user?.id as string}
          image={user?.user?.image as string}
        />
      </div>
    </nav>
  );
};
export default Navbar;
