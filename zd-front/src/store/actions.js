import Taro from '@tarojs/taro'
import ajax, { ErrorCode } from '../utils/ajax'
import { store } from '../utils'
import config from '../config'

//获取用户基础信息
export const act_get_userinfo_ajax = async () => {
    const res = await ajax.post('/passport/user', {}, { repeat_req: true, no_req_token: true, not_check_auth: true, not_check_login: true });
    let passport = store.get('passport');
    if (res.meta.code === ErrorCode.succ) {
        passport = { ...passport, ...res.data }
        store.set('passport', passport)
        return res.passport
    }
    return {}

}


//获取用户基础信息
export const act_get_userinfo = () => async () => {
    return await act_get_userinfo_ajax()
}

//微信授权
export const act_wx_login = () => async (dispatch) => {
    let passport = store.get('passport') || {};
    if (passport.Q === 3) {
        passport = await dispatch(act_get_userinfo({ from: 'login' }))
        Taro.showTabBar();
        return passport;// 已登录
    }
    const res_login = await Taro.login();
    if (res_login.errMsg !== 'login:ok') {
        return false
    }
    const userinfos = await Taro.getUserInfo()
    if (!userinfos) { return false }
    const { rawData, signature, encryptedData, iv } = userinfos

    const res = await ajax.post('/passport/oauth', {
        app_id: config.app_id,
        platform: 'mp',
        code: res_login.code,
        raw_data: rawData,
        signature,
        encrypted_data: encryptedData,
        iv,
    })
    if (res.meta.code === ErrorCode.succ) {
        passport = Object.assign(passport, { expires: res.data.token_expire_in * 1000 }, res.data);
        store.set('passport', passport)
        // 已登录，获取用户信息
        if (res.data.token) {
            passport = await dispatch(act_get_userinfo({ from: 'auth' }))
            Taro.showTabBar();
        }
        return passport
    }

}
