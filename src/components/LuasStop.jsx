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
        //return rows;
        return (
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Due in (mins)</th>
                    <th>Destination</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12"><h4 class="card-title">{this.props.stopName}</h4></div>
                        <div className="col-md-6"><h5>Towards Town</h5></div>
                        <div className="col-md-6"><h5>Towards Bride's Glen</h5></div>
                        <div className="col-md-6">
                            {this.generateTrainRows(this.props.inboundTrains)}
                        </div>
                        <div className="col-md-6">
                            {this.generateTrainRows(this.props.outboundTrains)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}