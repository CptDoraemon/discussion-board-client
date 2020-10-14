// import React from "react";
import {useLocation} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// interface QueryParamProps {
//   children: React.ReactElement
// }
//
// const MainPageQueryParamParser: React.FC<QueryParamProps> = ({children}) => {
//   const query = useQuery();
//
//   return (
//     <children.type {...children.props} tag={query.get('tag')} page={query.get('page') || 1}/>
//   )
//   const props = {
//     tag: query.get('tag'),
//     page: query.get('page')
//   };
//   return React.cloneElement(children as React.ReactElement<{tag: string, page: string}>, props)
// };


export default useQuery
// export {MainPageQueryParamParser}
