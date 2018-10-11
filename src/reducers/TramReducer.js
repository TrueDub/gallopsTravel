import {REFRESH} from '../actions/actions';

export default function trams(state = initialState, action) {
    switch (action.type) {
        case REFRESH:
            let test1 = {
                stopName: 'fred',
                message: 'hi hi hi',
                trainData: {
                    inboundTrains: [{
                        dueMins: 5,
                        destination: 'Hell'
                    }],
                    outboundTrains: [emptyTrain]
                },

            };
            let result = Object.assign({}, state, {
                refreshed: true,
                isLoading: false,
                glencairnData: test1
            });
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
