import urls from "./urls";
import useUnprotectedGet from "./common/use-unprotected-get";

const useGetTagList = () => {
    const {
        loading,
        error,
        data
    } = useUnprotectedGet<string[][]>(urls.tagList, true);

    return [loading, error, data] as [typeof loading, typeof error, typeof data]

};

export default useGetTagList