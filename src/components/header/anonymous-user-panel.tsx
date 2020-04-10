import ThemeButton from "../commons/theme-button";
import React from "react";
import {Grid} from "@material-ui/core";

const AnonymousUserPanel: React.FC = () => {
    return (
        <Grid container alignItems={"center"} justify={"center"} spacing={1}>
            <Grid item>
                <ThemeButton text={'Join'} url={'/register'}/>
            </Grid>
            <Grid item>
                <ThemeButton text={'Login'} url={'/login'}/>
            </Grid>
        </Grid>
    )
};

export default AnonymousUserPanel