import {connect} from 'react-redux'
import Buses from '../components/Buses.jsx'

const mapStateToProps = state => {
    return {
        buses: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}
​
const mapDispatchToProps = dispatch => {
    return {}
}

const BusContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Buses)
​
export default BusContainer