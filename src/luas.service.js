import axios from 'axios';

const API_ROOT = 'http://luasforecasts.rpa.ie/xml/get.ashx';

async function getNextTrainsAtStation(stationId) {
    let apiString = API_ROOT + '?encrypt=false&action=forecast&stop=' + stationId;
    axios.get(apiString)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return null;
        });
}

export {getNextTrainsAtStation};