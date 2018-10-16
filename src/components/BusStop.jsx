import React from 'react';

function BusDetail(props) {
    return (
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th colSpan="3">Stop {props.stopNumber} - {props.stopName}</th>
            </tr>
            <tr>
                <th>Due in (mins)</th>
                <th>Route</th>
                <th>Destination</th>
            </tr>
            </thead>
            <tbody>
            {generateBusRows(props.buses)}
            </tbody>
        </table>
    );
}

function BusError(props) {
    return (
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th colSpan="3">Stop {props.stopNumber} - {props.stopName}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colSpan="3">{props.errorMessage}</td>
            </tr>
            </tbody>
        </table>
    );
}

function generateBusRows(busData) {
    let rows = [];
    let busCount = 0;
    busData.forEach(bus => {
        busCount++;
        rows.push(<tr key={busCount}>
            <td>{bus.dueMins}</td>
            <td>{bus.route}</td>
            <td>{bus.destination}</td>
        </tr>)
    });
    return rows;
}


export default class BusStop extends React.Component {

    render() {
        console.log(this.props.errorCode);
        if (this.props.errorCode === undefined) {
            return (
                <BusDetail stopNumber={this.props.stopNumber} stopName={this.props.stopName}
                           buses={this.props.buses}/>
            );
        } else {
            return (
                <BusError stopNumber={this.props.stopNumber} stopName={this.props.stopName}
                          errorMessage={this.props.errorMessage}/>
            );
        }
    }
}

