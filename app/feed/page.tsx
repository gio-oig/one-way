"use client";
import Button from "@components/common/button/button";
import SelectButton from "@components/common/selectButton/selectButton";
import CreatePost from "@components/feed/createPost/createPost";
import Post from "@components/feed/post";
import { useEffect, useState } from "react";
import FilterPosts from "@components/feed/filterPosts/filterPosts";
import useFeed from "@components/feed/hooks/useFeed";

const tabComponents = {
  "create post": <CreatePost />,
  filter: <FilterPosts />,
};

export default function Page() {
  // const { data: posts, isLoading } = useSWR<IPost[]>("/api/post", fetcher);
  const { isLoading, posts } = useFeed();
  const [selectedTab, setSelectedTab] = useState<
    keyof typeof tabComponents | ""
  >("");

  const TabComponent = selectedTab ? tabComponents[selectedTab] : <></>;

  return (
    <main className="">
      <div className="mx-auto max-w-sm">
        <div className="flex gap-x-2">
          {Object.keys(tabComponents).map((item, i) => (
            <SelectButton
              key={i}
              value={item}
              onClick={() => setSelectedTab(item as keyof typeof tabComponents)}
            />
          ))}
        </div>
        {/* <CreatePost /> */}
        {TabComponent}
        {isLoading || !posts ? (
          <div>loading posts...</div>
        ) : (
          posts.map((post, i) => <Post key={i} post={post} />)
        )}
      </div>
    </main>
  );
}
