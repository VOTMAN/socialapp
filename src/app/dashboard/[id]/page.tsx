import { getUserById } from "@/utils/getUserById";
import { getUserPosts } from "@/utils/post";
import Post from "@/Components/Post";
import { getUserLikes, getPostLikes } from "@/utils/like"; // add this if you want likes

type Props = {
  params: { id: string };
};

export default async function UserProfile({ params }: Props) {
  // Fetch user info
  const userRes = await getUserById(params.id);
  if (!userRes.success || !userRes.data) {
    return (
      <div className="text-center mt-10 text-red-400">User not found</div>
    );
  }
  const user = userRes.data;

  // Fetch user posts
  const postsRes = await getUserPosts(params.id);
  const posts = postsRes.success && postsRes.data ? postsRes.data : [];

  // Fetch like counts for all posts
  const likeCountsRes = await getPostLikes();
  const likeCounts = likeCountsRes.success ? likeCountsRes.data : [];

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-10">
      {/* User profile card */}
      <div className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20">
        <div className="flex flex-col items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-500 text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="text-center">
            <h2 className="text-2xl font-bold text-indigo-100">{user.name}</h2>
            <p className="text-sm text-indigo-200">{user.email}</p>
          </div>

          <div className="flex gap-6 text-indigo-200 text-sm mt-2">
            <p>
              Joined:{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              Last Active:{" "}
              {new Date(user.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* User posts */}
      <div>
        <h3 className="text-2xl font-semibold text-indigo-100 mb-6 text-center">
          {user.name}'s Posts
        </h3>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((p, idx) => (
              <Post
                key={idx}
                id={p.post.id}
                user={p.user?.name ?? ""}
                userId={p.user?.id ?? ""}
                content={p.post.content ?? ""}
                imageId={p.post.imageUrl ?? null}
                time={p.post.createdAt ?? null}
                liked={false}
                likedCount={
                  likeCounts?.find((like: any) => like.postId === p.post.id)?.likes || 0
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-indigo-200">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
