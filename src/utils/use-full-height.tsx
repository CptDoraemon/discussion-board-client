import React, {useEffect, useState} from "react";

const useFullHeight = (ref: React.RefObject<HTMLDivElement>) => {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        setHeight(ref.current.getBoundingClientRect().height)
    }, [ref]);

    return height
};

export default useFullHeight