import React, {useMemo} from "react";
import {Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Logo from "../commons/logo";
import FooterColumn from "./footer-column";

const column1 = [
    {
        title: 'Learn More',
        url: ''
    },
    {
        title: 'API Endpoints',
        url: 'https://www.google.ca/'
    },
    {
        title: 'GitHub',
        url: 'https://github.com/CptDoraemon/discussion-board-client'
    },
    {
        title: 'XiaoxiHome',
        url: 'https://www.xiaoxihome.com/'
    },
];

const userStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '40px 0 8px 0'
    },
    paper: {
        width: '100%',
        backgroundColor: '#4a5568',
        color: '#a0aec0',
        padding: theme.spacing(5)
    },
    copyright: {
        width: '100%',
        margin: theme.spacing(5, 0, 0, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem'
    }
}));

const Footer: React.FC = () => {
    const classes = userStyles();

    return (
        <footer className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={5}>
                    <Grid item>
                        <Logo/>
                    </Grid>
                    <Grid item>
                        <FooterColumn data={column1} />
                    </Grid>
                </Grid>
                <div className={classes.copyright}>
                    <div>
                        © XiaoxiHome
                    </div>
                    <div>
                        Since 2020
                    </div>
                </div>
            </Paper>
        </footer>
    )
};

export default Footer
