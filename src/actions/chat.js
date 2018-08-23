import * as actionTypes from "./../constants/chat";
//引入socket
import io from 'socket.io-client';

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
// 异步action返回一个函数，然后在里面进行相关操作后，可以dispatch另一个action改变相应的值
export const IO = (userid = null) => {

    return dispatch => {
        // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
        if (!io.socket) {
            // 连接服务器, 得到与服务器的连接对象
            io.socket = io('ws://localhost:3009'); // 2. 创建对象之后: 保存对象
        } else {
            // 绑定监听, 接收服务器发送的消息
            if (userid) {
                io.socket.on('receiveMsg', function (chatMsg) {
                    console.log(chatMsg);
                    // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
                    if (userid === chatMsg.from || userid === chatMsg.to) {
                        dispatch(receiveMsg(chatMsg, userid));
                    }
                })
            }
        }
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
}