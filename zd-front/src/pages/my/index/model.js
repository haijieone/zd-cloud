
import Taro from '@tarojs/taro'
import { reducers } from '@/reducers/reducers'
import ajax, { ErrorCode } from '@/utils/ajax'
import { store } from '@/utils'



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