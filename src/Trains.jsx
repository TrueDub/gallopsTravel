import React from 'react';
import {parse} from 'pixl-xml';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import LuasStop from "./components/LuasStop";

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
            <div id="luas">
                <h3 className="text-center">Luas Information - {this.state.glencairnData.message}</h3>
                <div className="row">
                    <div className="col">
                        <LuasStop stopName="Glencairn"
                                  inboundTrains={this.state.glencairnData.trainData.inboundTrains}
                                  outboundTrains={this.state.glencairnData.trainData.outboundTrains}/>
                    </div>
                    <div className="col">
                        <LuasStop stopName="The Gallops"
                                  inboundTrains={this.state.gallopsData.trainData.inboundTrains}
                                  outboundTrains={this.state.gallopsData.trainData.outboundTrains}/>
                    </div>
                    <div className="col">
                        <LuasStop stopName="Leopardstown Valley"
                                  inboundTrains={this.state.leopardstownData.trainData.inboundTrains}
                                  outboundTrains={this.state.leopardstownData.trainData.outboundTrains}/>
                    </div>
                    <div className="col">
                        <LuasStop stopName="Ballyogan Wood"
                                  inboundTrains={this.state.ballyoganData.trainData.inboundTrains}
                                  outboundTrains={this.state.ballyoganData.trainData.outboundTrains}/>
                    </div>
                </div>
            </div>
        );
    }

}