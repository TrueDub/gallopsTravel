import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import TramContainer from "./containers/TramContainer";
import BusContainer from "./containers/BusContainer";

class App extends Component {

    render() {
        return (
            <div className="container">
                <ErrorBoundary message='There was an error retrieving Luas information'>
                    <TramContainer/>
                </ErrorBoundary>
                <ErrorBoundary message='There was an error retrieving Dublin Bus information'>
                    <BusContainer/>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
