import {connect} from "react-redux";
import AccountSetting from "../components/account-setting/account-setting";
import {State} from "../redux/state";

function mapStateToProps(state: State) {
    return {
        username: state.loginStatus.username
    }
}

const AccountSettingContainer = connect(
    mapStateToProps
)(AccountSetting);

export default AccountSettingContainer;
