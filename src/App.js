import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ErrorBoundary from './components/ErrorBoundary.jsx';

import TramContainer from "./containers/TramContainer";
import BusContainer from "./containers/BusContainer";
import {TabPanel, TabView} from "primereact/tabview";

class App extends Component {

    render() {
        return (
            <div className="container">
                <TabView>
                    <TabPanel header="Luas">
                        <ErrorBoundary message='There was an error retrieving Luas information'>
                            <TramContainer/>
                        </ErrorBoundary>
                    </TabPanel>
                    {/*<TabPanel header="Dublin Bus">
                        <ErrorBoundary message='There was an error retrieving Dublin Bus information'>
                            <BusContainer/>
                        </ErrorBoundary>
                    </TabPanel>*/}
                </TabView>
            </div>
        );
    }
}

export default App;
