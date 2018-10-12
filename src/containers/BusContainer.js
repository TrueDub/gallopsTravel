import {connect} from "react-redux";
import {fetchBusData} from "../actions/actions";
import Buses from "../components/Buses";

const mapStateToProps = state => {
    return {
        busData: state.busData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onBusRefresh: id => {
            dispatch(fetchBusData())
        }
    }
};

const BusContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Buses)

export default BusContainer