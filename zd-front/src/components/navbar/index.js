import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { View } from '@tarojs/components'
import Css from './index.module.scss';
// 底部导航
export default class NavBar extends Component {
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props)
    // this.userinfo = utils.get_volunteer_userinfo();
    // let permission = utils.get_volunteer_userinfo().permission
    let nav_data = [
      { 
        key: 'clue', 
        title: '线索', 
        iconPrefixClass:'iconfont', 
        iconType: 'tab_xiansuo',
        url: '/pages/clue/index',
        ck_log: 'bdsystem_clue_click'
      },
      { 
        key: 'project',
        title: '项目', 
        iconPrefixClass:'iconfont', 
        iconType: 'icontab_xiangmu',
        url: '/pages/project/index',
        ck_log: 'bdsystem_project_click'
      },
      {
        key: 'achievement',
        title: '业绩',
        iconPrefixClass:'iconfont', 
        iconType: 'yeji_xuanzhongzhuangtai',
        url: '/pages/achievement/index',
      },
      { 
        key: 'my',
        title: '我的', 
        iconPrefixClass:'iconfont', 
        iconType: 'tab_wode',
        url: '/pages/my/index/index',
        ck_log: 'bdsystem_mine_clikc'
      },]
    // if (permission && permission.indexOf('audit') > -1) {
    //   nav_data.splice(1, 0, { 
    //     key: 'review',
    //     title: '审核', 
    //     iconPrefixClass:'iconfont', 
    //     iconType: 'shenhe',
    //     url: '/volunteer/review',
    //     ck_log: 'bdsystem_audit_clikc'
    //   })
    // }
    // if (this.userinfo.position === 1 || this.userinfo.position === 4 || this.userinfo.position === 0) {
    //   nav_data.map((item, index) => {
    //     if (item.key === 'achievement') {
    //       nav_data.splice(index, 1)
    //     }
    //   })
    // }
    this.state = {
      nav_data: nav_data,
    }
  }

  async componentDidMount() {
    // 调取个人信息接口
    // await this.props.get_profile()
    // let state = {}
    // let permission = utils.get_volunteer_userinfo().permission
    // if(permission && permission.indexOf('audit') <= -1){
    //   let nav_data = this.state.nav_data
    //   nav_data.splice(2,1)
    //   this.setState({
    //     nav_data:nav_data
    //   })
    // }
    // state.hidden = utils.get_url_params(this.props.history.search).footerbar === '1';
    // this.setState(state)
  }
  go = (path)=> {
    const { nav_data } = this.state;
    Taro.redirectTo({ url: nav_data[path].url || nav_data[0].url })
  }
  currentIndex = (current) => {
    const { nav_data } = this.state;
    return nav_data.findIndex((item)=> {
        return item.key === current;
    })
  }
  render() {
    const {nav_data} = this.state
    const { current, hidden, parentClass } = this.props;
    let tab_bar_set = Object.assign({}, this.props);
    delete tab_bar_set.hidden;
    delete tab_bar_set.current;
    delete tab_bar_set.parentClass;
    return (
      <View>
      {hidden? null :(
        <View className={`ptb60 ${parentClass}`}>
          <AtTabBar
            fixed
            current={this.currentIndex(current)}
            iconSize="20"
            onClick={this.go}
            tabList={nav_data}
            {...tab_bar_set}
          />
          </View>
      )}
      </View>
    )
  }
}
