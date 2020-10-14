import React from "react";
import {FormControl} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {TagList} from "../../requests/use-get-tag-list";

const useStyles = makeStyles(theme => ({
    root: {
        textTransform: 'capitalize',
        backgroundColor: fade(theme.palette.primary.main, 0.8),
        color: theme.palette.primary.contrastText,
        borderRadius: 5,
        padding: '5px 15px',
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.8),
            color: theme.palette.primary.contrastText,
            borderRadius: 5,
        },
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
    menuItemRoot: {
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
        }
    },
    menuRoot: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        borderRadius: 5,
    }
}));

interface TagSelectorProps {
    tagList: TagList,
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
            disableUnderline
            classes={{
                root: classes.root,
                icon: classes.icon
            }}
            MenuProps={{
                classes: {
                    paper: classes.menuRoot,
                }
            }}
        >
            {
                tagList.map(obj => {
                    const tag = obj.tag;
                    return (
                        <MenuItem
                            value={tag}
                            key={tag}
                            classes={{
                                root: classes.menuItemRoot
                            }}
                        >{tag.toLowerCase()}</MenuItem>
                        )
                })
            }
        </Select>
    )
};

export default TagSelector
