import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button as MuiButton} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    button: {
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 700,
        textTransform: 'none',
        borderBottom: '2px solid rgba(0,0,0,0.1)',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        },
        '&:disabled': {
            backgroundColor: theme.palette.secondary.main,
            opacity: 0.7
        }
    }
}));

interface ButtonProps {
    text: string,
    disabled: boolean,
    form: string
}

const FormButton: React.FC<ButtonProps> = ({text, disabled, form}) => {
    const classes = useStyles();

    return (
        <MuiButton variant="contained" classes={{root: classes.button}} disableElevation type={'submit'} form={form} disabled={disabled}>
            { text }
        </MuiButton>
    )
};

export default FormButton
