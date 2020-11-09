/**
 * 检验工具
 */
import utils from './index'

const trim = (str) => {
  return (str + '').replace(/(^\s+)|(\s+$)/g, '');
}

export const Vmobile = (content = '', options = {}) => {
  content = trim(content)
  // 为999时表示检查通过
  let code = 999;
  let operator = {};
  let msg = {
    '1': '请输入手机号码',
    '2': '请输入正确的手机号码',
    '3': '手机号码只能是数字'
  };
  msg = Object.assign(msg, options.msg);

  let content2 = content.replace(/\D/g, '');
  let val = content.replace(/\s/g, '');
  let reg = /^1[^012]\d{9}$/gi;
  if (val) {
    if (content2 !== val) {
      code = 3;
    } else if (!reg.test(val)) {
      code = 2;
    }
  } else {
    code = 1;
  }
  // 格式化
  if (typeof options.format === 'undefined' || options.format) {
    val = val.replace(/((^\d{3})|(\d{4}))(?=\d)/g, '$1 ').replace(/^\s+|\s+$/g, '');
  }
  return {
    code,
    msg: msg[`${code}`] || '',
    operator,
    val,
    norVal: val.replace(/\s/g, '')
  };
};
export const Vphone = (content = '', options = {}) => {
  content = trim(content)
  // 为999时表示检查通过
  let code = 999;
  let operator = {};
  let msg = {
    '1': '请输入电话号码',
    '2': '请输入正确的电话号码',
    '3': '电话号码只能是数字'
  };
  msg = Object.assign(msg, options.msg);

  let content2 = content.replace(/\D/g, '');
  let val = content.replace(/\s/g, '');
  let reg = /^\d{3,4}(-?)\d{7,8}$/gi;
  if (val) {
    if (content2 !== val) {
      code = 3;
    } else if (!reg.test(val)) {
      code = 2;
    }
  } else {
    code = 1;
  }
  // 格式化
  if (typeof options.format === 'undefined' || options.format) {
    // val = val.replace(/((^\d{3})|(\d{4}))(?=\d)/g, '$1 ').replace(/^\s+|\s+$/g, '');
  }
  return {
    code,
    msg: msg[`${code}`] || '',
    operator,
    val,
    norVal: val.replace(/\s/g, '')
  };
};
// 真实姓名,必须为中文
export const Vrealname = (content = '', options = {}) => {
  content = trim(content)
  // 为999时表示检查通过
  let code = 999;
  let msg = '';
  let val = '';

  msg = {
    '1': '请输入真实姓名',
    '2': '请输入正确的真实姓名',
    '3': '真实姓名只能是汉字'
  };
  msg = Object.assign(msg, options.msg);
  // https://mothereff.in/regexpu#input=const+regex+=+/%5Cp%7BUnified_Ideograph%7D/u;&unicodePropertyEscape=1
  // /\p{Unified_Ideograph}/u  // ES2015+
  // (?:[\u3400-\u4DB5\u4E00-\u9FEF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])
  // \u2022=•
  // eslint-disable-next-line no-useless-escape
  const reg_han = /(?:[\u3400-\u4DB5\u4E00-\u9FEF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|[\.\·\u2022\u00B7\u2981\u2B1D\u2e31\uff65\s])/gi
  let content2 = content.toLowerCase().replace(reg_han, '');
  val = content.toLowerCase()//.replace(/\s/g, '');
  // eslint-disable-next-line no-useless-escape
  let reg = /^(?:[\u3400-\u4DB5\u4E00-\u9FEF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]){2,}(|[\.\·\u2022\u00B7\u2981\u2B1D\u2e31\uff65](?:[\u3400-\u4DB5\u4E00-\u9FEF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+)+$/gi;
  if (val) {
    if (content2) {
      code = 3;
    } else if (!reg.test(val) || val.length < 2) {
      code = 2;
    }
  } else {
    code = 1;
  }
  return {
    code,
    msg: msg[`${code}`] || '',
    val,
    norVal: val
  };
};

// 身份证V
export const Videntity = (content = '', options = {}) => {
  content = trim(content)
  // 为999时表示检查通过
  let code = 999;
  let msg = '';
  let val = '';
  msg = {
    '1': '请输入18位身份证号码',
    '2': '请输入正确的身份证号码',
    '3': '请输入真实身份证号',
    '4': '未满18周岁',
    '5': '身份证号码只能是数字或以X结果'
  };
  msg = Object.assign(msg, options.msg);

  function chk_ident_last(num) {
    let sum = 0;
    let w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    let chk = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];
    for (let i = 0; i < 17; i++) {
      sum += num[i] * w[i];
    }
    return chk[sum % 11] === num[17];
  }

  let content2 = trim(content).toLowerCase().replace(/[^\dx]/gi, '');
  val = content.toLowerCase().replace(/\s/gi, '');
  let val_show = content.toLowerCase()
  let reg = /^\d{17}[\dx]$/gi;
  if (val) {
    if (content2 !== val) {
      code = 5;
    } else if (reg.test(val)) {
      // 是否符合身份证规则
      if (!chk_ident_last(val)) {
        code = 3;
      } else {
        // 是否满18周岁
        if (options.age) {
          msg['4'] = msg['4'].replace('18', options.age);
          let age = options.age
          let now = new Date();
          let year = now.getFullYear() - val.substring(6, 10);
          let month = now.getMonth() + 1 - val.substring(10, 12);
          let day = now.getDate() - val.substring(12, 14);
          if (year < age || (year === age && month < 0) || (year === age && month > 0 && day < 0)) {
            code = 4;
          }
        }
      }
    } else {
      code = 2;
    }
  } else {
    code = 1;
  }
  // 格式化
  if (typeof options.format === 'undefined' || options.format) {
    val = val.replace(/((^\d{6})|(\d{8}))(?=\d)/g, '$1 ').replace(/^\s+|\s+$/g, '');
    val_show = val;
  }
  return {
    code,
    msg: msg[`${code}`] || '',
    val: val_show,
    norVal: val.replace(/\s/g, '')
  };
};
// 标准卡
export const Vcard = (content = '', options = {}) => {
  content = trim(content)
  // 为999时表示检查通过
  let code = 999;
  let operator = {};
  let msg = {
    '1': '请输入银行卡号',
    '2': '请输入正确的银行卡号',
    '3': '银行卡号只能是数字'
  };
  msg = Object.assign(msg, options.msg);

  // Luhn algorithm
  // function check(ccNumber) {
  //     let sum = 0;
  //     let alternate = false;
  //     for (let i = ccNumber.length() - 1; i >= 0; i--) {
  //         let n = ccNumber.substring(i, i + 1);
  //         if (alternate) {
  //             n *= 2;
  //             if (n > 9) {
  //                 n = (n % 10) + 1;
  //             }
  //         }
  //         sum += n;
  //         alternate = !alternate;
  //     }
  //     return (sum % 10 == 0);
  // }
  let content2 = content.replace(/\D/g, '');
  let val = content.replace(/\s/g, '');
  let reg = /^\d{13,19}$/gi;
  if (options.no_iso) { //非标，对公户等
    reg = /^\d{13,50}$/gi;
  }
  if (val) {
    if (content2 !== val) {
      code = 3;
    } else if (!reg.test(val)) {
      code = 2;
    }
  } else {
    code = 1;
  }
  // 格式化
  if (typeof options.format === 'undefined' || options.format) {
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ').replace(/^\s+|\s+$/g, '');
  }

  return {
    code,
    msg: msg[`${code}`] || '',
    operator,
    val,
    norVal: val.replace(/\s/g, '')
  };
};
// 金额
export const Vnumber = (content = '', options = {}) => {
  content = trim(content)
  // 为999时表示检查通过
  let code = 999;
  let max = options.max || Number.MAX_SAFE_INTEGER;
  let min = options.min || 1
  let operator = {};
  let msg = {
    '1': '请输入内容',
    '2': '不能小于' + min + '',
    '3': '不能大于' + max + '',
    '4': '只多只支持' + options.decimal + '位小数',
  };
  msg = Object.assign(msg, options.msg);

  let val = content.replace(/\D/g, '').replace(/^0+/g, '0');
  let is_pass = true;
  if (options.decimal) {
    val = content.replace(/[^0-9.]/g, '').replace(/^0+/g, '0').replace(/\.+/g, '.');
    if (val.indexOf('.') !== val.lastIndexOf('.')) {
      val = val.replace(/\.$/g, '')
    }
    const reg = new RegExp('^\\d+(\\.\\d{0,' + options.decimal + '})?$', 'g')
    is_pass = reg.test(val);
  } else if (val) {
    val = val * 1 + '';
  }

  if (val) {
    if (options.is_str !== true) {
      if (val < min) {
        code = 2;
      } else if (val > max) {
        code = 3
      } else if (!is_pass) {
        code = 4;
      }
    }
  } else {
    code = 1;
  }
  let norVal = val
  // 格式化
  if (options.format) {
    val = utils.currency(val)
    val = val * 1 === 0 ? '' : val
  }

  return {
    code,
    msg: msg[`${code}`] || '',
    operator,
    val,
    norVal,
  };
};
export default {
  Vmobile,
  Vphone,
  Vrealname,
  Videntity,
  Vcard,
  Vnumber,
};
