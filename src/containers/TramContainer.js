import Trams from "../components/Trams";
import {connect} from "react-redux";
import {executeRefresh} from "../actions/actions";

const mapStateToProps = state => {
    console.log("New state");
    console.log(state.trainData.isLoading);
    return {
        trainData: state.trainData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRefresh: id => {
            dispatch(executeRefresh())
        }
    }
};

const TramContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Trams)

export default TramContainer