import React from "react";
import {FormControl} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: fade(theme.palette.primary.main, 0.8),
        color: theme.palette.primary.contrastText,
        borderRadius: 5,
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.8),
            color: theme.palette.primary.contrastText,
            borderRadius: 5,
        }
    },
    select: {
        backgroundColor: fade(theme.palette.primary.main, 0.8),
    },
    selectMenu: {
        backgroundColor: fade(theme.palette.primary.main, 0.8),
    }
}));

interface TagSelectorProps {
    tagList: string[][],
    tagValue: string,
    tagChangeHandler: (e: any) => void
}

const TagSelector: React.FC<TagSelectorProps> = ({tagList, tagValue, tagChangeHandler}) => {
    const classes = useStyles();

    return (

            <Select
                value={tagValue}
                onChange={tagChangeHandler}
                displayEmpty
                classes={{
                    // root: classes.root,
                    // select: classes.select,
                    // selectMenu: classes.selectMenu
                }}
            >
                {
                    tagList.map(arr => {
                        const tag = arr[0];
                        const humanReadable = arr[1];
                        return <MenuItem value={tag} key={tag}>{humanReadable}</MenuItem>
                    })
                }
            </Select>

    )
};

export default TagSelector