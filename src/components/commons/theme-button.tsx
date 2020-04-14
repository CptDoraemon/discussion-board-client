import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button as MuiButton} from "@material-ui/core";
import {Link, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#fff',
        fontWeight: 700,
        textTransform: 'capitalize',
        letterSpacing: 'inherit',
        borderBottom: '2px solid rgba(0,0,0,0.1)',
        borderRadius: '5px',
        // margin: '0 4px',
        padding: '4px 10px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));

interface ButtonProps {
    text: string,
    url?: string,
    onClick?: () => void
}

const ThemeButton: React.FC<ButtonProps> = ({text, url, onClick}) => {
    const classes = useStyles();
    const location = useLocation();

    if (url) {
        const to = {
            pathname: url,
            state: {
                from: location.pathname
            }
        };
        return (
            <MuiButton variant="contained" classes={{root: classes.button}} disableElevation component={Link} to={to}>
                { text }
            </MuiButton>
        )
    } else {
        return (
            <MuiButton variant="contained" classes={{root: classes.button}} disableElevation onClick={onClick}>
                { text }
            </MuiButton>
        )
    }
};

export default ThemeButton
