import { fetcher } from "lib/api";
import { useFilteresStore } from "store/feedFilter";
import useSWR from "swr";
import { IPost } from "types";
import { createQueryString } from "utils/functions";

const useFeed = () => {
  const { filters } = useFilteresStore();

  const {
    data: posts,
    isLoading,
    mutate,
  } = useSWR<IPost[]>([`/api/post?${createQueryString(filters)}`], fetcher);

  return {
    posts,
    isLoading,
    mutate,
  };
};

export default useFeed;
