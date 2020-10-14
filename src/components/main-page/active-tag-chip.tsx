import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Box} from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {useHistory} from 'react-router-dom'

interface ActiveTagChipProps {
    text: string
}

const useStyles = makeStyles((theme) => ({
    inheritColor: {
        color: theme.palette.primary.contrastText,
    },
    chipRoot: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary.light,
        transitions: theme.transitions.create('background-color'),
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
        }
    },
    chipLabel: {
        padding: '2px 20px',
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 700
    },
}));

const ActiveTagChip: React.FC<ActiveTagChipProps> = ({text}) => {
    const classes = useStyles();
    let history = useHistory();

    const handleDelete = () => {
        history.push('/')
    };

    return (
        <Box className={classes.inheritColor}>
            <Chip
                label={text.toUpperCase()}
                onDelete={handleDelete}
                color={'primary'}
                classes={{
                    deletable: classes.chipRoot,
                    label: classes.chipLabel
                }}
            />
        </Box>
    )
};

export default ActiveTagChip
