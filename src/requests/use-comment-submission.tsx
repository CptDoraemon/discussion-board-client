import urls from "./urls";
import useReload from "../utils/use-reload";
import usePost from "./common/use-post";

const useCommentSubmission = () => {
    const reload = useReload();
    const {
        loading,
        error,
        errorMessage,
        doPost
    } = usePost();

    const submit = (
        content: string,
        parentPost: string,
        parentComment: string | null
    ) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'content': content,
                'parent_post': parentPost,
                'parent_comment': parentComment
            })
        };
        doPost(urls.createComment, options, true, reload);
    };

    return [loading, error, errorMessage, submit] as [typeof loading, typeof error, typeof errorMessage, typeof submit]
};

export default useCommentSubmission