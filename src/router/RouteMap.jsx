import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./../containers/login/Login";

class RouteMap extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <Redirect to="/login" />} />
                <Route path="/login" exact component={Login} />
            </Switch>
        );
    }
}

export default RouteMap;