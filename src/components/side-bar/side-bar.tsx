import {Button} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100px',
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: theme.palette.primary.light,
        width: '80%',
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

const SideBar: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={0}>
            <Button variant="contained" classes={{root: classes.button}} disableElevation component={Link} to={'/edit-post'}>
                Create Post
            </Button>
        </Paper>
    )
};

export default SideBar