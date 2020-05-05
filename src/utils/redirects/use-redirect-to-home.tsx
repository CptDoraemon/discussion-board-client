import {useHistory} from "react-router-dom";

const useRedirectToHome = () => {
    const history = useHistory();

    const toHome = () => {
        history.replace('/404');
        history.replace('/');
    };

    return toHome
};

export default useRedirectToHome