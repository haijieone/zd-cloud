/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import bindActionCreators from '../../store/redux_ext';

import { BdSendSms } from './../../components';
import * as actions from './model'

import Css from './login.module.scss';
import './index.scss'
import { Vmobile } from '../../utils/validate';

@connect((state) => ({ state: state.loginReducers }), (dispatch) => bindActionCreators(actions, dispatch))
class Index extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.send_sms = this.send_sms.bind(this)
    this.state = {
      mobile: '',
      sms: '',
    }
  }

  config = {
    navigationBarTitleText: '绑定手机号'
  }



  componentDidShow() {
    
    
  }

  componentDidHide() { }
  //
  change(val, e) {
    const state = {}
    state[e.target.id] = val
    this.setState(state)
  }
  async bind_mobile() {
    const mobile = Vmobile(this.state.mobile)
    if (mobile.code !== 999) {
      return Taro.showToast({ title: mobile.msg, icon: 'none' })
    }
    if (!this.state.sms) {
      return Taro.showToast({ title: '请输入验证码', icon: 'none' })
    }
    const res = await this.props.bind_mobile({ phone: mobile.norVal, safe_code: this.state.sms })
    
  }
  send_sms(phone) {
    this.props.send_sms({ phone, channel: 'bd' })
  }
  // componentWillUnmount() { }
  render() {

    return (
      <View className={`${Css.login} pt80`}>
        <View className='pl80 c-fff ff-pfm fs56'><Text>360大病筹</Text></View>
        <View className={`${Css.box} mlr40 radius24 mt40 ptb80 tc c-bg-fff`}>
          <AtInput type='phone' name='mobile' placeholder='请输入手机号' onChange={this.change} value={this.state.mobile} className={`${Css.ipt} mlr40 tl`}  ></AtInput>
          <AtInput type='text' name='sms' maxLength='4' placeholder='请输入验证码' onChange={this.change} value={this.state.sms} className={`${Css.ipt} mlr40 tl`} ><BdSendSms mobile={this.state.mobile} onSend={this.send_sms} /></AtInput>
          <AtButton type='primary' circle className={` ${Css.btn} mlr40 mt80 at-button-green`} onClick={this.bind_mobile.bind(this)}  >立即绑定</AtButton>
        </View>

      </View>
    )
  }
}

export default Index
