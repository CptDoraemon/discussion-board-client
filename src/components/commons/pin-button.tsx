import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: theme.palette.success.light,
  },
  button: {
    fontSize: '1.25rem',
    "&:hover": {
      color: theme.palette.success.main
    },
    "&:focus": {
      color: theme.palette.success.main
    }
  },
}));

interface PinButtonProps {
  id: number,
  isPinned: boolean
}

const PinButton: React.FC<PinButtonProps> = ({id, isPinned: inputIsPinned}) => {
  const classes = useStyles();
  const isPinned = useState(inputIsPinned);

  return (
    <Tooltip title="Edit" aria-label="edit">
      <Box className={classes.textColor}>
        <IconButton
          aria-label={`edit`}
          classes={{
            root: classes.button
          }}
        >
          {
            isPinned ?
              <StarIcon/> :
              <StarBorderIcon/>
          }
        </IconButton>
      </Box>
    </Tooltip>
  )
};

export default PinButton