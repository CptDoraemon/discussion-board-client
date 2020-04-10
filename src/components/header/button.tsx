import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button as MuiButton} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: '#fff',
        fontWeight: 700,
        textTransform: 'capitalize',
        letterSpacing: 'inherit',
        borderBottom: '2px solid rgba(0,0,0,0.1)',
        borderRadius: '5px',
        margin: '0 4px',
        padding: '4px 10px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));

interface ButtonProps {
    text: string,
    url: string
}

const Button: React.FC<ButtonProps> = ({text, url}) => {
    const classes = useStyles();

    return (
        <MuiButton variant="contained" classes={{root: classes.button}} disableElevation href={url}>
            { text }
        </MuiButton>
    )
};

export default Button