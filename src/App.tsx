import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import Header from "./components/header/header";
import PostList from "./components/post-list/post-list";
import Login from "./components/login/login";
import Register from "./components/login/register";

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
            width: '100%',
        }
    }
}));


const App: React.FC = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <Router basename={process.env.PUBLIC_URL}>
                <Header />
                    <div className={classes.widthWrapper}>
                        <Switch>
                            <Route path="/" exact render={ () => <PostList /> } />
                            <Route path="/login" render={ () => <Login /> } />
                            <Route path="/register" render={ () => <Register /> } />
                        </Switch>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    )
};



export default App;
