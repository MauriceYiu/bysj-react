import React, { Component } from 'react';
import "./index.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import IndexBottom from "./../../components/indexBottom/IndexBottom";
import { userList } from "./../../api/user";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: []
        }
    }
    render() {
        const { listData } = this.state;
        let router = this.props.history;
        let head;
        return (
            <div id="index">
                <IndexHeader />
                <div className="list">
                    <ul>
                        {
                            listData.map((item, index) => {
                                item.header ? head = item.header : head = "gtq";
                                return (
                                    <li className="item" key={index} onClick={() => router.push(`/chat/${item._id}/${item.username}`)}>
                                        <div className="head">
                                            <img src={require(`./../../static/images/${head}.png`)} alt="" />
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
                <IndexBottom nowKey={0} history={router} />
            </div>
        );
    }
    async componentDidMount() {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
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

export default Index;