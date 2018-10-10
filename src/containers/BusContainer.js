import {connect} from "react-redux";
import {executeRefresh} from "../actions/actions";
import Buses from "../components/Buses";

const mapStateToProps = state => {
    return {
        busData: state.busData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRefresh: id => {
            dispatch(executeRefresh())
        }
    }
};

const BusContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Buses)

export default BusContainer