import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {getNextTrainsAtStation} from "./luas.service";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {results: 'init'};
    }

    componentDidMount() {
        getNextTrainsAtStation('STS').then(data => {
            this.setState({results: data});
        });

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    fred -  {this.state.results}
                </p>
            </div>
        );
    }
}

export default App;
