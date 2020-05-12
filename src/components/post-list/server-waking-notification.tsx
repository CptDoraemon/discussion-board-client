import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade, Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Fade from "@material-ui/core/Fade";

const DELAY = 3000; // ms
let timeoutID: null | number = null;

const useServerWaking = () => {
    const [active, setActive] = useState(false);

    const turnToActive = () => {
        setActive(true)
    };

    const cleanUp = () => {
        if (timeoutID !== null) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }
    };

    const cancel = () => {
        cleanUp();
        if (active) {
            setActive(false)
        }
    };

    useEffect(() => {
        // set active to true after DELAY
        timeoutID = window.setTimeout(turnToActive, DELAY);

        return () => {
            cleanUp();
        }
    }, []);

    return {
        active,
        cancel
    }
};

interface HeaderProps {
    isLoaded: boolean
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
        padding: theme.spacing(1, 2),
        margin: theme.spacing(1, 0, 0, 0),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        width: 'calc(100% - 50px)'
    },
    button: {
        width: '50px',
    },
    noWrap: {
        whiteSpace: 'nowrap'
    },
    link: {
        '&:link': {
            textDecoration: 'underline',
            fontWeight: 700
        },
        '&:visited': {
            textDecoration: 'underline',
            fontWeight: 700
        },
        '&:hover': {
            color: fade(theme.palette.warning.contrastText, 0.5)
        }
    }
}));


const ServerWakingNotification: React.FC<HeaderProps> = ({isLoaded}) => {
    const classes = useStyles();

    const {active, cancel} = useServerWaking();
    const [fadeInActive, setFadeInActive] = useState(true);

    useEffect(() => {
        if (isLoaded) cancel();
    }, [isLoaded, cancel]);

    if (active) {
        return (
            <Fade in={fadeInActive} timeout={500} onExited={cancel}>
                <Paper elevation={0} className={classes.root}>
                    <div className={classes.text}>
                        <p>
                            {'The backend of this application falls asleep again, usually he will wake up in half minute '}
                            <span className={classes.noWrap}>
                                ٩(ˊ〇ˋ*)و
                            </span>
                        </p>
                        <p>
                            <span>Wanna check out </span>
                            <a
                                href='https://www.xiaoxihome.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className={classes.link}
                            >
                                XiaoxiHome
                            </a>
                            <span> while waiting?</span>
                        </p>
                    </div>
                    <IconButton aria-label="close" onClick={() => setFadeInActive(false)} className={classes.button}>
                        <CloseIcon />
                    </IconButton>
                </Paper>
            </Fade>
        )
    } else {
        return null
    }
};

export default ServerWakingNotification;
