import React, {useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import useFullHeight from "../../../utils/use-full-height";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(10, 0),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '40%',
        height: '100%',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        [theme.breakpoints.down('sm')]: {
            display:'none'
        }
    },
    content: {
        width: '60%',
        padding: theme.spacing(10, 5),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    textField: {
        width: '100%',
        fontWeight: 700
    },
    link: {
        fontWeight: 700,
        '& a:link': {
            color: theme.palette.primary.main
        },
        '& a:visited': {
            color: theme.palette.primary.main
        },
        '& a:hover': {
            color: theme.palette.secondary.main
        }
    }
}));

interface LoginCommonProps {
    imageUrl: string
}

const LoginCommon: React.FC<LoginCommonProps> = ({children, imageUrl}) => {
    const classes = useStyles();

    const containerRef = useRef<HTMLDivElement>(null);
    const height = useFullHeight(containerRef);

    return (
        <Paper elevation={0} className={classes.root} ref={containerRef}>
            <div className={classes.image}>
                <img
                    src={process.env.PUBLIC_URL + imageUrl}
                    alt={'login background'}
                    style={{height: `${height}px`}}
                    title={'login background'}
                />
            </div>
            <div className={classes.content}>
                { children }
            </div>
        </Paper>
    )
};

export default LoginCommon