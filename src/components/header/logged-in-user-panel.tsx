import ThemeButton from "../commons/theme-button";
import React from "react";
import {Box, CircularProgress, Grid, Typography} from "@material-ui/core";
import useLogout from "../../requests/use-logout";

interface LoggedInUserPanelProps {
    username: string
}

const LoggedInUserPanel: React.FC<LoggedInUserPanelProps> = ({username}) => {
    const [loading, logout] = useLogout();

    return (
        <Grid container alignItems={"center"} justify={"center"} spacing={1}>
            <Grid item>
                <Typography component={'div'}>
                    <Box>
                        { username }
                    </Box>
                </Typography>
            </Grid>
            <Grid item>
                {
                    loading ?
                        <CircularProgress color="secondary" size={'1rem'}/> :
                        <ThemeButton text={'Logout'} onClick={logout}/>
                }
            </Grid>
        </Grid>
    )
};

export default LoggedInUserPanel