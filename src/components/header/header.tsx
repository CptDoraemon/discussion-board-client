import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import LoggedInUserPanel from "./logged-in-user-panel";
import AnonymousUserPanel from "./anonymous-user-panel";
import Logo from "../commons/logo";

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
        width: '100%',
        height: '80px',
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        zIndex: theme.zIndex.appBar,
        left: 0,
        top: 0,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(0, 1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        position: 'relative',
    },
    widthWrapper: {
        width: '1000px',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 16px)',
            margin: theme.spacing(0, 1),
        },
    },
    logo: {
        flex: 1
    },
    buttonGroup: {

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
        <header className={`${classes.placeholder} ${classes.headerDimension}`}>
            <div className={`${classes.root} ${classes.headerDimension}`}>
                <div className={classes.widthWrapper}>
                    <div className={classes.logo}>
                        <Logo/>
                    </div>
                    <div className={classes.buttonGroup}>
                        { isLogin ? <LoggedInUserPanel username={username}/> : <AnonymousUserPanel />}
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;
