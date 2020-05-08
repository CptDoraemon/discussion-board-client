import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    link: {
        '&:link': {
            color: theme.palette.primary.main
        },
        '&:visited': {
            color: theme.palette.primary.main
        },
        '&:hover': {
            color: theme.palette.secondary.main
        }
    }
}));

interface ButtonProps {
    text: string,
    to: string,
    fromState: boolean // pass state.from = location.pathname to Link to object if true
}

const ThemeLink: React.FC<ButtonProps> = ({text, to, fromState}) => {
    const classes = useStyles();
    const location = useLocation();

    const _to = fromState ?
        {
            pathname: to,
            state: {
                from: location.pathname
            }
        } :
        to;


    return (
        <Link to={_to} className={classes.link}>{text}</Link>
    )
};

export default ThemeLink
