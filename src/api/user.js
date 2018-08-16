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