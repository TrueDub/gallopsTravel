import React from "react";

export default class LuasStop extends React.Component {

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
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th colSpan="2">{this.props.stopName}</th>
                </tr>
                <tr>
                    <th>Due in (mins)</th>
                    <th>Destination</th>
                </tr>
                </thead>
                <tbody>
                {this.generateTrainRows(this.props.inboundTrains)}
                {this.generateTrainRows(this.props.outboundTrains)}
                </tbody>
            </table>
        );
    }
}