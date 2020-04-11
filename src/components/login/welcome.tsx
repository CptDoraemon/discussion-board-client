import {Box, CircularProgress, Paper, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface WelcomeProps extends RouteComponentProps {
    // username: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '400px',
        margin: theme.spacing(10, 0),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcome: {

    }
}));

const Welcome: React.FC<WelcomeProps> = ({history}) => {
    const classes = useStyles();

    useEffect(() => {
        console.log(history);
    }, []);

    return (
        <Paper elevation={0} className={classes.root}>
            <h1>Welcome <span>{123}</span></h1>

        </Paper>
    )
};

export default Welcome