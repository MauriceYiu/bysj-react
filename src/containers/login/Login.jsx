import React, { Component } from 'react';
import "./login.scss";
import { Toast } from 'antd-mobile';
import LoginAndReg from "./../../components/loginAndReg/LoginAndReg";
import { connect } from 'react-redux';
import { login } from "../../actions";

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
            <LoginAndReg>
                <div className="login">
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
            </LoginAndReg>
        );
    }
    async loginFn() {
        const username = this.usernameInp.value;
        const password = this.passwordInp.value;
        if (!username) {
            Toast.fail("请输入用户名", 3);
            return;
        }
        if (!password) {
            Toast.fail("请输入密码", 3);
            return;
        }
        const userInfo = {
            username,
            password
        };
        try {
            await this.props.login(userInfo);

            console.log(this.props.loginInfo);

            const loginInfo = this.props.loginInfo;

            if (loginInfo.code === 0) {
                Toast.success(loginInfo.msg, 3);

                sessionStorage.setItem("userInfo", JSON.stringify(loginInfo.data));

                this.props.history.push("/index");
            } else {
                Toast.fail(loginInfo.msg, 3);
            }
            // let res = await login(userInfo);
            // console.log(res);
            // if (res.code === 1) {
            //     Toast.fail(res.msg, 3);
            // } else {
            //     Toast.success(res.msg, 3);
            //     sessionStorage.setItem("userInfo", JSON.stringify(res.data));
            //     this.props.history.push("/index");
            //     this.props.IO(res.data._id);
            // }
        } catch (error) {
            console.log(error);
        }
    }
    componentDidMount(){
        sessionStorage.clear();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default connect(
    state => ({ loginInfo: state.user }),
    { login }
)(Login);