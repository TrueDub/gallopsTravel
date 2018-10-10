import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Buses from '../components/Buses.jsx'

function mapStateToProps(state) {
    return {
        contacts: state.contacts
    };
};
​
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectContact: selectContact}, dispatch);
}

const BusContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Buses)
​
export default BusContainer