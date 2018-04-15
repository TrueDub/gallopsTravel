import axios from 'axios';
import {stationDetail} from './stationDetail.js';

const API_ROOT = 'http://luasforecasts.rpa.ie/xml/get.ashx';


function getStationDetail() {
    return stationDetail;
}

function getNextTrainsAtStation(stationId) {
    let apiString = API_ROOT + '?encrypt=false&action=forecast&stop=' + stationId;
    return axios.get(apiString);
}

function gatherResponseData(result) {
    let inboundTrains = [];
    let outboundTrains = [];
    result['stopInfo']['direction'].forEach(entry => {
        let target = [];
        entry['tram'].forEach(tram => {
            let tramEntry = {
                dueMins: tram['$']['dueMins'],
                destination: tram['$']['destination']
            }
            target.push(tramEntry);
        });
        if (entry['$']['name'] === 'Inbound') {
            inboundTrains = target;
        } else {
            outboundTrains = target;
        }
    })
    return {
        selectedStation: result['stopInfo']['$']['stop'],
        message: result['stopInfo']['message'],
        inboundTrains: inboundTrains,
        outboundTrains: outboundTrains,
    };
}

export {getStationDetail, getNextTrainsAtStation, gatherResponseData};