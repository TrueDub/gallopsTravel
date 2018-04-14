import React, {Component} from 'react';
import './App.css';
import {getNextTrainsAtStation} from "./luas.service";
import NextTrain from './NextTrain.jsx';

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
            <div>
                <NextTrain/>
            </div>
        );
    }
}

export default App;
