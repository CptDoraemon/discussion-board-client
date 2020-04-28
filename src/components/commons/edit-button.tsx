import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    textColor: {
        color: theme.palette.success.light,
    },
    button: {
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
    id: number
}

const EditButton: React.FC<EditButtonProps> = ({id}) => {
    const classes = useStyles();

    return (
        <Tooltip title="Edit" aria-label="edit">
            <Box className={classes.textColor}>
                <IconButton
                    aria-label={`edit`}
                    component={Link}
                    to={`/edit-post/${id}`}
                    classes={{
                        root: classes.button
                    }}
                >
                    <EditIcon/>
                </IconButton>
            </Box>
        </Tooltip>
    )
};

export default EditButton