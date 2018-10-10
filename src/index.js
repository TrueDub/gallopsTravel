import React from 'react';
import {render} from 'react-dom'
import './index.css';
import App from './App';
import {createStore} from "redux";
import gallopsApp from "./reducers/Reducer";
import Provider from "react-redux/es/components/Provider";

const store = createStore(gallopsApp)

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
