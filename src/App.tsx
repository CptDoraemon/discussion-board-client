import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from "./redux/configure-store";
import { CssBaseline } from "@material-ui/core";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import Header from "./components/header/header";
import PostList from "./components/post-list/post-list";
import Login from "./components/login/login";
import Register from "./components/login/register";
import HeaderContainer from "./containers/header-container";
import Welcome from "./components/login/welcome";
import MainPage from "./components/main-page/main-page";
import SnackbarContainer from "./containers/snackbar-container";
import Footer from "./components/footer/footer";

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
        width: '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 16px)',
            margin: '0 8px'
        }
    }
}));

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <Provider store={store}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <div className={classes.root}>
                <Router basename={process.env.PUBLIC_URL}>
                <HeaderContainer />
                    <div className={classes.widthWrapper}>
                        <Switch>
                            <Route path="/" exact render={ () => <MainPage /> } />
                            <Route path="/login" render={ () => <Login /> } />
                            <Route path="/register" render={ () => <Register /> } />
                            {/*<Route path="/welcome" component={Welcome} />*/}
                        </Switch>
                        <Footer />
                    </div>
                </Router>

                <SnackbarContainer />
            </div>
        </ThemeProvider>
        </Provider>
    )
};



export default App;
