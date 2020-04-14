import {useHistory, useLocation} from "react-router-dom";

const useRedirectToLogin = () => {
    const history = useHistory();
    const location = useLocation();

    const redirectToLogin = () => {
        history.push({
            pathname: "/login",
            state: {
                from: location.pathname
            }
        });
    };

    return redirectToLogin
};

export default useRedirectToLogin