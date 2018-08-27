import React, { Component } from 'react';
import "./message.scss";
import IndexHeader from "./../../components/indexHeader/IndexHeader";
import IndexBottom from "./../../components/indexBottom/IndexBottom";
import { connect } from "react-redux";


const getListMsgs = (chatMsgs, userid) => {
    // 1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id:lastMsg}
    const lastMsgObjs = {};
    chatMsgs.forEach(msg => {
        //对msg进行个体计算
        if (msg.to === userid && !msg.read) {
            msg.unReadCount = 1;
        } else {
            msg.unReadCount = 0;
        }

        // 得到msg的聊天标识id
        const chatId = msg.chat_id;
        // 获取已保存的当前组件的lastMsg
        let lastMsg = lastMsgObjs[chatId];
        // 没有
        if (!lastMsg) { //如果没有当前msg就是lastmsg
            lastMsgObjs[chatId] = msg;
        } else {//有msg
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            // 如果msg比lastMsg晚, 就将msg保存为lastMsg
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg;
            }
            lastMsgObjs[chatId].unReadCount = unReadCount;
        }
    });
    // 2. 得到所有lastMsg的数组
    const lastMsgs = Object.values(lastMsgObjs);
    // 3. 对数组进行排序(按create_time降序)保证展示的是最后一条消息
    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time;
    })
    return lastMsgs;
}


class Message extends Component {
    render() {
        let router = this.props.history;
        let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        const { userData, chatInfo } = this.props.chat;
        // 对chatMsgs按chat_id进行分组
        const lastMsgs = getListMsgs(chatInfo, userInfo._id);
        return (
            <div id="message">
                <IndexHeader titName="消息列表" />
                <div className="msg-list">
                    {
                        lastMsgs.map((item, index) => {
                            // 得到目标用户的id
                            const targetUserId = item.to === userInfo._id ? item.from : item.to;
                            // 得到目标用户的信息
                            const targetUser = userData[targetUserId];
                            return (
                                <div className="list-item" key={index} onClick={() => router.push(`/chat/${targetUserId}/${targetUser.username}`)}>
                                    <div className="avatar">
                                        <img src={targetUser.header ? require(`./../../static/images/${targetUser.header}.png`) : require(`./../../static/images/gtq.png`)} alt="" />
                                    </div>
                                    <div className="msg-desc">
                                        <div className="user-name">{targetUser.username}</div>
                                        <div className="msg-cont">{item.content}</div>
                                    </div>
                                    {
                                        item.unReadCount > 0 ? (<span className="un-read-count">{item.unReadCount}</span>) : ("")
                                    }
                                </div>
                            );
                        })
                    }

                </div>
                <IndexBottom nowKey={1} history={router} unReadCount={this.props.unReadCount} />
            </div>
        );
    }
}

export default connect(
    state => ({ chat: state.chat, unReadCount: state.chat.unReadCount })
)(Message);