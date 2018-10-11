import React from 'react';
import {render} from 'react-dom'
import './index.css';
import App from './App';
import {createStore} from "redux";
import gallopsApp from "./reducers/RootReducer";
import Provider from "react-redux/es/components/Provider";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';

const store = createStore(gallopsApp)

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
