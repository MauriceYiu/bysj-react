import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./../containers/login/Login";
import Register from "./../containers/register/Register";

class RouteMap extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <Redirect to="/login" />} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
            </Switch>
        );
    }
}

export default RouteMap;