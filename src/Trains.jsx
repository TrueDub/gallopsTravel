import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LuasStop from "./components/LuasStop";


export default class Trains extends React.Component {

    render() {
        return (
            <div id="luas">
                <h3 className="text-center">Luas Information - {this.props.glencairnData.message}</h3>
                <div>
                    <LuasStop stopName="Glencairn"
                              inboundTrains={this.props.glencairnData.trainData.inboundTrains}
                              outboundTrains={this.props.glencairnData.trainData.outboundTrains}/>
                </div>
                <div>
                    <LuasStop stopName="The Gallops"
                              inboundTrains={this.props.gallopsData.trainData.inboundTrains}
                              outboundTrains={this.props.gallopsData.trainData.outboundTrains}/>
                </div>
                <div>
                    <LuasStop stopName="Leopardstown Valley"
                              inboundTrains={this.props.leopardstownData.trainData.inboundTrains}
                              outboundTrains={this.props.leopardstownData.trainData.outboundTrains}/>
                </div>
                <div>
                    <LuasStop stopName="Ballyogan Wood"
                              inboundTrains={this.props.ballyoganData.trainData.inboundTrains}
                              outboundTrains={this.props.ballyoganData.trainData.outboundTrains}/>
                </div>
            </div>
        );
    }

}