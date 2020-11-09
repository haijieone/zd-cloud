// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'zd-178111110784'
})
const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()//获取用户信息
  const allUser = (await userCollection.get()).data
  const [userInfo] = allUser.filter(v => v.openId === wxContext.OPENID)
  if(!userInfo){
    await userCollection.add({
      data: {
        openId: wxContext.OPENID,
        createdTime: db.serverDate(),
        baseUserInfo:event.baseUserInfo||null
      },
    })
    const data={
      code:0,
      msg:'保存用户信息成功',
      userInfo:userInfo.baseUserInfo
    }
    return data
  }else{
    const data={
      code:2001,
      msg:'该用户未授权,请点击授权登录'
    }
    return data
  }
  
}