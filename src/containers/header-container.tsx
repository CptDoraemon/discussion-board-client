import {connect} from "react-redux";
import Header from "../components/header/header";
import {State} from "../redux/state";

function mapStateToProps(state: State) {
    return {
        isLogin: state.loginStatus.isLogin,
        username: state.loginStatus.username
    }
}

const HeaderContainer = connect(
    mapStateToProps
)(Header);

export default HeaderContainer;
