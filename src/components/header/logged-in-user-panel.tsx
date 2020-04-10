import ThemeButton from "../commons/theme-button";
import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";

interface LoggedInUserPanelProps {
    logout: () => void,
    username: string
}

const LoggedInUserPanel: React.FC<LoggedInUserPanelProps> = ({logout, username}) => {
    return (
        <Grid container alignItems={"center"} justify={"center"} spacing={1}>
            <Grid item>
                <Typography>
                    <Box>
                        { username }
                    </Box>
                </Typography>
            </Grid>
            <Grid item>
                <ThemeButton text={'Logout'} onClick={logout}/>
            </Grid>
        </Grid>
    )
};

export default LoggedInUserPanel