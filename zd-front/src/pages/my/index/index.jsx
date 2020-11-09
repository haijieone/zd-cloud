/* eslint-disable taro/this-props-function */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtAvatar, AtList, AtListItem, AtGrid } from 'taro-ui'
import { connect } from '@tarojs/redux'
import bindActionCreators from '@/store/redux_ext';
import { NavBar } from '@/components';
import * as actions from './model'

import Css from './index.module.scss';
import utils from '@/utils'

@connect((state) => ({ state: state.loginReducers }), (dispatch) => bindActionCreators(actions, dispatch))
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      userinfo: {}
    }
  }

  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: '我的'
  }
  componentDidShow() {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      userinfo: utils.store.get('userinfo').userInfo
    })
  }

  componentDidHide() { }

  render() {
    const { userinfo } = this.state;
    return (
      <View className={`${Css.my} pb30`}>
        <View className={`${Css['mine_top']}`}>
          <View className={`${Css['mine-avatar']}`}><AtAvatar circle image={userinfo.avatarUrl} size='large'></AtAvatar></View>
          <View className={`${Css['']} tc mt30 c-333 fs32`}>{userinfo.nickName}</View>
          <View className='at-row at-row_align--center mt40'>
            <View className='at-col tc c-4D5053 fs36 '><View className='fw-5 ff-dab'>1</View><View className='c-999 fs30 pt10'>已连续打卡</View></View>
            <View className='at-col tc c-4D5053 fs36 '><View className='fw-5 ff-dab'>1</View><View className='c-999 fs30 pt10'>总记账天数</View></View>
            <View className='at-col tc c-4D5053 fs36 '><View className='fw-5 ff-dab'>1</View><View className='c-999 fs30 pt10'>总记账笔数</View></View>
          </View>
        </View>
        <View className='c-bg-fff mt30'>
          <AtGrid data={
            [
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                value: '领取中心'
              },
              {
                image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                value: '找折扣'
              },
              {
                image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                value: '领会员'
              },
              {
                image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                value: '新品首发'
              },
              {
                image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                value: '领京豆'
              },
              {
                image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                value: '手机馆'
              }
            ]
          }
          />
        </View>
        <View className='mt30'>
          <AtList>
            <AtListItem
              title='类别设置'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            />
            <AtListItem
              title='标题文字'
              note='描述信息'
              arrow='right'
              thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
            />
          </AtList>
        </View>
        <NavBar current='my'></NavBar>
      </View>
    )
  }
}

export default Index
