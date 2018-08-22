import React, { Component } from 'react';
import "./chat.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import gtq from "./../../static/images/gtq.png";
import xd from "./../../static/images/xd.png";
import xer from "./../../static/images/xer.png";
import io from 'socket.io-client';

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
                                    <img src={gtq} alt="" />
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
                                    <img src={gtq} alt="" />
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
    send() {
        if(!this.state.content.trim()){
            return;
        }
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        let obj = {
            from: userInfo._id,
            to: this.props.match.params.id,
            content:this.state.content
        }
        io.socket.emit('sendMsg', obj);
    }
    initIO() {
        if (!io.socket) {
            // 连接服务器, 得到与服务器的连接对象
            io.socket = io('ws://localhost:3009');// 2. 创建对象之后: 保存对象
            // 绑定监听, 接收服务器发送的消息
            io.socket.on('receiveMsg', function (chatMsg) {
                // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
                console.log(chatMsg);
            })
        }
    }
    componentDidMount() {
        this.initIO();
    }
}

export default Chat;