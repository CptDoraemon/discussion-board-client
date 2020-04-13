import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {connect, Provider} from 'react-redux';
import configureStore from "./redux/configure-store";
import { CssBaseline } from "@material-ui/core";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import Login from "./components/login/login";
import Register from "./components/login/register";
import HeaderContainer from "./containers/header-container";
import MainPage from "./components/main-page/main-page";
import SnackbarContainer from "./containers/snackbar-container";
import Footer from "./components/footer/footer";
import PrivateRoute from "./utils/protected-router";
import PostEditor from "./components/post-editor/post-editor";
import {State} from "./redux/state";
import {Dispatch} from "redux";
import {closeSnackbar} from "./redux/actions/snackbar";
import Snackbar from "./components/snackbar/snackbar";
import PostDetail from "./components/post-detail/post-detail";

const store = configureStore();

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    widthWrapper: {
        margin: theme.spacing(5, 0, 0, 0),
        width: '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 16px)',
            margin: theme.spacing(0, 1),
        }
    }
}));

interface InnerAppProps {
    isLogin: boolean
}

const InnerApp: React.FC<InnerAppProps> = ({isLogin}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router basename={process.env.PUBLIC_URL}>
                <HeaderContainer />
                <div className={classes.widthWrapper}>
                    <Switch>
                        <Route path="/" exact render={ () => <MainPage /> } />
                        <Route path="/login" render={ () => <Login /> } />
                        <Route path="/register" render={ () => <Register /> } />
                        <Route path="/post/:postID" render={ () => <PostDetail /> } />
                        <PrivateRoute path="/edit-post/:postID?" isLogin={isLogin}>
                            <PostEditor/>
                        </PrivateRoute>
                        {/*<Route path="/welcome" component={Welcome} />*/}
                    </Switch>
                    <Footer />
                </div>
            </Router>

            <SnackbarContainer />
        </div>
    )
};

function mapStateToProps(state: State) {
    return {
        isLogin: state.loginStatus.isLogin
    }
}

const InnerAppContainer = connect(
    mapStateToProps,
)(InnerApp);

export default InnerAppContainer;
