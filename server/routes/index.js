const router = require('koa-router')();
const userModel = require("./../model/user.js");
const md5 = require('blueimp-md5');

const filter = {
  password: 0,
  __v: 0
};

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
    }
  } catch (error) {
    info = error;
  }

  ctx.body = info;
  console.log(ctx.request.body);
});

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

module.exports = router;