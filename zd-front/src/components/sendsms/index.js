/**
 * n秒倒计时
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Vmobile } from '../../utils/validate'
import Css from './sms.module.scss';
/**
 * text 发送前的方案
 * onPrevValidate 前置检验，返回false 不执行倒计时
 * onStart 倒计时开始后，
 * onEnd 倒计时结束后
 * showTimes 立即执行倒计时
 * over 立即结束倒计时 
 */
export default class SendSms extends Component {
    constructor(props) {
        super(props);
        this.text = props.text || '发送验证码'
        this.times = Number(props.time || 60) + 1;
        this.state = {
            time: this.times,
            txt: this.text,
        }
    }

    componentDidMount() {
        if (this.props.showTimes) {
            this.updateCountdown()
        }
    }


    componentWillUnmount() {
        try {

            this._timer && clearTimeout(this._timer);
        } catch (e) { }
    }
    handleDown() {
        if (this.props.onPrevValidate) {
            // 前置 检验
            if (!this.props.onPrevValidate()) {
                return false;
            }
        }
        const mobile = Vmobile(this.props.mobile)
        // 如果传了手机号
        if (this.props.mobile !== undefined && mobile.code !== 999) {
            Taro.showToast({ title: mobile.msg, icon: 'none' })
        } else {
            if (this.state.time === this.times) {
                this.updateCountdown();
                this.props.onSend && this.props.onSend(mobile.norVal);
            }
        }
    }
    updateCountdown() {
        let _count = this.state.time - 1;
        if (this.props.over) { _count = 0; }//强制结束
        if (_count > 0) {
            this.setState({
                time: _count,
                txt: 'S'
            }, () => { this._timer = setTimeout(() => { this.updateCountdown(); }, 1000) })
        } else {
            this.setState({
                time: this.times,
                txt: this.text
            })
            this.props.onEnd && this.props.onEnd();
        }
    }
    render() {
        const available = this.props.available || this.props.available === undefined;
        return (
            <View className={`${this.props.className || ''} ${Css.sms} ib ${this.state.time < this.times ? "c-gray" : (available ? 'c-green' : '')}`} onClick={this.handleDown.bind(this)}>
                {this.state.time === this.times ? <Text className='pl10'>{this.state.txt}</Text> : <Text className='pl10'>{this.state.time}s后重发</Text>}
            </View>
        )
    }

}