import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import {getNextTrainsAtStation} from "./luas.service";
import Trains from './trains.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {results: ''};
    }

    componentDidMount() {
        getNextTrainsAtStation('STS').then(response => {
            this.setState({results: response.data});
        })
            .catch(error => {
                console.log(error);
                return null;
            });
    }

    render() {
        return (
            <div className="container">
                <Trains/>
            </div>
        );
    }
}

export default App;
