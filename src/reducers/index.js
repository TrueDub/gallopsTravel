import {combineReducers} from 'redux';
import BusReducer from './BusReducer'

const rootReducer = combineReducers({
    buses: BusReducer
});
export default rootReducer;