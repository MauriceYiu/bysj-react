import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./../containers/login/Login";
import Register from "./../containers/register/Register";
import SetUserInfo from "./../containers/setUserInfo/SetUserInfo";

class RouteMap extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact render={() => <Redirect to="/login" />} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/setUserInfo" exact component={SetUserInfo} />
            </Switch>
        );
    }
}

export default RouteMap;