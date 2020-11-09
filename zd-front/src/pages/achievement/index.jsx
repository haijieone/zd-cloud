/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { connect } from '@tarojs/redux'
import bindActionCreators from '@/store/redux_ext';
import { NavBar } from '@/components';
import * as actions from './model'
const emptyImg = require('@/img/empty.png')
import Css from './clue.module.scss';

@connect((state) => ({ state: state.loginReducers }), (dispatch) => bindActionCreators(actions, dispatch))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  config = {
    navigationBarTitleText: '项目'
  }



  componentDidShow() {
  }

  componentDidHide() { }
  
  render() {
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
    return (
      <View className="container-pages c-bg-page">
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick}>
        <AtTabsPane current={this.state.current} index={0} >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
        <NavBar current="achievement"></NavBar>
      </View>
    )
  }
}

export default Index
