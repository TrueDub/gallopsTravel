import React from 'react';
import {parseString} from 'xml2js';

import {getNextTrainsAtStation, gatherResponseData} from "./luas.service";

import 'bootstrap/dist/css/bootstrap.css';

export default class Trains extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            glencairnData: {
                inboundTrains: [],
                outboundTrains: []
            }
        }
        this.gatherTrainData();
    }

    gatherTrainData() {
        getNextTrainsAtStation('GLE').then(response => {
            parseString(response.data, function (err, result) {
                let data = gatherResponseData(result);
                console.log(data);
                this.setState({
                    message: data.message,
                    glencairnData: {
                        inboundTrains: data.inboundTrains,
                        outboundTrains: data.outboundTrains
                    }
                });
            }.bind(this));
        })
            .catch(error => {
                console.log(error);
                return null;
            });
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
                    <div>General Line performance: {this.state.message}</div>
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