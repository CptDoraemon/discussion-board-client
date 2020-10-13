import React from "react";
import Chip from "@material-ui/core/Chip";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";

interface TagChipCommonProps {
  text: string,
  toTag: string,
  classes: {
    root: string,
    chipRoot: string,
    chipLabel: string
  }
}

const TagChipCommon: React.FC<TagChipCommonProps> = ({text, toTag, classes}) => {
  return (
    <Box className={classes.root}>
      <Chip
        label={text}
        component={Link}
        to={`/tag/${toTag}`}
        clickable
        classes={{
          clickable: classes.chipRoot,
          label: classes.chipLabel
        }}
      />
    </Box>
  )
};

export default TagChipCommon
