import Taro, { Component } from '@tarojs/taro'
// import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Css from './index.module.scss';
// 底部导航
export default class Steps extends Component {
  static options = {
    addGlobalClass: true
  }
  constructor(props) {
    super(props)
    this.state = {
      nav_data: nav_data,
    }
  }

  async componentDidMount() {
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
        <AtIcon prefixClass='iconfont' value='icon_jindu' size='30' color='#F00'></AtIcon>
        <Text></Text>  
        <Text></Text>  
      </View>
    )
  }
}
