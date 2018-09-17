import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BusStop from './components/BusStop.jsx';

export default class Buses extends React.Component {

    render() {
        return (
            <div>
                <h3 className="text-center">Dublin Bus Information</h3>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='7416' stopName='Murphystown Way, Mount Eagle Park'
                                 buses={this.props.data7416.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='7418' stopName='Murphystown Way, Mount Eagle Lawn'
                                 buses={this.props.data7418.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='7415' stopName='Murphystown Way, Luas Glencairn'
                                 buses={this.props.data7415.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='7417' stopName='Murphystown Way, Luas Glencairn'
                                 buses={this.props.data7417.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='3487' stopName='Kilgobbin Rd, Ballyogan Road'
                                 buses={this.props.data3487.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='3471' stopName='Kilgobbin Rd, Ballyogan Road'
                                 buses={this.props.data3471.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='3488' stopName='Kilgobbin Rd, Sandyford Hall'
                                 buses={this.props.data3488.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='3470' stopName='Kilgobbin Rd, Sandyford Hall'
                                 buses={this.props.data3470.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4396' stopName='Ballyogan Rd, Ballyogan Avenue'
                                 buses={this.props.data4396.buses}/>
                    </div>
                    <div className="col">&nbsp;</div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4313' stopName='Ballyogan Rd, Luas Ballyogan'
                                 buses={this.props.data4313.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='5106' stopName='Ballyogan Rd, Luas Ballyogan'
                                 buses={this.props.data5106.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4773' stopName='Ballyogan Rd, Ballyogan Road'
                                 buses={this.props.data4773.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='4393' stopName='Ballyogan Ave, Leopardstown Abbey'
                                 buses={this.props.data4393.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='4395' stopName='Ballyogan, Community Centre'
                                 buses={this.props.data4395.buses}/>
                    </div>
                </div>
            </div>
        );
    }

}