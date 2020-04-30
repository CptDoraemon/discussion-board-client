import {useDispatch} from "react-redux";
import urls from "./urls";
import {openSnackbar} from "../redux/actions/snackbar";
import {useHistory} from "react-router-dom";
import usePost from "./common/use-post";
import GENERIC_ERROR_MESSAGE from "./common/generic-error-message";

const useDelete = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const {
        loading,
        error,
        doPost
    } = usePost();

    const deletePost = async (
        id: number
    ) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const successCallback = () => {
            history.replace('/');
            dispatch(openSnackbar('Post deleted'));
        };
        const errorCallback = (message: string) => {
            dispatch(openSnackbar(message || GENERIC_ERROR_MESSAGE));
        };
        const unknownErrorCallback = () => {
            dispatch(openSnackbar(GENERIC_ERROR_MESSAGE));
        };

        doPost(urls.deletePost(id), options, true, successCallback, errorCallback, unknownErrorCallback);
    };

    return [loading, error, deletePost] as [typeof loading, typeof error, typeof deletePost]
};

export default useDelete