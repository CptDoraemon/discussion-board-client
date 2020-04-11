import React, {FormEvent} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Grid, TextField, Typography} from "@material-ui/core";
import FormButton from "../commons/form-button";
import {Link} from "react-router-dom";
import LoginCommon from "./commons/login-common";
import useInputField from "../../utils/use-input-field";
import {
    confirmPasswordValidator,
    emailValidator,
    execValidators,
    passwordValidator,
    usernameValidator
} from "../../utils/validators";
import ErrorMessage from "./commons/error-message";
import useRegister from "../../requests/useRegister";

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

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = () => {
    const classes = useStyles();

    const [username, setUsername, usernameError, usernameErrorMessage, validateUsername] = useInputField('', usernameValidator);
    const [email, setEmail, emailError, emailErrorMessage, validateEmail] = useInputField('', emailValidator);
    const [password, setPassword, passwordError, passwordErrorMessage, validatePassword] = useInputField('', passwordValidator);
    const [confirmPassword, setConfirmPassword, confirmPasswordError, confirmPasswordErrorMessage, validateConfirmPassword] = useInputField('', confirmPasswordValidator);

    const [loading, error, errorMessage, register] = useRegister();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (
            execValidators([validateUsername, validateEmail, validatePassword]) &&
            validateConfirmPassword(password)
        ) {
            register(username, email, password, confirmPassword)
        }
    };

    const formID = 'register-form';

    return (
        <LoginCommon imageUrl={'/images/register_bg.jpg'}>
            <form onSubmit={submitHandler} id={formID}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant={'h1'} component={'h1'} color={"textPrimary"}>
                            <Box textAlign={'center'}>
                                Join Us
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify={'center'}>
                            <TextField
                                error={usernameError}
                                label="Username"
                                name="username"
                                value={username}
                                onChange={setUsername}
                                helperText={usernameError ? usernameErrorMessage: ' '}
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify={'center'}>
                            <TextField
                                error={emailError}
                                label="Email"
                                name="email"
                                value={email}
                                onChange={setEmail}
                                helperText={emailError ? emailErrorMessage: ' '}
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container justify={'center'}>
                            <TextField
                                error={passwordError}
                                label="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                                helperText={passwordError ? passwordErrorMessage: ' '}
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container justify={'center'}>
                            <TextField
                                error={confirmPasswordError}
                                label="Confirm Password"
                                name="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                helperText={confirmPasswordError ? confirmPasswordErrorMessage: ' '}
                                variant="outlined"
                                className={classes.textField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify={'center'}>
                            <FormButton text={'I\'m in!'} form={formID} disabled={false}/>
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
                            <Link to={'/login'}>
                                Already have an account?
                            </Link>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </LoginCommon>
    )
};

export default Register