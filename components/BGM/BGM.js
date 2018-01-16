import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BGM.scss';

class BGM extends Component {
    state = {
        playing: true
    };
    componentDidMount() {
        //绑定事件以触发主动播放
        document.addEventListener('DOMContentLoaded', this.autoplay, false);
        document.addEventListener('WeixinJSBridgeReady', this.autoplay, false);

        document.addEventListener('touchstart', this.autoplay, false);

        this.refs.box.addEventListener('click', this.togglePlay, false);

        this.refs.player.addEventListener('pause', this.onpause, false);
        this.refs.player.addEventListener('play', this.onplay, false);

        //如果后加载组件，绑定WeixinJSBridgeReady事件不会重复触发，所以我们需要手动触发
        if (typeof WeixinJSBridge !== 'undefined') {
            this.autoplay();
        }
    }

    componentWillUnmount() {
        this.refs.box.removeEventListener('click', this.togglePlay, false);
        this.refs.player.addEventListener('pause', this.onpause, false);
        this.refs.player.addEventListener('play', this.onplay, false);

        document.removeEventListener('touchstart', this.autoplay, false);
    }

    onpause = () =>
        this.setState({
            playing: false
        });

    onplay = () =>
        this.setState({
            playing: true
        });

    autoplay = ev => {
        const player = this.refs.player;

        if (
            !this.userClick && //用户没有操作过
            player.paused //且没有在播放
        ) {
            //该功能依赖于已经验证过WeixinJSBridge权限
            //只需要页面调用过 share.init() 即可，该操作会自动去微信验证WeixinJSBridge调用权限
            if (typeof WeixinJSBridge !== 'undefined') {
                window.WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                    player.play();
                });
            } else {
                player.play();
            }
        }

        if (ev && ev.type === 'touchstart') {
            //移除事件绑定
            document.removeEventListener('touchstart', this.autoplay, false);
        }
    };

    togglePlay = () => {
        const player = this.refs.player;

        this.userClick = true; //标示用户已操作过

        player.paused ? player.play() : player.pause();
    };

    render() {
        return (
            <div className={'bgm-box' + (this.state.playing ? ' bgm-playing' : '')} ref="box">
                <audio autoPlay loop src={this.props.src} className="player" ref="player" />
                <div className="music" />
            </div>
        );
    }

    static propTypes = {
        src: PropTypes.string.isRequired
    };
}

export default BGM;
