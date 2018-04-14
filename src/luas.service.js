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

export {getStationDetail, getNextTrainsAtStation};