import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from '@/pages/index'

import configStore from '@/store'


import './css/custom-theme.scss'
import './app.scss'
import { wx_auth } from './pages/index/model'

// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools') 
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/my/index/index',
      'pages/clue/index',
      'pages/review/index',
      'pages/achievement/index',
      'pages/project/index',
      'pages/login/index',
      'pages/webview/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FFC041',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },

  }

  componentDidShow() {
    wx.cloud.init({
      env: 'zd-178111110784'
    })
  }
  componentDidHide() { }

  componentDidCatchError() { }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
