import instance from './index';

// 登录Api
export const login = (userInfo) => {
    return instance({
        url: "login",
        method: "POST",
        data: userInfo
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}
// 注册
export const register = (userInfo) => {
    return instance({
        url: "register",
        method: "POST",
        data: userInfo
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}
// 完善用户信息
export const update = (userInfo) => {
    return instance({
        url: "update",
        method: "POST",
        data: userInfo
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}
// 获取用户列表
export const userList = (type) => {
    return instance({
        url: "userlist",
        method: "GET",
        params: {
            type
        }
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}

// 获取消息列表
export const msgList = (userid) => {
    return instance({
        url: "msglist",
        method: "GET",
        params:{
            userid
        }
    }).then(res => {
        if (res) {
            try {
                if (res.status === 200) {
                    return Promise.resolve(res.data);
                }
            } catch (error) {
                return Promise.reject(error);
            }
        }
    });
}