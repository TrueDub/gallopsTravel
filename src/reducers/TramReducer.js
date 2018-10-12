import {RECEIVE_TRAM_DATA, REQUEST_TRAM_DATA, REQUEST_TRAM_REFRESH} from '../actions/actions';
import {parse} from "pixl-xml";

export default function trams(state = initialState, action) {
    switch (action.type) {
        case REQUEST_TRAM_REFRESH:
            return state;
        case REQUEST_TRAM_DATA:
            return Object.assign({}, state, {
                refreshed: false,
                isLoading: true
            });
        case RECEIVE_TRAM_DATA:
            return Object.assign({}, state, {
                refreshed: true,
                isLoading: false,
                lastUpdated: action.receivedAt,
                glencairnData: processTrainData(action.tramData.gleData),
                gallopsData: processTrainData(action.tramData.galData),
                leopardstownData: processTrainData(action.tramData.leoData),
                ballyoganData: processTrainData(action.tramData.bawData)
            });
        default:
            return state
    }
}

function processTrainData(response) {
    let result = parse(response.data);
    let inboundTrains = [];
    let outboundTrains = [];
    result.direction.forEach(entry => {
        let target = [];
        if (Array.isArray(entry.tram)) {
            entry.tram.forEach(tram => {
                let tramEntry = {
                    dueMins: tram.dueMins,
                    destination: tram.destination
                };
                target.push(tramEntry);
            })
        } else {
            let tramEntry = {
                dueMins: entry.tram.dueMins,
                destination: entry.tram.destination
            };
            target.push(tramEntry);
        }
        if (entry.name === 'Inbound') {
            inboundTrains = target;
        } else {
            outboundTrains = target;
        }
    });
    return {
        message: result.message,
        trainData: {
            inboundTrains: inboundTrains,
            outboundTrains: outboundTrains
        }
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
    lastUpdated: Date.now(),
    glencairnData: emptyLuasStop,
    gallopsData: emptyLuasStop,
    leopardstownData: emptyLuasStop,
    ballyoganData: emptyLuasStop
}
