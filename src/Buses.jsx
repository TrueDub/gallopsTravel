import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

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
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 7416 - Murphystown Way, Mount Eagle Park</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data7416.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 7418 - Murphystown Way, Mount Eagle Lawn</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data7418.buses)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 7415 - Murphystown Way, Luas Glencairn</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data7415.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 7417 - Murphystown Way, Luas Glencairn</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data7417.buses)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 3487 - Kilgobbin Rd, Ballyogan Road</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data3487.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 3471 - Kilgobbin Rd, Ballyogan Road</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data3471.buses)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 3488 - Kilgobbin Rd, Sandyford Hall</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data3488.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 3470 - Kilgobbin Rd, Sandyford Hall</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data3470.buses)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 4396 - Ballyogan Rd, Ballyogan Avenue</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data4396.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">&nbsp;</div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 4313 - Ballyogan Rd, Luas Ballyogan</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data4313.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 5106 - Ballyogan Rd, Luas Ballyogan</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data5106.buses)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 4773 - Ballyogan Ave, Ballyogan Road</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data4773.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 4393 - Ballyogan Ave, Leopardstown Abbey</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data4393.buses)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th colSpan="3">Stop 4395 - Ballyogan, Community Centre</th>
                            </tr>
                            <tr>
                                <th>Due in (mins)</th>
                                <th>Route</th>
                                <th>Destination</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.generateBusRows(this.state.data4395.buses)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}