import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MuiPagination from '@material-ui/lab/Pagination';
import {PaginationItem} from "@material-ui/lab";
import {Link} from "react-router-dom";
import useQuery from "../../utils/use-query";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(2, 0)
  },
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

  if (count > 1) {
    return (
      <Paper className={classes.paper} elevation={0}>
        <MuiPagination
          count={count} page={page} shape={'rounded'} className={classes.root}
          renderItem={(item) => {
            query.set('page', item.page.toString());
            return <PaginationItem
             component={Link}
             to={'/?' + query.toString()}
             {...item}
            />
          }}
        />
      </Paper>
    )
  } else {
    return <></>
  }
};

export default Pagination
