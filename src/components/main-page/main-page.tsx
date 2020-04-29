import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import PostListContainer from "../../containers/post-list-container";
import SideBarContainer from "../../containers/side-bar-container";
import {useParams} from "react-router-dom";
import ActiveTagChip from "./active-tag-chip";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0),
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
    tags: {
        width: "100%",
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
    }
}));

interface MainPageProps {

}

const MainPage: React.FC<MainPageProps> = () => {
    const classes = useStyles();
    const { tag } = useParams();

    return (
        <div className={classes.root}>
            {
                tag !== undefined &&
                <div className={classes.tags}>
                    <ActiveTagChip text={tag}/>
                </div>
            }
            <div className={classes.left}>
                <PostListContainer tag={tag || null}/>
            </div>
            <div className={classes.right}>
                <SideBarContainer />
            </div>
        </div>
    )
};

export default MainPage