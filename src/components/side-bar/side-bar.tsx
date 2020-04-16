import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {GenericLinkButton} from "../commons/generic-button";

interface SideBarProps {
    isLogin: boolean
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'calc(100% - 16px)',
        minHeight: '100px',
        margin: '8px',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            margin: '8px 0',
        }
    },
    rowWrapper: {
        width: '80%',
        margin: '8px 0'
    }
}));

const SideBar: React.FC<SideBarProps> = ({isLogin}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={0}>
            <div className={classes.rowWrapper}>
                <GenericLinkButton link={'/edit-post'} width={'100%'} text={'Create Post'}/>
            </div>
            {
                isLogin &&
                <div className={classes.rowWrapper}>
                    <GenericLinkButton link={'/account-setting'} width={'100%'} text={'Account Settings'}/>
                </div>
            }
        </Paper>
    )
};

export default SideBar