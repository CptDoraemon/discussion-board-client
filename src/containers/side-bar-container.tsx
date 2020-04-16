import {connect} from "react-redux";
import {State} from "../redux/state";
import SideBar from "../components/side-bar/side-bar";

function mapStateToProps(state: State) {
    return {
        isLogin: state.loginStatus.isLogin
    }
}

const SideBarContainer = connect(
    mapStateToProps
)(SideBar);

export default SideBarContainer;
