const router = require('koa-router')();
const userModel = require("./../model/user");
const chatModel = require("./../model/chat");
const md5 = require('blueimp-md5');

const filter = {
  password: 0,
  __v: 0
};

// 登录

router.post('/login', async (ctx) => {
  const {
    username,
    password
  } = ctx.request.body;
  let info; //回传数据信息
  try {
    let res = await userModel.findOne({
      username,
      password: md5(password)
    }, filter);
    if (!res) {
      info = {
        code: 1,
        data: null,
        msg: "用户名或密码错误"
      }
    } else {
      info = {
        code: 0,
        data: res,
        msg: "登录成功"
      }
      ctx.cookies.set(
        'userid', res._id, {
          maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
        }
      );
    }
  } catch (error) {
    info = error;
  }

  ctx.body = info;
  console.log(ctx.request.body);
});


//注册 

router.post('/register', async (ctx) => {
  const {
    username,
    password,
    type
  } = ctx.request.body;
  let info; //回传数据信息
  try {
    let res = await userModel.findOne({
      username
    });
    if (res) {
      info = {
        code: 1,
        msg: "用户名已被注册",
        data: null
      }
    } else {
      let registerUserRes = await new userModel({
        username,
        type,
        password: md5(password)
      }).save();
      if (registerUserRes) {
        ctx.cookies.set(
          'userid', registerUserRes._id, {
            maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
          }
        );
        info = {
          code: 0,
          msg: "注册成功",
          data: {
            _id: registerUserRes._id,
            username,
            type
          }
        }

      } else {
        info = {
          code: 1,
          msg: "注册失败",
          data: null
        }
      }

    }
  } catch (error) {
    info = error;
  }


  ctx.body = info;
  console.log(ctx.request.body);
});

// 完善用户信息

router.post('/update', async (ctx) => {
  // 得到请求cookie的userid
  const userid = ctx.cookies.get('userid');
  const user = ctx.request.body;
  console.log(userid);
  let info;
  if (!userid) {
    info = {
      code: 1,
      msg: "用户未登录",
      data: null
    }
  } else {
    try {
      let res = await userModel.findByIdAndUpdate({
        _id: userid
      }, user);
      if (!res) {
        info = {
          code: 1,
          data: null,
          msg: "请登录"
        }
        ctx.cookies.set(
          'userid', "", {
            maxAge: 2 * 60 * 60 * 1000, // cookie有效时长
          }
        );
      } else {
        // 准备一个返回的user数据对象
        const {
          _id,
          username,
          type
        } = res;
        const data = Object.assign({
          _id,
          username,
          type
        }, user);
        info = {
          code: 0,
          data: data,
          msg: "登录成功"
        }
      }
    } catch (error) {
      info = error;
    }
  }
  ctx.body = info;
});
router.get('/userlist', async (ctx) => {
  const {
    type
  } = ctx.request.query;
  let info;
  try {
    let res = await userModel.find({
      type
    });
    if (res) {
      info = {
        code: 0,
        data: res,
        msg: "获取成功"
      };
    } else {
      info = {
        code: 1,
        data: null,
        msg: "暂无数据"
      };
    }
  } catch (error) {
    info = error;
  }
  ctx.body = info;
});

//获取消息列表
router.get('/msglist', async (ctx) => {
  const {
    userid
  } = ctx.request.query;
  let info; //回传数据信息
  try {
    let res = await userModel.find();
    if (res) {
      const userData = res.reduce((users, user) => {
        users[user._id] = {
          username: user.username,
          header: user.header
        };
        return users;
      }, {});
      let chatInfo = await chatModel.find({
        '$or': [{
          from: userid
        }, {
          to: userid
        }]
      }, filter);
      info = {
        code: 0,
        msg: "success",
        data: {
          chatInfo,
          userData
        }
      }
    } else {
      info = {
        code: 1,
        msg: "暂无数据",
        data: null
      }
    }
  } catch (error) {
    info = error;
  }

  ctx.body = info;
});

module.exports = router;