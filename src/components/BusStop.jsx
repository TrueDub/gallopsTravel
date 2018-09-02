import React from 'react';

export default class Buses extends React.Component {


    generateBusRows(busData) {
        let rows = [];
        let busCount = 0;
        busData.forEach(bus => {
            busCount++;
            rows.push(<tr key={busCount}>
                <td>{bus.dueMins}</td>
                <td>{bus.route}</td>
                <td>{bus.destination}</td>
            </tr>)
        })
        return rows;
    }


    render() {
        return (
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th colSpan="3">Stop {this.props.stopNumber} - {this.props.stopName}</th>
                </tr>
                <tr>
                    <th>Due in (mins)</th>
                    <th>Route</th>
                    <th>Destination</th>
                </tr>
                </thead>
                <tbody>
                {this.generateBusRows(this.props.buses)}
                </tbody>
            </table>
        );
    }

}