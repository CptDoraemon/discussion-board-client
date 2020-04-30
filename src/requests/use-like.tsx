import {useDispatch} from "react-redux";
import urls from "./urls";
import {openSnackbar} from "../redux/actions/snackbar";
import {PostData} from "../components/post-list/post";
import usePost from "./common/use-post";
import GENERIC_ERROR_MESSAGE from "./common/generic-error-message";

type Type = 'post' | 'comment';
type Action = 1 | 0 | -1;

const useLike = (type: Type, id: string) => {
    const dispatch = useDispatch();

    const {
        loading,
        error,
        data: updatedData,
        doPost
    } = usePost<PostData>();

    const like = async (
        action: Action
    ) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "target_type": type,
                "target_id": id,
                action
            })
        };
        const errorCallback = (message: string) => {
            dispatch(openSnackbar(message || GENERIC_ERROR_MESSAGE));
        };
        const unknownErrorCallback = () => {
            dispatch(openSnackbar(GENERIC_ERROR_MESSAGE));
        };

        doPost(urls.like, options, true, null, errorCallback, unknownErrorCallback);
    };

    return [loading, error, updatedData, like] as [typeof loading, typeof error, typeof updatedData, typeof like]
};

export default useLike;