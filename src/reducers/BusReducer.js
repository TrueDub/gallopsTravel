import {REFRESH} from '../actions/actions';

export default function buses(state = initialState, action) {
    switch (action.type) {
        case REFRESH:
            return Object.assign({}, state, {
                refreshed: true
            })
        default:
            return state
    }
}

const emptyBus = {
    dueMins: null,
    destination: '',
    route: '',
    errorMessage: ''
}

const emptyBusStop = {
    stopNumber: null,
    stopName: '',
    buses: [emptyBus]
}

const initialState = {
    loading: true,
    data3470: emptyBusStop,
    data3471: emptyBusStop,
    data3487: emptyBusStop,
    data3488: emptyBusStop,
    data4313: emptyBusStop,
    data4393: emptyBusStop,
    data4395: emptyBusStop,
    data4396: emptyBusStop,
    data4773: emptyBusStop,
    data5106: emptyBusStop,
    data7415: emptyBusStop,
    data7416: emptyBusStop,
    data7417: emptyBusStop,
    data7418: emptyBusStop
}
