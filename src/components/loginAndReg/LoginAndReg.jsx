import React, { Component } from 'react';
import "./loginAndReg.scss";

class LoginAndReg extends Component {
    render() {
        return (
            <div id="login-and-reg">
                <div className="login-mask"></div>
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            </div>
        );
    }
}

export default LoginAndReg;