import {Button} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.light,
        maxWidth: '100%',
        color: '#fff',
        fontWeight: 700,
        textTransform: 'capitalize',
        letterSpacing: 'inherit',
        borderBottom: '2px solid rgba(0,0,0,0.1)',
        borderRadius: '5px',
        padding: '4px 10px',
        '& span': {
            color: '#fff',
        },
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));

interface BaseButtonProps {
    width: string,
    text: string
}

interface GenericClickButtonProps extends BaseButtonProps {
    onClick: any,
    disabled?: boolean
}

const GenericClickButton: React.FC<GenericClickButtonProps> = ({width, text, onClick, disabled}) => {
    const classes = useStyles();

    return (
            <Button variant="contained" classes={{root: classes.button}} disableElevation onClick={onClick} style={{width: width}} disabled={disabled}>
                { text }
            </Button>
    )
};

interface GenericLinkButtonProps extends BaseButtonProps {
    link: string
}

const GenericLinkButton: React.FC<GenericLinkButtonProps> = ({width, text, link}) => {
    const classes = useStyles();

    return (
        <Button variant="contained" classes={{root: classes.button}} disableElevation component={Link} to={link} style={{width: width}}>
            { text }
        </Button>
    )
};

export {GenericClickButton, GenericLinkButton};