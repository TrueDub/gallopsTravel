import {REFRESH} from '../actions/actions';

export default function trams(state = initialState, action) {
    switch (action.type) {
        case REFRESH:
            console.log(state);
            return Object.assign({}, state, {
                refreshed: true
            })
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
    glencairnData: emptyLuasStop,
    gallopsData: emptyLuasStop,
    leopardstownData: emptyLuasStop,
    ballyoganData: emptyLuasStop
}
