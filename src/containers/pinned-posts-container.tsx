import {connect} from "react-redux";
import {State} from "../redux/state";
import PinnedPosts from "../components/post-list/pinned-posts";

function mapStateToProps(state: State) {
  return {
    isLogin: state.loginStatus.isLogin
  }
}

const PostPostsContainer = connect(
  mapStateToProps
)(PinnedPosts);

export default PostPostsContainer;
