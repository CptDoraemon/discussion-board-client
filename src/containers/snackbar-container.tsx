import {connect} from "react-redux";
import Snackbar from "../components/snackbar/snackbar";
import {State} from "../redux/state";
import {Dispatch} from "redux";
import {closeSnackbar} from "../redux/actions/snackbar";

function mapStateToProps(state: State) {
    return {
        open: state.snackbar.open,
        message: state.snackbar.message
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        closeSnackbar: () => dispatch(closeSnackbar())
    }
}

const SnackbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Snackbar);

export default SnackbarContainer;
