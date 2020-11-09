import Taro from '@tarojs/taro';
import Config from '../config'
import { store } from './index'
// ajax
const ajax = (method, url = '', data = {}, ext = {}) => {
    // 处理Data
    url = Config.base_url + (ext.base_path === 'no' ? '' : Config.base_path) + url;
    const passport = store.get('passport');
    let _data = {
        client: Config.client,
    }

    Object.assign(data, _data)

    const header = {
        token: passport.token,
        'content-type': ext.content_type || 'application/json; charset=utf-8'
    }

    return new Promise((resolve, reject) => {
        const conf = {
            url,
            data,
            method: method.toUpperCase(),
            header,
        }
        Taro.request(conf).then((res) => {
            // console.log('url=', url)
            // console.log('data=', data)
            // console.log('res', res.data)
            switch (res.data.meta.code) {
                case 'Unauthorized': //未授权
                case 101: // 未登录
                    store.set('passport', { expires: new Date() - 1 * 24 * 60 * 60 }) // 设置存储过期
                    const pages = Taro.getCurrentPages()
                    if ((pages[pages.length - 1] || {}).route !== 'pages/index/index') {
                        Taro.reLaunch({ url: '/pages/index/index?login=' + res.data.meta.code });
                    }
                    resolve(res.data)
                    break;
                default:
                    resolve(res.data)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

export const ErrorCode = {
    succ: 'SUCCESS'
}


export default {
    post: (url, data, ext) => (ajax('post', url, data, ext)),
    get: (url, data, ext) => (ajax('get', url, data, ext))
}