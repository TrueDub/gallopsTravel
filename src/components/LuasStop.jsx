import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export default class LuasStop extends React.Component {

    generateTrainRows(trainData) {
        let trains = [];
        trainData.forEach(train => {
            trains.push({due: train.dueMins, destination: train.destination})
        })
        return (
            <DataTable value={trains}>
                <Column field="due" header="Due in (mins)"/>
                <Column field="destination" header="Destination"/>
            </DataTable>
        )
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12"><h4 className="card-title">{this.props.stopName}</h4></div>
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