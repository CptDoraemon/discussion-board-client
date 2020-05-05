import {useHistory, useLocation} from "react-router-dom";
import useReload from "./use-reload";

// redirect to "/" in these cases:
const blacklist: string[] = [
    "/login",
    "/register"
];

const useRedirectBack = () => {
    let history = useHistory();
    let location = useLocation<any>();
    const reload = useReload();

    const goBack = () => {
        let from = "/";

        if (location.state && location.state.from) {
            if (typeof location.state.from === "string") {
                if (blacklist.indexOf(location.state.from) === -1) {
                    from = location.state.from
                }
            } else {
                // from is object
                if (location.state.from.pathname) {
                    if (blacklist.indexOf(location.state.from.pathname) === -1) {
                        from = Object.assign({}, location.state.from)
                    }
                }
            }
        }

        history.replace(from);
    };

    return goBack
};

export default useRedirectBack