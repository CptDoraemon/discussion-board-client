import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Login from "./components/login/login";
import Register from "./components/login/register";
import HeaderContainer from "./containers/header-container";
import MainPage from "./components/main-page/main-page";
import SnackbarContainer from "./containers/snackbar-container";
import Footer from "./components/footer/footer";
import PrivateRoute from "./utils/protected-router";
import PostEditor from "./components/post-editor/post-editor";
import {State} from "./redux/state";
import PostDetail from "./components/post-detail/post-detail";
import RouterScrollRestoration from "./utils/router-scroll-restoration";
import AccountSettingContainer from "./containers/account-setting-container";
import ConfettiWrapper from "./components/confetti/confetti-wrapper";
import routes from "./routes";

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
    },
    confetti: {
        position: 'fixed',
        zIndex: theme.zIndex.tooltip + 1,
        bottom: '0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

interface InnerAppProps {
    isLogin: boolean,
    confetti: boolean
}

const InnerApp: React.FC<InnerAppProps> = ({isLogin, confetti}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router basename={process.env.PUBLIC_URL}>
                <RouterScrollRestoration />
                <HeaderContainer />
                <div className={classes.widthWrapper}>
                    <Switch>
                        <Route path={routes.home} exact render={ () => <MainPage/> } />
                        <Route path={routes.login} render={ () => <Login /> } />
                        <Route path={routes.register} render={ () => <Register /> } />
                        <Route path={routes.postDetail} render={ () => <PostDetail isLogin={isLogin}/> } />
                        <PrivateRoute path={routes.editPost} isLogin={isLogin}>
                            <PostEditor/>
                        </PrivateRoute>
                        <PrivateRoute path={routes.accountSetting} isLogin={isLogin}>
                            <AccountSettingContainer/>
                        </PrivateRoute>
                        {/*<Route path="/welcome" component={Welcome} />*/}

                        {/*fall back*/}
                        <Route path={routes.fallback} render={ () => <MainPage/>} />
                    </Switch>
                    <Footer />
                </div>
            </Router>

            {
                confetti &&
                <div className={classes.confetti}>
                    <ConfettiWrapper />
                </div>
            }
            <SnackbarContainer />
        </div>
    )
};

function mapStateToProps(state: State) {
    return {
        isLogin: state.loginStatus.isLogin,
        confetti: state.confetti
    }
}

const InnerAppContainer = connect(
    mapStateToProps,
)(InnerApp);

export default InnerAppContainer;
