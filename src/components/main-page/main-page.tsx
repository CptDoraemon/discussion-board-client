import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PostListContainer from "../../containers/post-list-container";
import SideBarContainer from "../../containers/side-bar-container";
import useQuery from "../../utils/use-query";
import {Paper, Typography} from "@material-ui/core";
import PinnedPostsContainer from "../../containers/pinned-posts-container";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            margin: 0,
        }
    },
    left: {
        width: "75%",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    right: {
        width: "25%",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        }
    },
    sectionTitlePaper: {
        padding: theme.spacing(1, 2),
        margin: theme.spacing(1, 0),
        width: "100%",
    },
    sectionTitle: {
        fontWeight: 700
    }
}));

interface MainPageProps {

}

const MainPage: React.FC<MainPageProps> = () => {
    const classes = useStyles();
    const query = useQuery();
    const tag = query.get('tag');
    const page = query.get('page') || '1';

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Paper className={classes.sectionTitlePaper} elevation={0}>
                    <Typography className={classes.sectionTitle} variant={'caption'}>
                        PINNED
                    </Typography>
                </Paper>
                <PinnedPostsContainer/>
                <Paper className={classes.sectionTitlePaper} elevation={0}>
                    <Typography className={classes.sectionTitle} variant={'caption'}>
                        POSTS
                    </Typography>
                </Paper>
                <PostListContainer tag={tag} page={page} key={`tag=${tag}&page=${page}`}/>
            </div>
            <div className={classes.right}>
                <SideBarContainer />
            </div>
        </div>
    )
};

export default MainPage
