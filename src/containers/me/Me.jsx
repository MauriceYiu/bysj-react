import React, { Component } from 'react';
import "./me.scss";
// import IndexHeader from "./../../components/indexHeader/IndexHeader";
import IndexBottom from "./../../components/indexBottom/IndexBottom";
import { connect } from "react-redux";

class Me extends Component {
    render() {
        let router = this.props.history;
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        return (
            <div id="me">
                {/* <IndexHeader titName="我" /> */}
                <div className="head-bg"></div>
                <div className="avatar">
                    <img src={userInfo.header ? (require(`./../../static/images/${userInfo.header}.png`)) : (require("./../../static/images/gtq.png"))} alt="" />
                </div>
                <div className="user-info">
                    <div className="username">姚浩</div>
                    {
                        userInfo.type === "laoban" ? (<div className="comp">{userInfo.company}</div>) : ("")
                    }
                </div>
                <div className="desc">
                    <div className="tit">简介：</div>
                    <ul>
                        <li className="post">
                            <span className="sub-tit">职位：</span>
                            <span className="info">{userInfo.post}</span>
                        </li>
                        {
                            userInfo.type === "laoban" ? (
                                <li className="salary">
                                    <span className="sub-tit">薪水：</span>
                                    <span className="info">{userInfo.salary}</span>
                                </li>
                            ) : ("")
                        }
                        <li className="request-or-desc">
                            <span className="sub-tit">{userInfo.type === "laoban" ? ("职位要求：") : ("个人简介：")}</span>
                            <span className="info">{userInfo.info}</span>
                        </li>
                    </ul>
                </div>
                <div className="logout">
                    <button onClick={() => this.props.history.push("/")}>退出登录</button>
                </div>
                <IndexBottom nowKey={2} history={router} unReadCount={this.props.unReadCount} />
            </div>
        );
    }
}

export default connect(
    state => ({ unReadCount: state.chat.unReadCount })
)(Me);