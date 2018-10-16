import Trams from "../components/Trams";
import {connect} from "react-redux";
import {fetchTramData} from "../actions/actions";

const mapStateToProps = state => {
    return {
        trainData: state.trainData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTramRefresh: id => {
            dispatch(fetchTramData())
        }
    }
};

const TramContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Trams)

export default TramContainer