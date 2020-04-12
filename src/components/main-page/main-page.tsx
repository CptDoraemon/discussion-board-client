import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PostListContainer from "../../containers/post-list-container";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        }
    },
    left: {
        width: "80%",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    right: {
        width: "20%",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    }
}));

interface MainPageProps {

}

const MainPage: React.FC<MainPageProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <PostListContainer />
            </div>
            <div className={classes.right}>
                sidebar
            </div>
        </div>
    )
};

export default MainPage