import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Typography} from "@material-ui/core";

interface SectionTitleProps {
    sectionTitle: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100px',
    },
    sectionTitle: {
        width: '100%',
        padding: theme.spacing(1, 2),
        backgroundColor: theme.palette.primary.light,
        fontWeight: 700,
        color: '#fff'
    },
    content: {
        width: '100%',
        padding: theme.spacing(2),
    }
}));

const SectionWrapper: React.FC<SectionTitleProps> = ({children, sectionTitle}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={'body1'} component={'h3'}>
                <Box className={classes.sectionTitle}>
                    { sectionTitle }
                </Box>
            </Typography>
            <div className={classes.content}>
                { children }
            </div>
        </div>
    )
};

export default SectionWrapper