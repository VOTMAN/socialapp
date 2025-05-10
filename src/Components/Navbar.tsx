"use client";

import GithubButton from "@/Components/GithubButton";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/Contexts/UserContext";

const Navbar = () => {
  const user = useContext(UserContext)  
  return (
    <nav className="flex gap-5 justify-between items-center p-6 border-b border-b-blue-400 my-5">
      <div className="flex items-center align-middle">
        <span className="hover:underline underline-offset-4"><Link href="/">Wrong</Link></span>
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </div>
      <div>

        <GithubButton data={user?.user}/>
      </div>
    </nav>
  );
};
export default Navbar;
