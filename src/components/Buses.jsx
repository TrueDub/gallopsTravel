import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BusStop from './BusStop.jsx';
import {ProgressSpinner} from "primereact/progressspinner";

export default class Buses extends React.Component {

    render() {
        let output;
        if (this.props.busData.isLoading) {
            output = <div>
                <button onClick={this.props.onBusRefresh}>Refresh</button>
                < ProgressSpinner/>
            </div>;
        } else {
            output = <div>
                <h3 className="text-center">Dublin Bus Information</h3>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='7416' stopName='Murphystown Way, Mount Eagle Park'
                                 buses={this.props.busData.data7416.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='7418' stopName='Murphystown Way, Mount Eagle Lawn'
                                 buses={this.props.busData.data7418.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='7415' stopName='Murphystown Way, Luas Glencairn'
                                 buses={this.props.busData.data7415.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='7417' stopName='Murphystown Way, Luas Glencairn'
                                 buses={this.props.busData.data7417.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='3487' stopName='Kilgobbin Rd, Ballyogan Road'
                                 buses={this.props.busData.data3487.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='3471' stopName='Kilgobbin Rd, Ballyogan Road'
                                 buses={this.props.busData.data3471.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='3488' stopName='Kilgobbin Rd, Sandyford Hall'
                                 buses={this.props.busData.data3488.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='3470' stopName='Kilgobbin Rd, Sandyford Hall'
                                 buses={this.props.busData.data3470.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4396' stopName='Ballyogan Rd, Ballyogan Avenue'
                                 buses={this.props.busData.data4396.buses}/>
                    </div>
                    <div className="col">&nbsp;</div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4313' stopName='Ballyogan Rd, Luas Ballyogan'
                                 buses={this.props.busData.data4313.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='5106' stopName='Ballyogan Rd, Luas Ballyogan'
                                 buses={this.props.busData.data5106.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4773' stopName='Ballyogan Rd, Ballyogan Road'
                                 buses={this.props.busData.data4773.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='4393' stopName='Ballyogan Ave, Leopardstown Abbey'
                                 buses={this.props.busData.data4393.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='4395' stopName='Ballyogan, Community Centre'
                                 buses={this.props.busData.data4395.buses}/>
                    </div>
                </div>
            </div>
        }
        return (
            <div>
                {output}
            </div>
        );
    }

}