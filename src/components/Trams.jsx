import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LuasStop from "./LuasStop";


export default class Trams extends React.Component {

    render() {
        return (
            <div id="luas">
                <h3 className="text-center">Luas Information - {this.props.trainData.glencairnData.message}</h3>
                <div>
                    <LuasStop stopName="Glencairn"
                              inboundTrains={this.props.trainData.glencairnData.trainData.inboundTrains}
                              outboundTrains={this.props.trainData.glencairnData.trainData.outboundTrains}/>
                </div>
                <div>
                    <LuasStop stopName="The Gallops"
                              inboundTrains={this.props.trainData.gallopsData.trainData.inboundTrains}
                              outboundTrains={this.props.trainData.gallopsData.trainData.outboundTrains}/>
                </div>
                <div>
                    <LuasStop stopName="Leopardstown Valley"
                              inboundTrains={this.props.trainData.leopardstownData.trainData.inboundTrains}
                              outboundTrains={this.props.trainData.leopardstownData.trainData.outboundTrains}/>
                </div>
                <div>
                    <LuasStop stopName="Ballyogan Wood"
                              inboundTrains={this.props.trainData.ballyoganData.trainData.inboundTrains}
                              outboundTrains={this.props.trainData.ballyoganData.trainData.outboundTrains}/>
                </div>
            </div>
        );
    }

}