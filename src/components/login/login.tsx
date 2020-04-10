import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import LoginCommon from "./commons/login-common";
import {Box, CircularProgress, Divider, Grid, TextField, Typography} from "@material-ui/core";
import FormButton from "../commons/form-button";
import {Link} from "react-router-dom";
import useInputField from "../../utils/use-input-field";
import {emailValidator, passwordValidator} from "../../utils/validators";
import useLogin from "../../requests/useLogin";
import ErrorMessage from "./commons/error-message";

const useStyles = makeStyles((theme) => ({
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

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
    const classes = useStyles();
    const [email, setEmail, emailError, emailErrorMessage, validateEmail] = useInputField('', emailValidator);
    const [password, setPassword, passwordError, passwordErrorMessage, validatePassword] = useInputField('', passwordValidator);

    const [loading, error, errorMessage, login] = useLogin();

    const submitHandler = () => {
        login(email, password, [validateEmail, validatePassword])
    };

    return (
        <LoginCommon imageUrl={'/images/login_bg.jpg'}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Typography variant={'h1'} component={'h1'} color={"textPrimary"}>
                        <Box textAlign={'center'}>
                            Log in
                        </Box>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <TextField
                            error={emailError}
                            label="Email"
                            name="email"
                            value={email}
                            onChange={setEmail}
                            variant="outlined"
                            helperText={emailError ? emailErrorMessage: ' '}
                            className={classes.textField}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <TextField
                            error={passwordError}
                            type="password"
                            label="Password"
                            value={password}
                            onChange={setPassword}
                            variant="outlined"
                            helperText={passwordError ? passwordErrorMessage : ' '}
                            className={classes.textField}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <FormButton text={'Log me in!'} onClick={submitHandler} disabled={loading}/>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <ErrorMessage loading={loading} error={error} errorMessage={errorMessage}/>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12} className={classes.link}>
                    <Grid container justify={'center'}>
                        <Link to={'/register'}>
                            Need an account?
                        </Link>
                    </Grid>
                </Grid>

            </Grid>
        </LoginCommon>
    )

};

export default Login