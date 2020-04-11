import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useGetPostList from "../../requests/useGetPostList";
import PostList from "../post-list/post-list";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(10, 0),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    left: {
        width: "80%",
    },
    right: {
        width: "20%",
    }
}));

interface MainPageProps {

}

const MainPage: React.FC<MainPageProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <PostList />
            </div>
            <div className={classes.right}>
                sidebar
            </div>
        </div>
    )
};

export default MainPage