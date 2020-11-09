// 用于一些保存数据的key
export const store_key = {
    userinfo: 'userinfo',
    wx_jssdk_config: 'wx_jssdk_config'
}

// 用于保存 json 数据
export const store = {
    get(key, type = 'json', store_type = 'localStorage') {
        let val = {};
        try {
            const value = window[store_type].getItem(key);
            val = type === 'json' ? JSON.parse(value || '{}') : value;
        } catch (err) {
            console.log('store get', err)
        }
        if (type === 'json' && val.expires && (new Date() - val.expires > 0)) {
            return {}
        }

        return val;
    },
    set(key, value, type = 'json', store_type = 'localStorage', allnew = false) {
        try {
            if (type === 'json') {
                // 增量，覆盖保存
                let data = !allnew ? store.get(key, type, store_type) : {};
                value = JSON.stringify(Object.assign(data, value));
            }
         
            window[store_type].setItem(key, value)
          
        } catch (e) {
            console.log('store set', e)
        }
    },
    set_new(key, value, type = 'json', store_type = 'localStorage', allnew = true) {
        store.set(key, value, type, store_type, allnew)
    },
    session_get(key, type = 'json', store_type = 'sessionStorage') {
        return store.get(key, type, store_type)
    },
    session_set(key, value, type = 'json', store_type = 'sessionStorage') {
        store.set(key, value, type, store_type)
    },
    session_set_new(key, value, type = 'json', store_type = 'sessionStorage', allnew = true) {
        store.set(key, value, type, store_type, allnew)
    },
}
export default {
    store,
    store_key,
}