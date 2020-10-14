import urls from "./urls";
import useUnprotectedGet from "./common/use-unprotected-get";

interface Tag {
    tag: string,
    count: number
}

export type TagList = Tag[]

const useGetTagList = () => {
    const {
        loading,
        error,
        data
    } = useUnprotectedGet<TagList>(urls.tagList, true);

    return [loading, error, data] as [typeof loading, typeof error, typeof data]

};

export default useGetTagList
