import {RECEIVE_BUS_DATA, REQUEST_BUS_DATA, REQUEST_BUS_REFRESH} from '../actions/actions';

export default function buses(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BUS_REFRESH:
            return Object.assign({}, state, {
                refreshed: true
            });
        case REQUEST_BUS_DATA:
            return Object.assign({}, state, {
                refreshed: false,
                isLoading: true
            });
        case RECEIVE_BUS_DATA:
            console.log("fred")
            return Object.assign({}, state, {
                refreshed: true,
                isLoading: false,
                lastUpdated: action.receivedAt,
                data3470: processBusData(action.busData.response3470.data),
                data3471: processBusData(action.busData.response3471.data),
                data3487: processBusData(action.busData.response3487.data),
                data3488: processBusData(action.busData.response3488.data),
                data4313: processBusData(action.busData.response4313.data),
                data4393: processBusData(action.busData.response4393.data),
                data4395: processBusData(action.busData.response4395.data),
                data4396: processBusData(action.busData.response4396.data),
                data4773: processBusData(action.busData.response4773.data),
                data5106: processBusData(action.busData.response5106.data),
                data7415: processBusData(action.busData.response7415.data),
                data7416: processBusData(action.busData.response7416.data),
                data7417: processBusData(action.busData.response7417.data),
                data7418: processBusData(action.busData.response7418.data)
            });
        default:
            return state
    }
}

function processBusData(response) {
    let buses = [];
    response.results.forEach(entry => {
        buses.push({
                dueMins: entry.duetime,
                destination: entry.destination,
                route: entry.route,
                errorMessage: entry.errorMessage
            }
        );
    });
    return {buses: buses};
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
    refreshed: false,
    isLoading: true,
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
