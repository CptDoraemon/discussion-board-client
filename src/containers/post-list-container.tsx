import {connect} from "react-redux";
import {State} from "../redux/state";
import PostList from "../components/post-list/post-list";

function mapStateToProps(state: State) {
    return {
        isLogin: state.loginStatus.isLogin
    }
}

// function mapDispatchToProps(dispatch: Dispatch) {
//     return {
//         closeSnackbar: () => dispatch(closeSnackbar())
//     }
// }

const PostListContainer = connect(
    mapStateToProps
)(PostList);

export default PostListContainer;
