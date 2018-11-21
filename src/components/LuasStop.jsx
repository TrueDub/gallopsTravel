import React from 'react';
//import {DataTable} from "primereact/datatable";
//import {Column} from "primereact/column";
import SimpleTreeTable from 'simple-react-treetable';

export default class LuasStop extends React.Component {

    generateTrainRows(trainData) {
        let trains = [];
        trainData.forEach(train => {
            trains.push({data: {due: train.dueMins, destination: train.destination}})
        })
        let columns = [{
            dataField: 'due',
            heading: 'Due in (mins)'
        }, {
            dataField: 'destination',
            heading: 'Destination'
        }];
        let controls = {showButton: false, tableClasses: 'table table-bordered'};
        return (
            <SimpleTreeTable tableData={trains} columns={columns} control={controls}></SimpleTreeTable>
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
