import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Typography} from "@material-ui/core";
import SectionWrapper from "./section-wrapper";
import UpdateAvatar from "./update-avatar/update-avatar";

interface AccountSettingProps {
    username: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1, 0),
        width: '100%'
    },
    paper: {
        width: '100%',
        minHeight: '100px',
        overflow: 'hidden'
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'flex-start'
    }
}));

const AccountSetting: React.FC<AccountSettingProps> = ({username}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={'body1'} component={'h2'}>
                <Box my={2} fontWeight={700}>
                    { username }
                </Box>
            </Typography>
            <Paper className={classes.paper} elevation={0}>
                <SectionWrapper sectionTitle={'Avatar'}>
                    <UpdateAvatar />
                </SectionWrapper>
            </Paper>
        </div>
    )
};

export default AccountSetting