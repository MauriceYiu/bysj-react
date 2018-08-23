import React, { Component } from 'react';
import "./index.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import IndexBottom from "./../../components/indexBottom/IndexBottom";
import gtq from "./../../static/images/gtq.png";
import xd from "./../../static/images/xd.png";
import xer from "./../../static/images/xer.png";
import { userList } from "./../../api/user";
import { connect } from 'react-redux';
import { IO } from "./../../actions/chat";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        }
    }
    render() {
        const { listData } = this.state;
        let head;
        let router = this.props.history;
        return (
            <div id="index">
                <IndexHeader />
                <div className="list">
                    <ul>
                        {
                            listData.map((item, index) => {
                                switch (item.header) {
                                    case "gtq":
                                        head = gtq;
                                        break;
                                    case "xd":
                                        head = xd;
                                        break;
                                    case "xer":
                                        head = xer;
                                        break;
                                    default:
                                        break;
                                }
                                return (
                                    <li className="item" key={index} onClick={() => router.push(`/chat/${item._id}/${item.username}`)}>
                                        <div className="head">
                                            <img src={head} alt="" />
                                            <span className="username">{item.username}</span>
                                        </div>
                                        <div className="user-desc">
                                            <div className="post">职位：{item.post}</div>
                                            {
                                                item.type === "laoban" ? (<div className="comp">公司：{item.company}</div>) : ("")
                                            }
                                            {
                                                item.type === "laoban" ? (<div className="salary">薪资：{item.salary}</div>) : ("")
                                            }
                                            <div className="desc">描述：{item.info}</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <IndexBottom />
            </div>
        );
    }
    async componentDidMount() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let type;
        userInfo.type === "laoban" ? type = "qiuzhi" : type = "laoban";
        try {
            let res = await userList(type);
            this.setState({
                listData: res.data
            });
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

export default connect(
    state => ({ msgData: state.chat }),
    { IO }
)(Index);