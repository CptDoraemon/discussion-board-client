import {Box, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: [
            'Oleo Script Swash Caps',
            'sans-serif',
        ].join(','),
        fontWeight: 700,
        fontSize: '1.5rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '1.75rem',
        },
        fontStyle: "normal",
        color: "#fff",
        whiteSpace: 'nowrap',
        width: 'fit-content'
    }
}));

const Logo: React.FC = () => {
    const classes = useStyles();

    return (
        <Typography variant={'h1'} component={'h1'} className={classes.root}>
            <Box fontWeight={700} textAlign={"center"}>
                <Link to={'/'}>
                    Blog | XiaoxiHome
                </Link>
            </Box>
        </Typography>
    )
};

export default Logo
