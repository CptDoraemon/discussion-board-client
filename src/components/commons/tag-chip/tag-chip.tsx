import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import TagChipCommon from "./tag-chip-common";

interface TagChipProps {
    text: string
    size: 'small' | 'normal',
}

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.primary.contrastText,
    },
    chipRoot: {
        borderRadius: 2,
        height: 'auto',
        backgroundColor: fade(theme.palette.primary.light, 0.8),
        transitions: theme.transitions.create('background-color'),
        '&:hover, &:focus, &:active': {
            backgroundColor: theme.palette.primary.main,
        },
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
    const _classes = useStyles();
    const classes = {
        root: _classes.root,
        chipRoot: _classes.chipRoot,
        chipLabel: size === 'small' ? _classes.chipLabelSmall : _classes.chipLabelNormal
    };

    return (
        <TagChipCommon text={text.toUpperCase()} classes={classes} to={`/?tag=${text.toUpperCase()}`} />
    )
};

export default TagChip
