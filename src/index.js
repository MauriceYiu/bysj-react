import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import "./static/css/base.css";
import "./static/js/rem";
import RouteMap from "./router/RouteMap";
import { HashRouter } from "react-router-dom";


import { Provider } from 'react-redux';
import store from './store/store';

import FastClick from 'fastclick'

FastClick.attach(document.body);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App>
                <RouteMap/>
            </App>
        </HashRouter>
     </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
