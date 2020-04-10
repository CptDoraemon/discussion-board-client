import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

}));

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    const classes = useStyles();

    return (
        <div>
            login
        </div>
    )
};

export default Login