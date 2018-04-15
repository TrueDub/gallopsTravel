import React from 'react';
import {parseString} from 'xml2js';

import {getNextTrainsAtStation, getStationDetail, gatherResponseData} from "./luas.service";

import 'bootstrap/dist/css/bootstrap.css';

export default class NextTrain extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedStation: '',
            message: '',
            inboundTrains: [],
            outboundTrains: [],
            stationDetail: getStationDetail()
        }
        this.onSelect = this.onSelect.bind(this);
    }

    generateStationOptions() {
        this.state.stationDetail.stations.sort(function (a, b) {
            return (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0);
        });
        let stationOptions = [];
        this.state.stationDetail.stations.forEach(station => {
            stationOptions.push(<option key={station.shortName}
                                        value={station.shortName}>{station.displayName}</option>)
        })
        return stationOptions;
    }

    generateTrainRows(trainData) {
        let rows = [];
        trainData.forEach(train => {
            rows.push(<tr>
                <td>{train.dueMins}</td>
                <td>{train.destination}</td>
            </tr>)
        })
        return rows;
    }

    onSelect(event) {
        let self = this;
        getNextTrainsAtStation(event.target.value).then(response => {
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
                <label>Select station:</label><select onChange={this.onSelect}>{this.generateStationOptions()}</select>
                <div>Next Trains</div>
                <div>{this.state.selectedStation}</div>
                <div>{this.state.message}</div>
                <div>
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th colspan="2">Inbound</th>
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
        );
    }

}