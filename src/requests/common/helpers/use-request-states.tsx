import {useCallback, useState} from "react";

const BLANK_ERROR_MESSAGE = '';

const useRequestState = <FetchedDataType,>() => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(BLANK_ERROR_MESSAGE);
  const [data, setData] = useState<FetchedDataType | null>(null);
  const error = errorMessage !== BLANK_ERROR_MESSAGE;

  const resetError = useCallback(() => {
    setErrorMessage(BLANK_ERROR_MESSAGE)
  }, []);

  return {
    loading,
    setLoading,
    errorMessage,
    setErrorMessage,
    data,
    setData,
    error,
    resetError
  }
};

export default useRequestState
