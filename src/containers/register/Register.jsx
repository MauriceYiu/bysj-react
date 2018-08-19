import React, { Component } from 'react';
import "./register.scss";
import { register } from "./../../api/user";
import LoginAndReg from "./../../components/loginAndReg/LoginAndReg";
import { Toast } from 'antd-mobile';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLaoBan: false
        };
        this.registerFn = this.registerFn.bind(this);
    }
    render() {
        const { history } = this.props;
        let { isLaoBan } = this.state;
        return (
            <LoginAndReg>
                <div className="register">
                    <div className="register-form">
                        <p>用户注册</p>
                        <div className="username">
                            <input type="text" ref={(usernameInp) => this.usernameInp = usernameInp} placeholder="请输入用户名" name="username" />
                        </div>
                        <div className="password">
                            <input type="password" ref={(passwordInp) => this.passwordInp = passwordInp} placeholder="请输入密码" name="password" />
                        </div>
                        <div className="type">
                            <p>请选择用户类型</p>
                            <span className={isLaoBan ? "qiuzhi" : "qiuzhi active"} onClick={() => this.setState({ isLaoBan: false })} >求职者</span>
                            <span className={isLaoBan ? "laoban active" : "laoban"} onClick={() => this.setState({ isLaoBan: true })} >老板</span>
                        </div>
                        <div className="register-btn">
                            <button onClick={this.registerFn}>注册</button>
                        </div>
                    </div>
                    <div className="go-login" onClick={() => history.push("/login")}>
                        <span>返回登录</span>
                    </div>
                </div>
            </LoginAndReg>
        );
    }
    async registerFn() {
        const username = this.usernameInp.value;
        const password = this.passwordInp.value;
        const isLaoBan = this.state.isLaoBan;
        if (!username) {
            Toast.fail("请输入用户名", 3);
            return;
        }
        if (!password) {
            Toast.fail("请输入密码", 3);
            return;
        }
        let type;
        isLaoBan ? type = "laoban" : type = "qiuzhi";
        const userInfo = {
            username,
            password,
            type
        };
        try {
            let res = await register(userInfo);
            if (res.code === 0) {
                Toast.success(res.msg, 3);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                this.props.history.push(`/setUserInfo/${isLaoBan}`);
            } else {
                Toast.fail(res.msg, 3);
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

export default Register;