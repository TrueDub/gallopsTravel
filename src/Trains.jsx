import React from 'react';

import {parse} from 'fast-xml-parser';

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const API_ROOT = 'https://luasforecasts.rpa.ie/xml/get.ashx';

export default class Trains extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            glencairnData: {message: '', inboundTrains: [], outboundTrains: []},
            gallopsData: {message: '', inboundTrains: [], outboundTrains: []},
            leopardstownData: {message: '', inboundTrains: [], outboundTrains: []},
            ballyoganData: {message: '', inboundTrains: [], outboundTrains: []}
        }
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
                    ballyoganData: ballyoganData
                });
                console.log(this.state.gallopsData);
            }));
    }

    processTrainData(response) {
        // result = parse(response.data);
        parseString(response.data, function (err, result) {
            console.log(result.stopInfo.direction);
            let data = this.gatherResponseData(result);
            return {
                message: data.message,
                trainData: {
                    inboundTrains: data.inboundTrains,
                    outboundTrains: data.outboundTrains
                }
            }
        });
    }

    gatherResponseData(result) {
        let inboundTrains = [];
        let outboundTrains = [];
        result.stopInfo.direction.forEach(entry => {
            let target = [];
            entry.tram.forEach(tram => {
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

    generateTrainRows(trainData) {
        let rows = [];
        let trainCount = 0;
        trainData.forEach(train => {
            trainCount++;
            rows.push(<tr key={trainCount}>
                <td>{train.dueMins}</td>
                <td>{train.destination}</td>
            </tr>)
        })
        return rows;
    }


    render() {
        return (
            <div>
                <div id="luas">
                    <h3>Luas Information</h3>
                    <div>General Line notice: {this.state.glencairnData.message}</div>
                    <div>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="2">Glencairn</th>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateTrainRows(this.state.glencairnData.inboundTrains)}
                            {this.generateTrainRows(this.state.glencairnData.outboundTrains)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="buses"></div>
            </div>
        );
    }

}