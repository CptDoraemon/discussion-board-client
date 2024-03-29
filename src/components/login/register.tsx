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
import ErrorMessage from "../commons/error-message";
import useRegister from "../../requests/use-register";
import {Alert} from "@material-ui/lab";

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
        const validationCheck1 = execValidators([validateUsername, validateEmail, validatePassword]);
        const validationCheck2 =  validateConfirmPassword(password);
        if (validationCheck1 && validationCheck2) {
            register(username, email, password, confirmPassword)
        }
    };

    const formID = 'register-form';

    return (
        <LoginCommon imageUrl={'/images/register_bg.jpg'}>
            <form onSubmit={() => false} id={formID}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'h5'} component={'h1'} color={"textPrimary"}>
                            <Box textAlign={'center'} fontWeight={700}>
                                Join Us
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify={'center'}>
                            <TextField
                                error={usernameError}
                                label="Username"
                                id="register-username"
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
                                id="register-email"
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
                                id="register-password"
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
                                id="register-confirm-password"
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
                        <Box mb={2}>
                            <Alert severity={'info'}>
                                Signing up is disabled at the moment
                            </Alert>
                        </Box>
                        <Grid container justify={'center'}>
                            <FormButton text={'I\'m in!'} form={formID} disabled={true}/>
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
