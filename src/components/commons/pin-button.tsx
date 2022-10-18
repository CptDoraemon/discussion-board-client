import IconButton from "@material-ui/core/IconButton";
import React, {useMemo} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import usePin from "../../requests/use-pin";
import {orange} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    color: orange[500],
    fontSize: '1.25rem',
    "&:hover": {
      color: orange[300]
    },
    "&:focus": {
      color: orange[300]
    }
  },
}));

interface PinButtonProps {
  id: number,
  isPinned: boolean
}

const PinButton: React.FC<PinButtonProps> = ({id, isPinned: inputIsPinned}) => {
  const classes = useStyles();
  const pinPost = usePin(`${id}`);

  const isPinned = useMemo(() => {
    if (pinPost.updatedData === null) {
      return inputIsPinned
    }
    return pinPost.updatedData.is_pinned
  }, [inputIsPinned, pinPost.updatedData]);

  return (
    <Tooltip title="Pin Post" aria-label="pin post">
      <Box>
        <IconButton
          aria-label={`pin post`}
          classes={{
            root: classes.button
          }}
          disabled={pinPost.loading}
          onClick={() => pinPost.pin(!isPinned)}
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