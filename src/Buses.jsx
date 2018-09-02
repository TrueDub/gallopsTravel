import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import BusStop from './components/BusStop.jsx'

const API_ROOT_3470 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3470&format=json';
const API_ROOT_3471 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3471&format=json';
const API_ROOT_3487 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3487&format=json';
const API_ROOT_3488 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=3488&format=json';
const API_ROOT_4313 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4313&format=json';
const API_ROOT_4393 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4393&format=json';
const API_ROOT_4395 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4395&format=json';
const API_ROOT_4396 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4396&format=json';
const API_ROOT_4773 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=4773&format=json';
const API_ROOT_5106 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=5106&format=json';
const API_ROOT_7415 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7415&format=json';
const API_ROOT_7416 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7416&format=json';
const API_ROOT_7417 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7417&format=json';
const API_ROOT_7418 = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7418&format=json';

export default class Buses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data3470: {buses: [{dueMins: '', destination: '', route: ''}]},
            data3471: {buses: [{dueMins: '', destination: '', route: ''}]},
            data3487: {buses: [{dueMins: '', destination: '', route: ''}]},
            data3488: {buses: [{dueMins: '', destination: '', route: ''}]},
            data4313: {buses: [{dueMins: '', destination: '', route: ''}]},
            data4393: {buses: [{dueMins: '', destination: '', route: ''}]},
            data4395: {buses: [{dueMins: '', destination: '', route: ''}]},
            data4396: {buses: [{dueMins: '', destination: '', route: ''}]},
            data4773: {buses: [{dueMins: '', destination: '', route: ''}]},
            data5106: {buses: [{dueMins: '', destination: '', route: ''}]},
            data7415: {buses: [{dueMins: '', destination: '', route: ''}]},
            data7416: {buses: [{dueMins: '', destination: '', route: ''}]},
            data7417: {buses: [{dueMins: '', destination: '', route: ''}]},
            data7418: {buses: [{dueMins: '', destination: '', route: ''}]}
        }
        axios.all([
            axios.get(API_ROOT_3470),
            axios.get(API_ROOT_3471),
            axios.get(API_ROOT_3487),
            axios.get(API_ROOT_3488),
            axios.get(API_ROOT_4313),
            axios.get(API_ROOT_4393),
            axios.get(API_ROOT_4395),
            axios.get(API_ROOT_4396),
            axios.get(API_ROOT_4773),
            axios.get(API_ROOT_5106),
            axios.get(API_ROOT_7415),
            axios.get(API_ROOT_7416),
            axios.get(API_ROOT_7417),
            axios.get(API_ROOT_7418)

        ]).then(
            axios.spread((response3470, response3471, response3487, response3488, response4313, response4393,
                          response4395, response4396, response4773, response5106, response7415, response7416,
                          response7417, response7418) => {
                let data3470 = this.processBusData(response3470.data);
                let data3471 = this.processBusData(response3471.data);
                let data3487 = this.processBusData(response3487.data);
                let data3488 = this.processBusData(response3488.data);
                let data4313 = this.processBusData(response4313.data);
                let data4393 = this.processBusData(response4393.data);
                let data4395 = this.processBusData(response4395.data);
                let data4396 = this.processBusData(response4396.data);
                let data4773 = this.processBusData(response4773.data);
                let data5106 = this.processBusData(response5106.data);
                let data7415 = this.processBusData(response7415.data);
                let data7416 = this.processBusData(response7416.data);
                let data7417 = this.processBusData(response7417.data);
                let data7418 = this.processBusData(response7418.data);
                /*let data7416 = {
                    stopNumber: 7416,
                    stopName: 'Murphystown Way, Mount Eagle Park',
                    buses: this.processBusData(response7416.data)
                }*/
                this.setState({
                    data3470: data3470,
                    data3471: data3471,
                    data3487: data3487,
                    data3488: data3488,
                    data4313: data4313,
                    data4393: data4393,
                    data4395: data4395,
                    data4396: data4396,
                    data4773: data4773,
                    data5106: data5106,
                    data7415: data7415,
                    data7416: data7416,
                    data7417: data7417,
                    data7418: data7418
                });
            }));
    }

    processBusData(response) {
        let buses = [];
        response.results.forEach(entry => {
            buses.push({
                    dueMins: entry.duetime,
                    destination: entry.destination,
                    route: entry.route
                }
            );
        });
        return {buses: buses};
    }

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
            <div>
                <h3 className="text-center">Dublin Bus Information</h3>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='7416' stopName='Murphystown Way, Mount Eagle Park'
                                 buses={this.state.data7416.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='7418' stopName='Murphystown Way, Mount Eagle Lawn'
                                 buses={this.state.data7418.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='7415' stopName='Murphystown Way, Luas Glencairn'
                                 buses={this.state.data7415.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='7417' stopName='Murphystown Way, Luas Glencairn'
                                 buses={this.state.data7417.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='3487' stopName='Kilgobbin Rd, Ballyogan Road'
                                 buses={this.state.data3487.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='3471' stopName='Kilgobbin Rd, Ballyogan Road'
                                 buses={this.state.data3471.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='3488' stopName='Kilgobbin Rd, Sandyford Hall'
                                 buses={this.state.data3488.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='3470' stopName='Kilgobbin Rd, Sandyford Hall'
                                 buses={this.state.data3470.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4396' stopName='Ballyogan Rd, Ballyogan Avenue'
                                 buses={this.state.data4396.buses}/>
                    </div>
                    <div className="col">&nbsp;</div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4313' stopName='Ballyogan Rd, Luas Ballyogan'
                                 buses={this.state.data4313.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='5106' stopName='Ballyogan Rd, Luas Ballyogan'
                                 buses={this.state.data5106.buses}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <BusStop stopNumber='4773' stopName='Ballyogan Rd, Ballyogan Road'
                                 buses={this.state.data4773.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='4393' stopName='Ballyogan Ave, Leopardstown Abbey'
                                 buses={this.state.data4393.buses}/>
                    </div>
                    <div className="col">
                        <BusStop stopNumber='4395' stopName='Ballyogan, Community Centre'
                                 buses={this.state.data4395.buses}/>
                    </div>
                </div>
            </div>
        );
    }

}