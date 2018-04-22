import React from 'react';

import {getStationDetail} from "./luas.service";

import 'bootstrap/dist/css/bootstrap.css';

export default class LineLayout extends React.Component {

    constructor(props) {
        super(props)
        let stationData = getStationDetail();
        let greenLine = [];
        let redLine = [];
        stationData.stations.forEach(station => {
            if (station.line === 'Green') {
                greenLine.push(station);
            } else {
                redLine.push(station);
            }
        });
        console.log('green count: ' + greenLine.length);
        console.log('  red count: ' + redLine.length);
        this.state = {redLine: redLine, greenLine: greenLine}
    }

    stationRows(line) {
        let rows = [];
        line.forEach((station, index) => {
            rows.push(<tr key={station.shortName}>
                <td>{station.displayName}</td>
                <td>
                    {index === 0 ? <img src='images/top_station.png' alt=''/> :
                        index === (line.length - 1) ? <img src='images/bottom_station.png' alt=''/> :
                            <img src='images/station.png' alt=''/>}</td>
            </tr>);
        })
        return rows;
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th colSpan='2'>Green Line</th>
                </tr>
                </thead>
                <tbody>
                {this.stationRows(this.state.greenLine)}
                </tbody>
            </table>
        )
    }
}