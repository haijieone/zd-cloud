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
   
    this.state = {
      nav_data: nav_data,
    }
  }

  async componentDidMount() {
   
  }
  go = (e)=> {
    const {current}=this.props
    const { nav_data } = this.state;
    const is_current_index=nav_data.findIndex(item=>item.key===current)
    if(e===is_current_index){
      return
    }else{
      Taro.redirectTo({url:nav_data[e].url})
    }
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
            iconSize='20'
            onClick={this.go.bind(this)}
            tabList={nav_data}
            {...tab_bar_set}
          />
          </View>
      )}
      </View>
    )
  }
}
