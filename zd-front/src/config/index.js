// 常用配置

const app_id = "wx155677540636112b"; //appid
const site_name = '360大病筹'
const is_production = process.env.NODE_ENV === 'production';
//api url
const dev_url = 'https://gateway-v1-test.360huzhubao.com'; // 接口地址
const pro_url = 'https://gateway-v1.360huzhubao.com'; // 线上接口地址
const base_path = ""; //接口 共用路径 
const h5_url = is_production ? 'https://chou2.360huzhubao.com' : 'http://test.chou.nicaifup2p.com/';

const base_url = is_production ? pro_url : dev_url;
const Client = {
    weapp: 'weixin_mini',
    swan: 'baidu_mini',
    alipay: 'alipay_mini',
    h5: 'h5',
    rn: 'rn',
    tt: 'toutiao_mini',
}
const client = Client[process.env.TARO_ENV];
// 目前有 weapp / swan / alipay / h5 / rn / tt 六个取值

export default {
    app_id,
    site_name,
    base_url,
    base_path,
    client,
    h5_url,
}