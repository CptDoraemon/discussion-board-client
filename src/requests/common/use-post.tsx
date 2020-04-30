import {useState} from "react";
import GENERIC_ERROR_MESSAGE from "./generic-error-message";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

/**
 * The base of fetch with get method
 * @return {usePost~doPost} The actual post function
 */
const usePost = <ResponseDataType,>() => {
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState<ResponseDataType | null>(null);

    /**
     * The actual post function
     * @param {string} url The link to fetch
     * @param {boolean} options The options that will be passed to fetch
     * @param {boolean} redirectInvalidToken Redirect to login page if true
     * @param {boolean} callbackOnSuccess A function to be called upon success response is received
     * @param {boolean} callbackOnError A function to be called upon error response is received
     * @param {boolean} callbackOnUnknownError A function to be called upon unexpected error is captured
     */
    const doPost = async (
        url: RequestInfo,
        options: RequestInit,
        redirectInvalidToken: boolean,
        callbackOnSuccess?: (<T>(data?: T) => void) | null,
        callbackOnError?: ((message: string) => void) | null,
        callbackOnUnknownError?: (() => void) | null,
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);
            setErrorMessage('');
            setLoading(true);

            // start fetching
            const res = await fetchWithTokenVerification(redirectInvalidToken, url, {...options});
            const json = await res.json();

            // response received
            setLoading(false);
            if (json.status === 'success') {
                setData(json.data);
                if (callbackOnSuccess) callbackOnSuccess(json.data);
            } else if (json.status === 'error') {
                setErrorMessage(json.message);
                setError(true);
                if (callbackOnError) callbackOnError(json.message);
            } else {
                setErrorMessage(GENERIC_ERROR_MESSAGE);
                setError(true);
                if (callbackOnUnknownError) callbackOnUnknownError();
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setErrorMessage(GENERIC_ERROR_MESSAGE);
            setError(true);
            if (callbackOnUnknownError) callbackOnUnknownError();
        }
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        doPost
    }
};

export default usePost