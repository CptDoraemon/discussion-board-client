import {useHistory, useLocation} from "react-router-dom";

const useReload = () => {
    const history = useHistory();
    const location = useLocation();

    const reload = () => {
        history.replace('/');
        history.replace(location)
    };

    return reload
};

export default useReload