import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import "./static/css/base.css";
import "./static/js/rem";
import RouteMap from "./router/RouteMap";
import { HashRouter } from "react-router-dom";

import FastClick from 'fastclick'

FastClick.attach(document.body);

ReactDOM.render(
    <HashRouter>
        <App>
            <RouteMap/>
        </App>
    </HashRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
