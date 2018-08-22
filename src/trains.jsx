import React from 'react';
import {parseString} from 'xml2js';

import {getNextTrainsAtStation, gatherResponseData} from "./luas.service";

import 'bootstrap/dist/css/bootstrap.css';

export default class Trains extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            glencairnData: {},
            message: ''
        }
    }

    componentDidMount() {
        getNextTrainsAtStation('GLE').then(response => {
            parseString(response.data, function (err, result) {
                let data = gatherResponseData(result);
                self.setState({
                    selectedStation: data.selectedStation,
                    message: data.message,
                    inboundTrains: data.inboundTrains,
                    outboundTrains: data.outboundTrains,
                });
            });
        })
            .catch(error => {
                console.log(error);
                return null;
            });
    }


    render() {
        return (
            <div>
                <div id="luas">
                    <h3>Luas Information</h3>
                    <h5>Glencairn</h5>
                    <div>Next Trains</div>
                    <div>{this.state.message}</div>
                    <div>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="2">Inbound</th>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateTrainRows(this.state.inboundTrains)}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="2">Outbound</th>
                            </tr>
                            <tr>
                                <th>Time</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateTrainRows(this.state.outboundTrains)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="buses"></div>
            </div>
        );
    }

}