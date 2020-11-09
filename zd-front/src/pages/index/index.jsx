/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import utils from '../../utils'
import { AtButton } from 'taro-ui'
import bindActionCreators from '../../store/redux_ext';
import * as actions from './model'
import Css from './index.module.scss'
import img_logo from '../../img/index/logo.png'
import img_line from '../../img/index/line.png'

@connect(({ appReducers }) => ({ appReducers }), (dispatch) => bindActionCreators(actions, dispatch))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      need_auth: true,
    }
  }



  async componentDidMount() {
    this.userLogin()
  }
  async handleWXGetUserInfo(event) {
    if (event.detail.userInfo) {
      this.saveUser(event.detail.userInfo)
    } else {
      return
    }

  }

localSaveUser(res){
  // eslint-disable-next-line import/no-named-as-default-member
  utils.store.set('userinfo', { userInfo: res.result.userInfo })
  Taro.redirectTo({ url: '/pages/my/index/index' })
}
  userLogin = () => {
    wx.cloud.callFunction({
      name: 'userLogin',
    }).then(res => {
      if (res.result.code === 0) {
     this.localSaveUser(res)
      } else {
        Taro.showToast({ title: res.result.msg, icon: 'none' })
      }
    })
  }
  saveUser = (userInfo) => {
    wx.cloud.callFunction({
      name: 'savaUser',
      data: {
        baseUserInfo: userInfo
      }
    }).then(res => {
      if (res.result.code === 0) {
        this.localSaveUser(res)
      } else {
        Taro.showToast({ title: res.result.msg, icon: 'none' })
      }
    })
  }
  config = {
    navigationBarTitleText: '首页'
  }




  componentDidShow() {
    // Taro.hideTabBar();
  }

  componentDidHide() { }
  // componentWillUnmount() { }





  render() {
    return (
      <View className={`${Css.index} pt80`}>
        <View className={`${Css.box} mlr40 radius24 tc c-bg-fff`}>
          <Image src={img_logo} className={`${Css.logo} mt60`} ></Image>
          <View className='fs32'>

            <View className='mt70'>
              <View className='pos-r ib'>
                <View className={` pos-a c-bg-green ib opacity30 ${Css.bg_line}`}></View>
                <Text>高效方便发起</Text>
              </View>
            </View>
            <View className='mt30'>
              <View className='pos-r ib'>
                <View className={` pos-a c-bg-green ib opacity30 ${Css.bg_line}`}></View>
                <Text>线索轻松管理</Text>
              </View>
            </View>
            <View className='mt30'>
              <View className='pos-r ib'>
                <View className={` pos-a c-bg-green ib opacity30 ${Css.bg_line}`}></View>
                <Text>项目实时跟进</Text>
              </View>
            </View>
            <View className='mt30'>
              <View className='pos-r ib'>
                <View className={` pos-a c-bg-green ib opacity30 ${Css.bg_line}`}></View>
                <Text>进度一目了然</Text>
              </View>
            </View>
          </View>
          <Image src={img_line} className={`${Css.line} mt30`} ></Image>
        </View>

        <View className='mlr100 mt80'>
          {this.state.need_auth ?
            <AtButton type='primary' circle className={` ${Css.btn} mlr40 at-button-green at-button-shadow-green `} openType='getUserInfo' onGetUserInfo={this.handleWXGetUserInfo.bind(this)}>授权登录</AtButton>
            :
            <AtButton type='primary' circle className={` ${Css.btn} mlr40 at-button-green at-button-shadow-green `}  >立即登录</AtButton>
          }
        </View>
        <View className={`${Css.tips} pos-f mlr40 c-gray fs24`}><Text className='c-green'>注：</Text>此小程序仅供全职筹款顾问使用，必须授权登录后才能使用内置功能。</View>
      </View>
    )
  }
}

export default Index
