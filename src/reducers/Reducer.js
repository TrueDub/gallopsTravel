import initialState from '../state/initialState';
import {REFRESH} from '../actions/actions';

export default function gallopsApp(state = initialState, action) {
    switch (action.type) {
        case REFRESH:
            return Object.assign({}, state, {
                refreshed: true
            })
        default:
            return state
    }
}