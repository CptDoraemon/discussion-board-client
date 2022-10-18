import urls from "./urls";
import useProtectedGet from "./common/use-protected-get";
import {useMount,} from 'react-use';
import { PostListPost } from "./use-get-post-list";

export interface PinnedPostsData {
  posts: PostListPost[],
}


const useGetPinnedPosts = () => {
  const url = urls.allPinnedPosts;

  const {
    loading,
    error,
    data,
    doGet
  } = useProtectedGet<PinnedPostsData>(url, false);

  useMount(() => {
    doGet(url, false)
  })

  return {loading, error, data}
};

export default useGetPinnedPosts
