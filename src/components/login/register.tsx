import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Grid, TextField, Typography} from "@material-ui/core";
import FormButton from "../commons/form-button";
import {Link} from "react-router-dom";
import LoginCommon from "./login-common";

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

    return (
        <LoginCommon imageUrl={'/images/register_bg.jpg'}>
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
                            label="Username"
                            value={''}
                            // onChange={handleChange}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <TextField
                            label="Email"
                            value={''}
                            // onChange={handleChange}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container justify={'center'}>
                        <TextField
                            label="Password"
                            value={''}
                            // onChange={handleChange}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container justify={'center'}>
                        <TextField
                            label="Confirm Password"
                            value={''}
                            // onChange={handleChange}
                            variant="outlined"
                            className={classes.textField}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify={'center'}>
                        <FormButton text={'I\'m in!'} onClick={() => false} disabled={false}/>
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
        </LoginCommon>
    )
};

export default Register