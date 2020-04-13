import React, {FormEvent} from "react";
import {makeStyles} from "@material-ui/core/styles";
import LoginCommon from "./commons/login-common";
import {Box, CircularProgress, Divider, Grid, TextField, Typography} from "@material-ui/core";
import FormButton from "../commons/form-button";
import {Link} from "react-router-dom";
import useInputField from "../../utils/use-input-field";
import {emailValidator, execValidators, passwordValidator} from "../../utils/validators";
import useLogin from "../../requests/useLogin";
import ErrorMessage from "../commons/error-message";

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

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        if (execValidators([validateEmail, validatePassword])) {
            login(email, password)
        }
    };

    return (
        <LoginCommon imageUrl={'/images/login_bg.jpg'}>
            <form onSubmit={submitHandler} id={'login-form'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} component={'h1'} color={"textPrimary"}>
                            <Box textAlign={'center'}>
                                Log In
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
                                name="password"
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
                            <FormButton text={'Log me in!'} form={'login-form'} disabled={loading}/>
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
            </form>
        </LoginCommon>
    )

};

export default Login