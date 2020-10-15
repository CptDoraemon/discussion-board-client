import GENERIC_ERROR_MESSAGE from "./generic-error-message";
import useCallbackDidMount from "../../utils/use-callback-did-mount";
import useRequestState from "./helpers/use-request-states";
import axios from 'axios';
import useCancelRequestBeforeUnmount from "./helpers/use-cancel-request-before-unmount";

/**
 * Generic hook to fetch data with get method, with no authentications
 * @param {string} url The link to fetch
 * @param {boolean} fetchWhenComponentDidMount If true, will fetch automatically when componentDidMount
 */
const useUnprotectedGet = <FetchedDataType,>(
    url: string,
    fetchWhenComponentDidMount: boolean
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
    } = useRequestState();
    useCallbackDidMount(doGet, fetchWhenComponentDidMount);
    const getAxiosToken = useCancelRequestBeforeUnmount();

    async function doGet () {
        try {
            if (loading) return;
            // reset states
            resetError();

            // start fetching
            setLoading(true);
            const res = await axios.get(url, {cancelToken: getAxiosToken()});
            const json = await res.data;

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

export default useUnprotectedGet
