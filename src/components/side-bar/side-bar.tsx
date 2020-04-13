import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {GenericLinkButton} from "../commons/generic-button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100px',
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const SideBar: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={0}>
            <GenericLinkButton link={'/edit-post'} width={'80%'} text={'Create Post'}/>
        </Paper>
    )
};

export default SideBar