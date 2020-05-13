import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade, Paper} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Fade from "@material-ui/core/Fade";

const DELAY = 3000; // ms
const FADE_ANIMATION_DURATION = 500;
let timeoutID: null | number = null;

/**
 * 1. init states: active === false, isMount === false --> null component returned
 * 2. switch active and isMount to true after DELAY after component is mounted --> actual component returned, fade in animation is activated
 * 3. if isLoaded props set to true within DELAY --> step 2 will be canceled
 * 4. if isLoaded props set to true after DELAY --> step 5
 * 5. active set to false, fade out animation is activated
 * 6. isMounted will be set to false when fade out animation is done
 */
export const useServerWaking = () => {
    // the state of fade is in
    const [active, setActive] = useState(false);
    // the state of mounting (null component returned if !isMount)
    const [isMount, setIsMount] = useState(false);

    const cleanUp = () => {
        if (timeoutID !== null) {
            clearTimeout(timeoutID);
            timeoutID = null;
        }
    };

    const showNotification = () => {
        setIsMount(true);
        setActive(true)
    };

    const handleLoaded = () => {
        cleanUp();
        if (active) {
            setActive(false)
        }
    };

    const turnToInactive = () => {
        if (active) {
            setActive(false)
        }
    };

    const unMount = () => {
        if (isMount) {
            setIsMount(false)
        }
    };

    useEffect(() => {
        // set active to true after DELAY
        timeoutID = window.setTimeout(showNotification, DELAY);

        return () => {
            cleanUp();
        }
    }, []);

    return {
        active,
        handleLoaded,
        turnToInactive,
        isMount,
        unMount
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

    const {active, handleLoaded, turnToInactive, isMount, unMount} = useServerWaking();

    useEffect(() => {
        if (isLoaded) handleLoaded();
    }, [isLoaded, handleLoaded]);

    if (isMount) {
        return (
            <Fade in={active} timeout={FADE_ANIMATION_DURATION} onExited={unMount}>
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
                    <IconButton aria-label="close" name="close" title="close" onClick={turnToInactive} className={classes.button}>
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
