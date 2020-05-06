import {useEffect, useState} from "react";
import GENERIC_ERROR_MESSAGE from "./generic-error-message";

/**
 * Generic hook to fetch data with get method, with no authentications
 * @param {string} url The link to fetch
 * @param {boolean} fetchWhenComponentDidMount If true, will fetch automatically when componentDidMount
 */
const useUnprotectedGet = <FetchedDataType,>(
    url: RequestInfo,
    fetchWhenComponentDidMount: boolean
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState<FetchedDataType | null>(null);

    useEffect(() => {
        if (fetchWhenComponentDidMount) {
            doGet()
        }
    }, []);

    const doGet = async (
    ) => {
        try {
            if (loading) return;
            // reset states
            setError(false);
            setErrorMessage('');

            // start fetching
            setLoading(true);
            const res = await fetch(url);
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

export default useUnprotectedGet