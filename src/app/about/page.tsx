"use client";

import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16 px-4 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-100 mb-4">About Social App</h1>
        <p className="text-indigo-200 text-lg">
          Social App is a simple and interactive platform where users can share their thoughts, post images, like posts, and comment on others&apos; ideas. Our goal is to make social interaction easy, fun, and meaningful.
        </p>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 space-y-6">
        <h2 className="text-2xl font-semibold text-indigo-100">Features</h2>
        <ul className="list-disc list-inside text-indigo-200 space-y-2">
          <li>Create posts with text and images</li>
          <li>View all posts from the community</li>
          <li>Like and comment on posts</li>
          <li>View user profiles and their posts</li>
          <li>OAuth login using GitHub</li>
        </ul>
      </div>

      <div className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 space-y-6">
        <h2 className="text-2xl font-semibold text-indigo-100">Tech Stack</h2>
        <ul className="list-disc list-inside text-indigo-200 space-y-2">
          <li>Next.js & React for frontend</li>
          <li>TailwindCSS & shadCN for UI</li>
          <li>Better Auth for authentication</li>
          <li>Drizzle ORM with PostgreSQL for database</li>
          <li>Cloudinary for image storage</li>
          <li>Vercel for hosting</li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-indigo-200">
          Explore the community and start sharing your ideas!{" "}
          <Link href="/dashboard">
            <span className="text-indigo-100 underline cursor-pointer">Go to Dashboard</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default About;
