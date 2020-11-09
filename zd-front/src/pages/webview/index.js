import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Config from '../../config'
import { store } from '../../utils'

// import './index.scss'


@connect(({ }) => ({}))
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: ''
        }
    }

    componentDidMount() {
        const params = this.$router.params;
        const dist = params.dist || ''
        if (dist) {
            const passport = store.get('passport');
            const host = Config.h5_url + '/?';
            const hash_params = 'dist=' + encodeURIComponent(dist) + '&jump_from=' + Config.client + '&token=' + passport.token
            this.setState({ url: host + hash_params })
            // 
        }
        
    }
    config = {
        navigationBarTitleText: '360大病筹'
    }

    componentDidShow() {

    }

    componentDidHide() { }

    render() {
        return (
            <WebView src={this.state.url} />
        )
    }
}

export default Index
