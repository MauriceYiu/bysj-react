import React, { Component } from 'react';
import "./setUserInfo.scss";
import { update } from "./../../api/user.js";
import { Toast } from 'antd-mobile';

import { connect } from 'react-redux';


class SetUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0,
            header: "gtq",
            post: "",
            info: "",
            company: "",
            salary: 0,
            isBoss: this.props.match.params.isBoss
        }
        this.updateUserInfo = this.updateUserInfo.bind(this);
    };
    render() {
        let { key, isBoss } = this.state;
        console.log(isBoss)
        return (
            <div id="set-user-info">
                <p>请选择您的头像</p>
                <div className="user-avatar">
                    <ul>
                        <li key={0} onClick={() => this.setState({ key: 0 })} className={key === 0 ? "show-color" : ""}>
                            <img src={require("./../../static/images/gtq.png")} alt="" />
                        </li>
                        <li key={1} onClick={() => this.setState({ key: 1 })} className={key === 1 ? "show-color" : ""}>
                            <img src={require("./../../static/images/xd.png")} alt="" />
                        </li>
                        <li key={2} onClick={() => this.setState({ key: 2 })} className={key === 2 ? "show-color" : ""}>
                            <img src={require("./../../static/images/xer.png")} alt="" />
                        </li>
                    </ul>
                </div>
                <div className="user-info">
                    {
                        isBoss === "true" ? (
                            <div className="boss">
                                <div className="job-info">
                                    <p>招聘职位</p>
                                    <input type="text" placeholder="请输入岗位信息..." onChange={(e) => { this.setState({ post: e.target.value }) }} name="job" />
                                </div>
                                <div className="comp-info">
                                    <p>公司名称</p>
                                    <input type="text" placeholder="请输入公司名字..." onChange={(e) => { this.setState({ company: e.target.value }) }} name="job" />
                                </div>
                                <div className="salary-info">
                                    <p>职位薪资</p>
                                    <input type="text" placeholder="请输入薪资..." onChange={(e) => { this.setState({ salary: e.target.value }) }} name="job" />
                                </div>
                                <div className="job-introduction">
                                    <p>职位要求</p>
                                    <textarea placeholder="请介绍职位要求..." onChange={(e) => { this.setState({ info: e.target.value }) }}></textarea>
                                </div>
                            </div>
                        ) : (
                                <React.Fragment>
                                    <div className="job-info">
                                        <p>请输入求职信息（岗位）</p>
                                        <input type="text" placeholder="请输入所求岗位信息..." onChange={(e) => { this.setState({ post: e.target.value }) }} name="job" />
                                    </div>
                                    <div className="self-introduction">
                                        <p>请输入个人介绍</p>
                                        <textarea placeholder="请介绍自己..." onChange={(e) => { this.setState({ info: e.target.value }) }}></textarea>
                                    </div>
                                </React.Fragment>
                            )
                    }

                </div>
                <div className="save">
                    <button onClick={this.updateUserInfo}>保存</button>
                </div>
            </div>
        );
    }
    async updateUserInfo() {
        const { key, info, post, isBoss, company, salary } = this.state;
        if (!post) {
            Toast.fail("请输入职位信息", 3);
            return;
        }
        if (!info) {
            Toast.fail("请输入自我介绍", 3);
            return;
        }
        switch (key) {
            case 0:
                await this.setState({ header: "gtq" });
                break;
            case 1:
                await this.setState({ header: "xd" });
                break;
            case 2:
                await this.setState({ header: "xer" });
                break;
            default:
                await this.setState({ header: "gtq" });
                break;
        }
        let userInfo;
        if (!isBoss) {
            userInfo = {
                header: this.state.header,
                post,
                info
            }
        } else {
            userInfo = {
                header: this.state.header,
                post,
                info,
                company,
                salary
            }
        }
        let res = await update(userInfo);
        if (res.code === 0) {
            Toast.success(res.msg, 3);
            sessionStorage.setItem("userInfo", JSON.stringify(res.data));
            this.props.history.push('/index');
            this.props.IO(res.data._id);
            return;
        } else {
            Toast.fail(res.msg, 3);
            return;
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}
export default connect(
    state => ({ msgData: null }),
    {}
)(SetUserInfo);