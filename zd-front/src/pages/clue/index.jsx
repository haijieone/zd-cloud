/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import bindActionCreators from '@/store/redux_ext';
import { NavBar } from '@/components';
import * as actions from './model'
import Css from './clue.module.scss';

const emptyImg = require('@/img/empty.png')

let i = 1;

@connect((state) => ({ state: state.loginReducers }), (dispatch) => bindActionCreators(actions, dispatch))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list:[
        {}
      ]
    }
  }

  config = {
    navigationBarTitleText: '线索',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
    onReachBottomDistance: 120,
  }



  componentDidShow() {
  }

  componentDidHide() { }
  // onScrollToUpper = () => {
  //   
  // }
  // onScroll = () => {
  //   
  // }
  onPullDownRefresh = () => {
    
  }

  onReachBottom = () => {
    
  }

  render() {

    return (
      <View className={`${Css['container-pages']}`}>
        {list.length <= 0 ? null :
          <View className={`ff-pfm pos-f w100 t0 ${Css['table']} ${Css['header']} tc`}>
            <View className='at-col'>用户</View>
            <View className='at-col'>扫码时间</View>
            <View className='at-col'>手机号码</View>
            <View className='at-col'>操作</View>
          </View>
        }
        <View className={`${Css['empty']} fs30 fw-4 tc`}>
            <Image className={`${Css['empty-img']}`} src={emptyImg} alt=''></Image>
            <View className='pb20'>- opps~空空如也 -</View>
            <View>快去【我的】—【我的专属发起二维码】</View>
            <View>邀请发起项目吧</View>
        </View>
        {/* <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop={0}
          style={{height: '150px'}}
          lowerThreshold={20}
          upperThreshold={20}
          onScrollToUpper={this.onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
          onScroll={this.onScroll}
        >
          <View className={`${Css['empty']} fs30 fw-4 tc`}>
            <Image className={`${Css['empty-img']}`} src={emptyImg} alt=""></Image>
            <View className="pb20">- opps~空空如也 -</View>
            <View>快去【我的】—【我的专属发起二维码】</View>
            <View>邀请发起项目吧</View>
          </View>
          <View className={`${Css['empty']} fs30 fw-4 tc`}>
              <Image className={`${Css['empty-img']}`} src={emptyImg} alt=""></Image>
              <View className="pb20">- opps~空空如也 -</View>
              <View>快去【我的】—【我的专属发起二维码】</View>
              <View>邀请发起项目吧</View>
          </View>
          <View className={`${Css['empty']} fs30 fw-4 tc`}>
              <Image className={`${Css['empty-img']}`} src={emptyImg} alt=""></Image>
              <View className="pb20">- opps~空空如也 -</View>
              <View>快去【我的】—【我的专属发起二维码】</View>
              <View>邀请发起项目吧</View>
          </View>
        </ScrollView> */}
        {/* <HzListView
          renderRow={(a, b, c) => { return this.row(a, b, c) }}
          getData={this.getTableData.bind(this)}
          needRefresh={this.state.is_need_refresh}
          empty_content={<div className="empty fs30 fw-4 tc">
            <img src={emptyImg} alt=""></img>
            <div className="pb20">- opps~空空如也 -</div>
            <div>快去【我的】—【我的专属发起二维码】</div>
            <div>邀请发起项目吧</div>
          </div>}
        ></HzListView>      */}
          <View className={`${Css['remote_initiation']} pos-f r0 c-bg-fff jusjutify ${Css['show_all_text']} `} onClick={this.remote_initiation} ref='touchs' >
            <View className='pl20 flex'>
              <Text className={`${Css['remote_initiation_text']} fs28 ff-pfr`}>远程发起</Text>
            </View>
          </View>
          {/* 公告弹窗 */}
          {/* <Notice onPop={this.on_pop} onClosePop={this.on_close_pop}></Notice> */}
        <NavBar current='clue'></NavBar>
      </View>
    )
  }
}

export default Index
