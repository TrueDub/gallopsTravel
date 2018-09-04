import React, {Component} from 'react';
import * as moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Trains from './Trains.jsx';
import Buses from './Buses.jsx';

class App extends Component {

    render() {
        return (
            <div className="container">
                <h5 className="text-center">Information requested at {moment().format('HH:mm:SS DD/MM/YYYY')}</h5>
                <Trains/>
                <Buses/>
            </div>
        );
    }
}

export default App;
