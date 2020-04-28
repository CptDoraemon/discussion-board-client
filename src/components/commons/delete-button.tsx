import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";
import useDelete from "../../requests/use-delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.warning.light,
        fontSize: '1.25rem',
        "&:hover": {
            color: theme.palette.warning.main
        },
        "&:focus": {
            color: theme.palette.warning.main
        }
    },
    confirmButton: {
        color: theme.palette.warning.main
    }
}));

interface DeleteButtonProps {
    id: number
}

const DeleteButton: React.FC<DeleteButtonProps> = ({id}) => {
    const classes = useStyles();
    const [loading, error, deletePost] = useDelete();
    const [dialog, setDialog] = useState(false);

    const openDialog = () => {
        setDialog(true)
    };

    const closeDialog = () => {
        setDialog(false)
    };

    const doDeletePost = () => {
        deletePost(id)
    };

    return (
        <>
            <Tooltip title="Delete" aria-label="delete">
                <IconButton
                    aria-label={`delete`}
                    className={classes.button}
                    disabled={loading}
                    onClick={openDialog}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={dialog}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure to delete this post?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        It will not be possible to recover this post once deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Forget it
                    </Button>
                    <Button onClick={doDeletePost} autoFocus disabled={loading} className={classes.confirmButton}>
                        I'm sure
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DeleteButton