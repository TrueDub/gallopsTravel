import React from 'react';
import {parseString} from 'xml2js';

import {getNextTrainsAtStation, getStationDetail} from "./luas.service";

export default class NextTrain extends React.Component {

    constructor(props) {
        super(props)
        this.state = {results: [], stationDetail: getStationDetail()}
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

    onSelect(event) {
        let selectedStation = event.target.value;
        getNextTrainsAtStation(selectedStation).then(response => {
            parseString(response.data, function (err, result) {
                console.log(result);
            });
            this.setState({results: response.data});
        })
            .catch(error => {
                console.log(error);
                return null;
            });
    }


    render() {
        return (
            <div>
                <select onChange={this.onSelect}>{this.generateStationOptions()}</select>
                <div>Next Trains</div>
                {this.state.results}
                <table>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Destination</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}