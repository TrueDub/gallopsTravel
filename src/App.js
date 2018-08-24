import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Trains from './Trains.jsx';
import Buses from './Buses.jsx';

class App extends Component {

    render() {
        return (
            <div className="container">
                <Trains/>
                <Buses/>
            </div>
        );
    }
}

export default App;
