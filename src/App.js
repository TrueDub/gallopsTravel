import React, {Component} from 'react';
import * as moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Trams from './components/Trams.jsx';
import Buses from './components/Buses.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import axios from "axios";
import {parse} from "pixl-xml";

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

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            trainData: {
                glencairnData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}},
                gallopsData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}},
                leopardstownData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}},
                ballyoganData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}}
            },
            busData: {
                data3470: {buses: [{dueMins: '', destination: '', route: ''}]},
                data3471: {buses: [{dueMins: '', destination: '', route: ''}]},
                data3487: {buses: [{dueMins: '', destination: '', route: ''}]},
                data3488: {buses: [{dueMins: '', destination: '', route: ''}]},
                data4313: {buses: [{dueMins: '', destination: '', route: ''}]},
                data4393: {buses: [{dueMins: '', destination: '', route: ''}]},
                data4395: {buses: [{dueMins: '', destination: '', route: ''}]},
                data4396: {buses: [{dueMins: '', destination: '', route: ''}]},
                data4773: {buses: [{dueMins: '', destination: '', route: ''}]},
                data5106: {buses: [{dueMins: '', destination: '', route: ''}]},
                data7415: {buses: [{dueMins: '', destination: '', route: ''}]},
                data7416: {buses: [{dueMins: '', destination: '', route: ''}]},
                data7417: {buses: [{dueMins: '', destination: '', route: ''}]},
                data7418: {buses: [{dueMins: '', destination: '', route: ''}]}
            }
        }
        this.gatherTrainData();
        this.gatherBusData();
        console.log("trainData");
        console.log(this.state.trainData);
        console.log("busData");
        console.log(this.state.busData);
    }

    gatherTrainData() {
        axios.all([
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=GLE'),
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=GAL'),
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=LEO'),
            axios.get(API_ROOT + '?encrypt=false&action=forecast&stop=BAW')
        ]).then(
            axios.spread((gleData, galData, leoData, bawData) => {
                let glencairnData = this.processTrainData(gleData);
                let gallopsData = this.processTrainData(galData);
                let leopardstownData = this.processTrainData(leoData);
                let ballyoganData = this.processTrainData(bawData);
                this.setState({
                    glencairnData: glencairnData,
                    gallopsData: gallopsData,
                    leopardstownData: leopardstownData,
                    ballyoganData: ballyoganData,
                    loading: false
                });
            }));
    }

    processTrainData(response) {
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

    gatherBusData() {
        axios.all([
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
                let data3470 = this.processBusData(response3470.data);
                let data3471 = this.processBusData(response3471.data);
                let data3487 = this.processBusData(response3487.data);
                let data3488 = this.processBusData(response3488.data);
                let data4313 = this.processBusData(response4313.data);
                let data4393 = this.processBusData(response4393.data);
                let data4395 = this.processBusData(response4395.data);
                let data4396 = this.processBusData(response4396.data);
                let data4773 = this.processBusData(response4773.data);
                let data5106 = this.processBusData(response5106.data);
                let data7415 = this.processBusData(response7415.data);
                let data7416 = this.processBusData(response7416.data);
                let data7417 = this.processBusData(response7417.data);
                let data7418 = this.processBusData(response7418.data);
                this.setState({
                    data3470: data3470,
                    data3471: data3471,
                    data3487: data3487,
                    data3488: data3488,
                    data4313: data4313,
                    data4393: data4393,
                    data4395: data4395,
                    data4396: data4396,
                    data4773: data4773,
                    data5106: data5106,
                    data7415: data7415,
                    data7416: data7416,
                    data7417: data7417,
                    data7418: data7418,
                    loading: false
                });
            }));
    }

    processBusData(response) {
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

    render() {
        return (
            <div className="container">
                <h5 className="text-center">Information requested at {moment().format('HH:mm:SS DD/MM/YYYY')}</h5>
                <ErrorBoundary message='There was an error retrieving Luas information'>
                    <Trams trainData={this.state.trainData}/>
                </ErrorBoundary>
                <ErrorBoundary message='There was an error retrieving Dublin Bus information'>
                    <Buses busData={this.state.busData}/>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
