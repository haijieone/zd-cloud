
import Taro from '@tarojs/taro'
import { reducers, reducers_change } from '../../reducers/reducers'
import ajax, { ErrorCode } from '../../utils/ajax'
import { store } from '../../utils'


//短信
export const send_sms = (data) => async () => {
    const res = await ajax.post('/sms/safe-code', { ...data })

    if (res.meta.code === ErrorCode.succ) {
        Taro.showToast({ title: '短信已发送', icon: 'none' })
        return res.data
    }
    Taro.showToast({ title: res.meta.msg, icon: 'none' })
}
//绑定手机号
export const bind_mobile = (data) => async () => {
    let passport = store.get('passport')
    const res = await ajax.post('/passport/sign-in', { ...data, oauth_flag: passport.oauth_flag })
    if (res.meta.code === ErrorCode.succ) {
        passport = Object.assign(passport, res.data)
        store.set('passport', passport)
        return passport
    }

    Taro.showToast({ title: res.meta.msg, icon: 'none' })
}


const INITIAL_STATE = {
    login: 'hello'
}

export default function (state = INITIAL_STATE, action) {
    return reducers(state, action)
}