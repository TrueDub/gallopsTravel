import React from 'react';
import {render} from 'react-dom'
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import gallopsApp from "./reducers/RootReducer";
import Provider from "react-redux/es/components/Provider";
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import {fetchBusData, fetchTramData} from "./actions/actions";

const loggerMiddleware = createLogger();

const store = createStore(gallopsApp, applyMiddleware(thunkMiddleware, loggerMiddleware));
//perform initial data load
store.dispatch(fetchTramData());
store.dispatch(fetchBusData());

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
