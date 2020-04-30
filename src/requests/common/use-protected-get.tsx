import {useEffect, useState} from "react";
import GENERIC_ERROR_MESSAGE from "./generic-error-message";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";

/**
 * The base of fetch with get method
 * @param {string} url The link to fetch
 * @param {boolean} fetchWhenComponentDidMount If true, will fetch automatically when componentDidMount
 * @param {boolean} redirectInvalidToken Redirect to login page if true
 */
const useProtectedGet = <FetchedDataType,>(
    url: RequestInfo,
    fetchWhenComponentDidMount: boolean,
    redirectInvalidToken: boolean
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState<FetchedDataType | null>(null);

    const fetchWithTokenVerification = useFetchWithTokenVerification();

    useEffect(() => {
        if (fetchWhenComponentDidMount) {
            doGet(url, redirectInvalidToken)
        }
    }, []);

    const doGet = async (
        url: RequestInfo,
        redirectInvalidToken: boolean
    ) => {
        try {
            if (loading) return;

            // reset states
            setError(false);
            setErrorMessage('');

            // start fetching
            setLoading(true);
            const res = await fetchWithTokenVerification(redirectInvalidToken, url, {});
            const json = await res.json();

            // server responded
            setLoading(false);
            if (json.status === 'success') {
                setData(json.data)
            } else if (json.status === 'error') {
                setError(true);
                setErrorMessage(json.message || GENERIC_ERROR_MESSAGE)
            }
            else {
                console.log(json);
                setError(true);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
            setError(true);
            setErrorMessage(GENERIC_ERROR_MESSAGE)
        }
    };

    return {
        loading,
        error,
        errorMessage,
        data,
        doGet
    }

};

export default useProtectedGet