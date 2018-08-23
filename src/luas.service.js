import axios from 'axios';
import {stationDetail} from './stationDetail.js';
import {parseString} from "xml2js";

const API_ROOT = 'https://luasforecasts.rpa.ie/xml/get.ashx';


function getStationDetail() {
    return stationDetail;
}

function getAllTransportData() {
    return axios.all([
        axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=GLE'),
        axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=GAL'),
        axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=LEO'),
        axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=BAW')
    ]);
}

function processTrainData(response) {
    parseString(response.data, function (err, result) {
        let data = gatherResponseData(result);
        return {
            message: data.message,
            trainData: {
                inboundTrains: data.inboundTrains,
                outboundTrains: data.outboundTrains
            }
        }
    });
}

function getNextTrainsAtStation(stationId) {
    let apiString = API_ROOT + '?encrypt=false&action=forecast&stop=' + stationId;
    return axios.get(apiString);
}

function gatherResponseData(result) {
    let inboundTrains = [];
    let outboundTrains = [];
    result.stopInfo.direction.forEach(entry => {
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

export {getStationDetail, getNextTrainsAtStation, gatherResponseData, getAllTransportData, processTrainData};