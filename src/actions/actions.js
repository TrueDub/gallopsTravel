import axios from "axios";

// action types

export const REQUEST_BUS_REFRESH = 'REQUEST_BUS_REFRESH';
export const REQUEST_TRAM_REFRESH = 'REQUEST_TRAM_REFRESH';
export const REQUEST_BUS_DATA = 'REQUEST_BUS_DATA';
export const REQUEST_TRAM_DATA = 'REQUEST_TRAM_DATA';
export const RECEIVE_BUS_DATA = 'RECEIVE_BUS_DATA';
export const RECEIVE_TRAM_DATA = 'RECEIVE_TRAM_DATA';

const API_ROOT = 'https://luasforecasts.rpa.ie/xml/get.ashx';
const API_ROOT_3470 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3470&format=json';
const API_ROOT_3471 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3471&format=json';
const API_ROOT_3487 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3487&format=json';
const API_ROOT_3488 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3488&format=json';
const API_ROOT_4313 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4313&format=json';
const API_ROOT_4393 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4393&format=json';
const API_ROOT_4395 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4395&format=json';
const API_ROOT_4396 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4396&format=json';
const API_ROOT_4773 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4773&format=json';
const API_ROOT_5106 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=5106&format=json';
const API_ROOT_7415 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7415&format=json';
const API_ROOT_7416 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7416&format=json';
const API_ROOT_7417 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7417&format=json';
const API_ROOT_7418 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7418&format=json';

// action creators

export function executeBusRefresh() {
    return {type: REQUEST_BUS_REFRESH}
}

export function executeTramRefresh() {
    return {type: REQUEST_TRAM_REFRESH}
}

export function requestTramData() {
    return {type: REQUEST_TRAM_DATA}
}

export function requestBusData() {
    return {type: REQUEST_BUS_DATA}
}

export function receiveBusData(json) {
    return {
        type: RECEIVE_BUS_DATA,
        busData: json
    }
}

export function receiveTramData(json) {
    return {
        type: RECEIVE_TRAM_DATA,
        tramData: json
    }
}

export function fetchTramData() {
    return function (dispatch) {
        dispatch(requestTramData());
        return axios.all([
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=GLE'),
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=GAL'),
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=LEO'),
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=BAW')
        ]).then(
            axios.spread((gleData, galData, leoData, bawData) => {
                let result = {
                    gleData: gleData,
                    galData: galData,
                    leoData: leoData,
                    bawData: bawData,
                    receivedAt: Date.now()
                };
                dispatch(receiveTramData(result));
            }));
    }
}

export function fetchBusData() {
    return function (dispatch) {
        dispatch(requestBusData());
        return axios.all([
            axios.get(API_ROOT_3470),
            axios.get(API_ROOT_3471),
            axios.get(API_ROOT_3487),
            axios.get(API_ROOT_3488),
            axios.get(API_ROOT_4313),
            axios.get(API_ROOT_4393),
            axios.get(API_ROOT_4395),
            axios.get(API_ROOT_4396),
            axios.get(API_ROOT_4773),
            axios.get(API_ROOT_5106),
            axios.get(API_ROOT_7415),
            axios.get(API_ROOT_7416),
            axios.get(API_ROOT_7417),
            axios.get(API_ROOT_7418)

        ]).then(
            axios.spread((response3470, response3471, response3487, response3488, response4313, response4393,
                          response4395, response4396, response4773, response5106, response7415, response7416,
                          response7417, response7418) => {
                let result = {
                    response3470: response3470,
                    response3471: response3471,
                    response3487: response3487,
                    response3488: response3488,
                    response4313: response4313,
                    response4393: response4393,
                    response4395: response4395,
                    response4396: response4396,
                    response4773: response4773,
                    response5106: response5106,
                    response7415: response7415,
                    response7416: response7416,
                    response7417: response7417,
                    response7418: response7418
                };
                dispatch(receiveBusData(result));
            }));
    }
}
