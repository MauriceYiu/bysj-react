import * as actionTypes from "./../constants";

const initialState = {
    userData: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
    chatInfo: [], // 当前用户所有相关msg的数组
    unReadCount: 0 // 总的未读数量
};

export default function chat(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RECEIVE_MSG:
            const {
                chatMsg
            } = action.data
            return {
                userData: state.userData,
                chatInfo: [...state.chatInfo, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case actionTypes.RECEIVE_MSG_LIST:
            const {
                userData,
                chatInfo,
                userid
            } = action.data
            return {
                userData,
                chatInfo,
                unReadCount: chatInfo.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
            }
        case actionTypes.MSG_READ:
            const {
                from,
                to,
                count
            } = action.data;
            state.chatInfo.forEach(msg => {
                if (msg.from === from && msg.to === to && !msg.read) { //需要更新
                    msg.read = true;
                }
            });
            return {
                userData: state.userData,
                chatInfo: state.chatInfo.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) { //需要更新
                        return { ...msg,
                            read: true
                        };
                    } else { //不需要
                        return msg;
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state;
    }
}