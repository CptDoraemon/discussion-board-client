import React, {useContext} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import LoggedInUserPanel from "./logged-in-user-panel";
import AnonymousUserPanel from "./anonymous-user-panel";

interface HeaderProps {
    isLogin: boolean,
    username: string,
}

const useStyles = makeStyles((theme) => ({
    headerDimension: {
        width: '100%',
        height: '80px',
    },
    root: {
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        zIndex: theme.zIndex.appBar,
        left: 0,
        top: 0,
        color: theme.palette.primary.contrastText
    },
    placeholder: {
        position: 'relative',
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#fff',
        fontWeight: 700,
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }
}));


const Header: React.FC<HeaderProps> = ({isLogin, username}) => {
    const classes = useStyles();

    return (
        <div className={`${classes.placeholder} ${classes.headerDimension}`}>
            <Grid container alignItems={"center"} justify={"center"} className={`${classes.root} ${classes.headerDimension}`}>
                <Grid item xs={6} md={4}>
                    <Link to={'/'}>
                        <Typography variant={'h1'} component={'h1'}>
                            <Box fontWeight={700} textAlign={"center"}>
                                Blog | XiaoxiHome
                            </Box>
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={1} md={4}>

                </Grid>
                <Grid item xs={5} md={4}>
                    {
                        isLogin ?
                            <LoggedInUserPanel username={username}/> :
                            <AnonymousUserPanel />
                    }
                </Grid>
            </Grid>
        </div>
    )
};



export default Header;
