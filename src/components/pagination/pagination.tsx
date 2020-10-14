import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MuiPagination from '@material-ui/lab/Pagination';
import {PaginationItem} from "@material-ui/lab";
import {Link} from "react-router-dom";
import useQuery from "../../utils/use-query";

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
}

const Pagination: React.FC<PaginationProps> = ({count, page}) => {
  const classes = useStyles();
  const query = useQuery();

  return (
    <MuiPagination count={count} page={page} shape={'rounded'} className={classes.root}
       renderItem={(item) => {
         query.set('page', item.page.toString());
         console.log(query.toString());
         return <PaginationItem
           component={Link}
           to={'/?' + query.toString()}
           {...item}
         />
       }}
    />
  )
};

export default Pagination
