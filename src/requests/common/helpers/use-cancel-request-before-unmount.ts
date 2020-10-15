import {useEffect, useMemo, useRef} from "react";
import axios, {CancelTokenSource} from 'axios';

const useCancelRequestBeforeUnmount = () => {
  const CancelTokenRef = useRef(axios.CancelToken);
  const sourceRef = useRef<CancelTokenSource[]>([]);

  const getAxiosToken = useMemo(() => {
    return () => {
      const source = CancelTokenRef.current.source();
      sourceRef.current.push(source);
      return  source.token;
    }
  }, []);

  useEffect(() => {
    // TODO cancel will throw a Cancel error which will still try tp update error state
    return () => {
      sourceRef.current.forEach(source => source.cancel('component will unmount'))
    }
  }, []);

  return getAxiosToken
};

export default useCancelRequestBeforeUnmount
