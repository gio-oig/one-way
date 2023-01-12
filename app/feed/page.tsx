"use client";
import Button from "@components/common/button/button";
import CreatePost from "@components/feed/createPost/createPost";
import Post from "@components/feed/post";
import { fetcher } from "lib/api";
import { useFilteresStore } from "store/feedFilter";
import useSWR from "swr";
import { IPost } from "types";

export default function Page() {
  const { data: posts, isLoading } = useSWR<IPost[]>("/api/post", fetcher);
  const { filters } = useFilteresStore();

  const filteredFeed = posts?.filter((post) => {
    if (filters.postType && post.type !== filters.postType) {
      return false;
    }

    return true;
  });

  return (
    <main className="">
      <div className="mx-auto max-w-sm">
        <CreatePost />
        {/* <div className="flex justify-around">
          <Button className="border">Create new Post</Button>
          <Button className="border">Filter posts</Button>
        </div> */}
        {isLoading || !filteredFeed ? (
          <div>loading posts...</div>
        ) : (
          filteredFeed.map((post, i) => <Post key={i} post={post} />)
        )}
      </div>
    </main>
  );
}
