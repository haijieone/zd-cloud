/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtSteps } from 'taro-ui'
import { connect } from '@tarojs/redux'
import bindActionCreators from '@/store/redux_ext';
import * as actions from './model'
import Css from './index.module.scss';
import { Vmobile } from '../../utils/validate';

const items = [
  { 'title': '基础信息',
    'icon': {
      value: 'iconfont-iconicon_jindu',
      activeColor: '#fff',
      inactiveColor: '#1bc573',
      size: '20',
    }
  },
  { 'title': '患者信息',
    'icon': {
      value: 'iconfont-iconicon_jindu',
      activeColor: '#fff',
      inactiveColor: '#1bc573',
      size: '20',
    }
  },
  { 'title': '筹款内容',
    'icon': {
      value: 'iconfont-iconicon_jindu',
      activeColor: '#fff',
      inactiveColor: '#1bc573',
      size: '20',
    }
  }
]
@connect((state) => ({ state: state.loginReducers }), (dispatch) => bindActionCreators(actions, dispatch))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  config = {
    navigationBarTitleText: '填写信息申请救助'
  }

  componentDidShow() {
    
    
  }

  componentDidHide() { }
  
  render() {

    return (
      <View className={`${Css.login} pt80`}>
        <AtSteps
          items={items}
          current={this.state.current}
          onChange={this.onChange}
        />
      </View>
    )
  }
}

export default Index
