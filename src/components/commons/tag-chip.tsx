import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Box} from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Link} from "react-router-dom";

interface TagChipProps {
    text: string
    size: 'small' | 'normal'
}

const useStyles = makeStyles((theme) => ({
    inheritColor: {
        color: theme.palette.primary.contrastText,
    },
    chipRoot: {
        borderRadius: 2,
        height: 'auto',
        backgroundColor: fade(theme.palette.primary.main, 0.5),
        transitions: theme.transitions.create('background-color'),
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
        }
    },
    chipLabelSmall: {
        padding: '0 5px',
        fontSize: theme.typography.caption.fontSize
    },
    chipLabelNormal: {
        padding: '2px 15px',
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 700
    },
}));

const TagChip: React.FC<TagChipProps> = ({text, size}) => {
    const classes = useStyles();

    return (
        <Box className={classes.inheritColor}>
            <Chip
                label={text.toUpperCase()}
                component={Link}
                to={'/'}
                clickable
                classes={{
                    clickable: classes.chipRoot,
                    label: size === 'small' ? classes.chipLabelSmall : classes.chipLabelNormal
                }}
            />
        </Box>
    )
};

export default TagChip