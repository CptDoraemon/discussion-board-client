import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {GenericLinkButton} from "../commons/generic-button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'calc(100% - 16px)',
        minHeight: '100px',
        margin: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '8px 0',
        }
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