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
        default:
            return state;
    }
}