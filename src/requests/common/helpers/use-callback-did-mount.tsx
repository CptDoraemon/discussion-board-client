import {useEffect, useRef} from "react";

/**
 * A helper hook that execute provided function when component did mount
 * No need to worry about dependency warning anymore
 */
const useCallbackDidMount = (callback: () => void, shouldExecute?: boolean) => {
  const isCallbackExecuted = useRef<boolean>(false);

    useEffect(() => {
      if (isCallbackExecuted.current) return;
      if (!shouldExecute) return;
      callback();
      isCallbackExecuted.current = true;
    }, [callback, shouldExecute])
};

export default useCallbackDidMount
