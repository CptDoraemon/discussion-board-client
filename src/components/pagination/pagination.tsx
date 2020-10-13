import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MuiPagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .Mui-selected': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
      '& .MuiPaginationItem-rounded:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
      }
    }
}));

interface PaginationProps {
  count: number,
  page: number,
  onChange: () => void
}

const Pagination: React.FC<PaginationProps> = ({count, page, onChange}) => {
  const classes = useStyles();

  return (
    <MuiPagination count={count} page={page} onChange={onChange} shape={'rounded'} className={classes.root}/>
  )
};

export default Pagination
