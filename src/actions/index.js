import * as actionTypes from "../constants";
//引入socket
import io from 'socket.io-client';
import * as userApi from "../api/user";

// 接收错误
export const receiveErr = (info) => {
    return {
        type: actionTypes.RECEIVE_ERR,
        data: info
    }
}

// 成功
export const authSuccess = (info) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: info
    }
}



// 接收消息
export const receiveMsg = (chatMsg, userid) => {
    return {
        type: actionTypes.RECEIVE_MSG,
        data: {
            chatMsg,
            userid
        }
    }
}

// 接收消息列表
export const receiveMsgList = ({
    userData,
    chatInfo,
    userid
}) => {
    return {
        type: actionTypes.RECEIVE_MSG_LIST,
        data: {
            userData,
            chatInfo,
            userid
        }
    }
};

// 异步action返回一个函数，然后在里面进行相关操作后，可以dispatch另一个action改变相应的值
const initIO = (dispatch, userid) => {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if (!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:3009'); // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid));
            }
        })
    }

}


//异步获取消息列表
const getMsgList = async (dispatch, userid) => {
    initIO(dispatch, userid);
    const res = await userApi.msgList(userid);
    if (res.code === 0) {
        const {
            userData,
            chatInfo
        } = res.data;
        //分发同步action
        dispatch(receiveMsgList({
            userData,
            chatInfo,
            userid
        }));
    }
}


//发送消息的异步action
export const sendMsg = ({
    from,
    to,
    content
}) => {
    return dispatch => {
        console.log('客户端向服务器发送消息', {
            from,
            to,
            content
        });
        io.socket.emit('sendMsg', {
            from,
            to,
            content
        });
    }
};

// 登录方法
export const login = (userInfo) => {
    return async (dispatch) => {
        let res = await userApi.login(userInfo);
        if (res.code === 1) {
            dispatch(receiveErr(res));
        } else {
            dispatch(authSuccess(res));
            getMsgList(dispatch, res.data._id);
        }
    }
}


// storage中有用户信息即登录成功，更新消息列表
export const updateMsgList = (userInfo) => {
    return async (dispatch) => {
        await getMsgList(dispatch, userInfo._id);
    }
}