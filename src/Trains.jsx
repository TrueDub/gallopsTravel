import React from 'react';
//import {parseString} from 'xml2js';
import {parse} from 'pixl-xml';

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const API_ROOT = 'https://luasforecasts.rpa.ie/xml/get.ashx';

export default class Trains extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            glencairnData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}},
            gallopsData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}},
            leopardstownData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}},
            ballyoganData: {message: '', trainData: {inboundTrains: [], outboundTrains: []}}
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
                    <h3 class="text-center">Luas Information - {this.state.glencairnData.message}</h3>
                    <div class="row">
                        <div class="col">
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
                                {this.generateTrainRows(this.state.glencairnData.trainData.inboundTrains)}
                                {this.generateTrainRows(this.state.glencairnData.trainData.outboundTrains)}
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th colSpan="2">The Gallops</th>
                                </tr>
                                <tr>
                                    <th>Time</th>
                                    <th>Destination</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.generateTrainRows(this.state.gallopsData.trainData.inboundTrains)}
                                {this.generateTrainRows(this.state.gallopsData.trainData.outboundTrains)}
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th colSpan="2">Leopardstown Valley</th>
                                </tr>
                                <tr>
                                    <th>Time</th>
                                    <th>Destination</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.generateTrainRows(this.state.leopardstownData.trainData.inboundTrains)}
                                {this.generateTrainRows(this.state.leopardstownData.trainData.outboundTrains)}
                                </tbody>
                            </table>
                        </div>
                        <div class="col">
                            <table className="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th colSpan="2">Ballyogan Wood</th>
                                </tr>
                                <tr>
                                    <th>Time</th>
                                    <th>Destination</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.generateTrainRows(this.state.ballyoganData.trainData.inboundTrains)}
                                {this.generateTrainRows(this.state.ballyoganData.trainData.outboundTrains)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="buses"></div>
            </div>
        );
    }

}