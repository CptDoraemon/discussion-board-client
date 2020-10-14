import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useQuery from "./use-query";

export default function RouterScrollRestoration() {
    const { pathname } = useLocation();
    const queryParam = useQuery();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, queryParam]);

    return null;
}
