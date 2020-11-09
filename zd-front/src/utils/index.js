
import Taro from '@tarojs/taro'
import qs from 'qs'


//请以对象方式使用
export const store = {
    set(key, value) {
        try {
            Taro.setStorageSync(key, value)
        } catch (e) {
            
        }

    },
    get(key) {
        let value = {};
        try {
            value = Taro.getStorageSync(key) || {}
        } catch (e) {
            
        }
        // 是否过期 如果保存了exprise 则检查是否过期
        return value.expires && (value.expires - new Date() < 0) ? {} : value;
    }
}


export const to_fixed = (num = 0, d = 2) => {
    return Number(num).toFixed(d);
}
//格式化成三位显示 1234567-> 1,234,567 只支持整数
export const currency = (money) => {
    const d = money % 1 ? (money + '').replace(/(\.\d+)/g, '$1') : '';
    return to_fixed(money, 0).replace(/(\d)(?=(\d{3})+$)/g, '$1,') + d;
}

//ab test 
// AB的指定  A为现在有的版本，B为新出的版本，C为新出的版本（如果有）
// AB test 生成函数，默认是AB各50%，A为老版本，B为新版本，可以控制B的量，
// 量通过 传入0-9来控制
// 如要给版本切量20%，则 b =[1,9] 则B的量为20% A为80%，
//如果还有C版本 则传入c = [2,6] 则C版本的量为20% B版本20% A版本60%
// b 和 c 中的数字不能重复
export const abtest = (b = [1, 3, 5, 7, 9], c = []) => {
    const test = store.get('abtest') * 1;
    if (c.length) {
        const arr = b.concat(c);
        if (arr.length !== b.length + c.length) {
            return 
        }
    }
    if (b.includes(test)) {
        return 'B';
    }
    if (c.includes(test)) {
        return 'C';
    }
    return 'A'
}


export default {
    currency,
    store,
    qs,
    abtest,
}