import {REFRESH} from '../actions/actions';

export default function trams(state = initialState, action) {
    switch (action.type) {
        case REFRESH:
            console.log('fred');
            console.log(state);
            let result = Object.assign({}, state, {
                refreshed: true,
                isLoading: false
            });
            console.log('bill');
            console.log(result);
            return result;
        default:
            return state
    }
}

const emptyTrain = {
    dueMins: null,
    destination: ''
}

const emptyLuasStop = {
    stopName: '',
    message: '',
    trainData: {
        inboundTrains: [emptyTrain],
        outboundTrains: [emptyTrain]
    }
}

const initialState = {
    refreshed: false,
    isLoading: true,
    glencairnData: emptyLuasStop,
    gallopsData: emptyLuasStop,
    leopardstownData: emptyLuasStop,
    ballyoganData: emptyLuasStop
}
