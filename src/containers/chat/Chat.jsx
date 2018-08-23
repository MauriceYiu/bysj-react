import React, { Component } from 'react';
import "./chat.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import { connect } from 'react-redux';
import { IO, sendMsg } from "./../../actions/chat";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
        this.send = this.send.bind(this);
    }
    render() {
        const { toName } = this.props.match.params;
        return (
            <div id="chat">
                <IndexHeader history={this.props.history} titName={toName} isShowBack={true} />
                <div className="msg">
                    <div className="from">
                        <ul>
                            <li>
                                <div className="head">
                                    <img src={require(`./../../static/images/gtq.png`)} alt="" />
                                </div>
                                <div className="msg">
                                    <p className="msg-info">
                                        这里是文字内容
                                </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="to">
                        <ul>
                            <li>
                                <div className="msg">
                                    <p className="msg-info">
                                        这里是文字内容
                                </p>
                                </div>
                                <div className="head">
                                    <img src={require(`./../../static/images/gtq.png`)} alt="" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="send-input">
                    <input type="text" onChange={(e) => this.setState({ content: e.target.value })} placeholder="请输入消息内容..." name="sendMsg" />
                    <button onClick={this.send}>发送</button>
                </div>
            </div>
        );
    }
    async send() {
        if (!this.state.content.trim()) {
            return;
        }
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let obj = {
            from: userInfo._id,
            to: this.props.match.params.id,
            content: this.state.content
        }
        await this.props.IO(userInfo._id);
        await this.props.sendMsg(obj);
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default connect(
    state => ({ msgData: state.chat }),
    { IO, sendMsg }
)(Chat);