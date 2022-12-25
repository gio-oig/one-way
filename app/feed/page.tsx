import CreatePost from "@components/feed/createPost/createPost";
import Post from "@components/feed/post";
import { fetchPosts } from "lib/api";

export default async function Page() {
  const posts = await fetchPosts();
  return (
    <main className="">
      <div className="mx-auto max-w-sm">
        <CreatePost />
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
    </main>
  );
}
