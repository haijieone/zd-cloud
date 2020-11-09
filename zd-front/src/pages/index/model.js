
import Taro from '@tarojs/taro'
import { reducers, reducers_change } from '../../reducers/reducers'
import { act_wx_login } from '../../store/actions'
import ajax, { ErrorCode } from '../../utils/ajax'
import { store } from '../../utils'


export const send_sms = (data) => async (dispatch, getState) => {
    
    const res = await ajax.post('/patient/province_city', { ...data })
    if (res.errno === ErrorCode) {
        return res.data
    }
    Taro.showToast({ text: res.errmsg, icon: 'none' })
}

//授权
export const wx_auth = () => async (dispatch) => {
    return await dispatch(act_wx_login())
}
//更新用户信息
export const update_userinfo = (data) => async (dispatch) => {
    const res = await ajax.post('/patient/province_city', { ...data })
    if (res.errno === ErrorCode) {
        return res.data
    }
    Taro.showToast({ text: res.errmsg, icon: 'none' })
}


const INITIAL_STATE = {
    num: 0
}

export default function (state = INITIAL_STATE, action) {
    
    return reducers(state, action)
}