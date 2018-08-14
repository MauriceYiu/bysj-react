import React, { Component } from 'react';
import "./login.scss";

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-mask"></div>
                <div className="login-form">
                    <p>招聘系统</p>
                    <div className="username">
                        <input type="text" placeholder="请输入用户名" name="username" id=""/>
                    </div>
                    <div className="password">
                        <input type="text" placeholder="请输入密码" name="password" id=""/>
                    </div>
                    <div className="login-btn">
                        <button>登录</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;