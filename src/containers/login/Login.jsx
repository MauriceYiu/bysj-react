import React, { Component } from 'react';
import "./login.scss";

import { login } from "./../../api/user";

import { Toast } from 'antd-mobile';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.loginFn = this.loginFn.bind(this);
    }
    render() {
        const { history } = this.props;
        return (
            <div className="login">
                <div className="login-mask"></div>
                <div className="login-form">
                    <p>招聘系统</p>
                    <div className="username">
                        <input type="text" ref={(usernameInp) => this.usernameInp = usernameInp} placeholder="请输入用户名" name="username" />
                    </div>
                    <div className="password">
                        <input type="password" ref={(passwordInp) => this.passwordInp = passwordInp} placeholder="请输入密码" name="password" />
                    </div>
                    <div className="login-btn">
                        <button onClick={this.loginFn}>登录</button>
                    </div>
                </div>
                <div className="go-register" onClick={() => history.push("/register")}>
                    <span>还没有账号？注册</span>
                </div>
            </div>
        );
    }
    async loginFn() {
        const username = this.usernameInp.value;
        const password = this.passwordInp.value;
        if(!username){
            Toast.fail("请输入用户名", 3);
            return;
        }
        if(!password){
            Toast.fail("请输入密码", 3);
            return;
        }
        const userInfo = {
            username,
            password
        };
        try {
            let res = await login(userInfo);
            console.log(res);
            if (res.code === 1) {
                Toast.fail(res.msg, 3);
            } else {
                Toast.success(res.msg, 3);
            }
        } catch (error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default Login;