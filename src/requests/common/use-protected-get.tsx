import GENERIC_ERROR_MESSAGE from "./generic-error-message";
import useFetchWithTokenVerification from "./use-fetch-with-token-verification";
import useRequestState from "./helpers/use-request-states";
import useCallbackDidMount from "./helpers/use-callback-did-mount";

/**
 * Generic hook to fetch data with get method, with authentications
 * @param {string} url The link to fetch
 * @param {boolean} fetchWhenComponentDidMount If true, will fetch automatically when componentDidMount
 * @param {boolean} redirectInvalidToken Redirect to login page if true
 */
const useProtectedGet = <FetchedDataType,>(
    url: RequestInfo,
    fetchWhenComponentDidMount: boolean,
    redirectInvalidToken: boolean
) => {
    const {
        loading,
        setLoading,
        errorMessage,
        setErrorMessage,
        data,
        setData,
        error,
        resetError
    } = useRequestState<FetchedDataType>();
    useCallbackDidMount(() => doGet(url, redirectInvalidToken), fetchWhenComponentDidMount);
    const fetchWithTokenVerification = useFetchWithTokenVerification();

    async function doGet (
      url: RequestInfo,
      redirectInvalidToken: boolean
    ) {
        try {
            if (loading) return;

            // reset states
            resetError();

            // start fetching
            setLoading(true);
            const res = await fetchWithTokenVerification(redirectInvalidToken, url, {});
            const json = await res.json();

            // server responded
            if (json.status === 'success') {
                setData(json.data)
            } else if (json.status === 'error') {
                setErrorMessage(json.message || GENERIC_ERROR_MESSAGE)
            }
            else {
                setErrorMessage(GENERIC_ERROR_MESSAGE)
            }
        } catch (e) {
            console.log(e);
            setErrorMessage(GENERIC_ERROR_MESSAGE)
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        errorMessage,
        data,
        doGet
    }
};

export default useProtectedGet
