import {connect} from "react-redux";
import {Dispatch} from "redux";
import Header from "../components/header/header";
import {State} from "../redux/state";
import {logout} from "../redux/actions/login-status";

function mapStateToProps(state: State) {
    return {
        isLogin: state.loginStatus.isLogin,
        username: state.loginStatus.username
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
