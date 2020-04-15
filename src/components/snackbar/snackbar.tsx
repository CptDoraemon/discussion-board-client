import React from "react";
import {
    Box,
    createStyles,
    IconButton,
    Snackbar as MuiSnackbar,
    SnackbarContent,
} from "@material-ui/core";
import Close from '@material-ui/icons/Close';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => createStyles({
    root: {

    },
    content: {
        backgroundColor: theme.palette.primary.main,
    },
}));

interface SnackbarProps {
    open: boolean,
    closeSnackbar: () => void,
    message: string
}

const Snackbar: React.FC<SnackbarProps> = ({open, closeSnackbar, message}) => {
    const classes = useStyles();

    return (
        <MuiSnackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={closeSnackbar}
            className={classes.root}
        >
            <SnackbarContent
                className={classes.content}
                message={
                    <Typography variant={'body1'} component={'div'}>
                        <Box fontWeight={700}>
                            { message }
                        </Box>
                    </Typography>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={closeSnackbar}>
                        <Close/>
                    </IconButton>
                ]}
            />
        </MuiSnackbar>
    )
};

export default Snackbar;