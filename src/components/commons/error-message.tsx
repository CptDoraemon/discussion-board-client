import {Box, CircularProgress, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    errorMessage: {
        fontWeight: 700,
        color: theme.palette.error.main
    }
}));

interface ErrorMessageProps {
    loading: boolean,
    error: boolean,
    errorMessage: string,
    spinnerSize?: number

}

const ErrorMessage:React.FC<ErrorMessageProps> = ({loading, errorMessage, error, spinnerSize}) => {
    const classes = useStyles();

    return (
        <Typography variant={'body1'} component={'div'}>
            <Box className={classes.errorMessage} height={40}>
                {   loading ?
                        <CircularProgress color="primary" size={spinnerSize || 40}/> :
                        error && errorMessage ?
                            errorMessage :
                            ' '
                }
            </Box>
        </Typography>
    )
};

export default ErrorMessage
