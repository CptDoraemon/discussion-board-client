import {useEffect} from "react";

const defaultTitle = 'Blog | XiaoxiHome';

function useSetTitle(title?: string) {

    useEffect(() => {
        document.title = title || defaultTitle;

        return () => {
            document.title = defaultTitle;
        }
    }, [title]);
}

export default useSetTitle;