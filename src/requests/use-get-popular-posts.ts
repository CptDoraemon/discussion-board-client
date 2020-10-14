import urls from "./urls";
import useUnprotectedGet from "./common/use-unprotected-get";
import {PostListData} from "./use-get-post-list";

const useGetPopularPosts = () => {
  const url = urls.popularPosts;

  const {
    loading,
    error,
    data
  } = useUnprotectedGet<PostListData>(url, true);

  return [loading, error, data] as [typeof loading, typeof error, typeof data]
};

export default useGetPopularPosts
