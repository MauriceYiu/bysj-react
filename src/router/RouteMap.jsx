import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./../containers/login/Login";
import Register from "./../containers/register/Register";
import SetUserInfo from "./../containers/setUserInfo/SetUserInfo";
import Index from "./../containers/index/Index";
import Chat from "./../containers/chat/Chat";
import Message from "./../containers/message/Message";
import Me from "./../containers/me/Me";

class RouteMap extends Component {
    render() {
        const fakeAuth = () => {
            const userInfo = sessionStorage.getItem('userInfo');
            if (!userInfo) {
                return false;
            }
            return true;
        }
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    fakeAuth() ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/"
                                }}
                            />
                        )
                }
            />
        )
        return (
            <Switch>
                <Route path="/" exact render={() => <Redirect to="/login" />} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/setUserInfo" exact render={() => <Redirect to="/login" />} />
                <PrivateRoute path="/setUserInfo/:isBoss" exact component={SetUserInfo} />
                <PrivateRoute path="/index" exact component={Index} />
                <PrivateRoute path="/chat/:id/:toName" exact component={Chat} />
                <PrivateRoute path="/message" exact component={Message} />
                <PrivateRoute path="/me" exact component={Me} />
            </Switch>
        );
    }
}

export default RouteMap;