import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {usePrevious} from "react-use";

export default function RouterScrollRestoration() {
    const { pathname, search } = useLocation();
    const previousPathname = usePrevious(pathname);
    const previousSearch = usePrevious(search);

    useEffect(() => {
        if (previousSearch === undefined || previousPathname === undefined) {
            return
        }

        if (previousSearch !== search || previousPathname !== pathname) {
            window.scrollTo(0, 0);
        }
    }, [pathname, previousPathname, previousSearch, search])
}
