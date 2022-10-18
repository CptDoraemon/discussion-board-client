import usePost from "./common/use-post";
import {openSnackbar} from "../redux/actions/snackbar";
import GENERIC_ERROR_MESSAGE from "./common/generic-error-message";
import urls from "./urls";
import {useDispatch} from "react-redux";

const usePin = (id: string) => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    data: updatedData,
    doPost
  } = usePost<{
    is_pinned: boolean
  }>();

  const pin = async (
    isPinned: boolean
  ) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isPinned,
        id
      })
    };
    const errorCallback = (message: string) => {
      dispatch(openSnackbar(message || GENERIC_ERROR_MESSAGE));
    };
    const unknownErrorCallback = () => {
      dispatch(openSnackbar(GENERIC_ERROR_MESSAGE));
    };

    await doPost(
      urls.pinPost,
      options,
      true,
      null,
      errorCallback,
      unknownErrorCallback
    );
  };

  return {loading, error, updatedData, pin}
};

export default usePin