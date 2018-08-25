import React, { Component } from 'react';
import "./chat.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import { connect } from 'react-redux';
import { sendMsg } from "./../../actions";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            userData: {},
            userInfo: {}
        };
        this.send = this.send.bind(this);
    }
    render() {
        const { toName, id } = this.props.match.params;
        let { userInfo } = this.state;
        let { chatInfo, userData } = this.props.msgData;

        const chatId = [userInfo._id, id].sort().join('_'); //创建当前会话的Id标识

        chatInfo = chatInfo.filter(msg => msg.chat_id === chatId);
        return (
            <div id="chat">
                <IndexHeader history={this.props.history} titName={toName} isShowBack={true} />
                <div className="msg" ref={e => this.msgWrap = e}>

                    {
                        chatInfo.map((item, index) => {
                            return (
                                <div className={item.from === id ? "from" : "to"} key={index}>
                                    <div className="item-wrap">
                                        <div className="item-cont">
                                            <div className="head">
                                                <img
                                                    src={item.from === id ?
                                                        require(`./../../static/images/${userData[item.from]['header']}.png`)
                                                        : require(`./../../static/images/${userInfo['header']}.png`)} alt="" />
                                            </div>
                                            <div className="msg">
                                                <p className="msg-info">{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="send-input">
                    <input type="text" ref={e => this.msg = e} onChange={(e) => this.setState({ content: e.target.value })} placeholder="请输入消息内容..." name="sendMsg" />
                    <button onClick={this.send}>发送</button>
                </div>
            </div>
        );
    }
    async send() {
        if (!this.state.content.trim()) {
            return;
        }

        let obj = {
            from: this.state.userInfo._id,
            to: this.props.match.params.id,
            content: this.state.content
        }

        await this.props.sendMsg(obj);

        let msgInfo = this.state.msgInfo;
        msgInfo.push(obj);
        this.setState({
            msgInfo,
            content: ""
        });
        this.msg.value = "";
    }
    async componentDidMount() {
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        this.setState({
            userInfo
        });
    }
    componentDidUpdate() {
        // 初始显示列表
        this.msgWrap.scrollTo(0, this.msgWrap.scrollHeight);
        console.log(this.props.msgData)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}

export default connect(
    state => ({ msgData: state.chat }),
    { sendMsg }
)(Chat);