import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.success.light,
        fontSize: '1.25rem',
        "&:hover": {
            color: theme.palette.success.main
        },
        "&:focus": {
            color: theme.palette.success.main
        }
    },
}));

interface EditButtonProps {

}

const EditButton: React.FC<EditButtonProps> = () => {
    const classes = useStyles();

    return (
        <Tooltip title="Edit" aria-label="edit">
            <IconButton
                aria-label={`edit`}
                className={classes.button}
            >
                <EditIcon/>
            </IconButton>
        </Tooltip>
    )
};

export default EditButton