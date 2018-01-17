import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BGM extends Component {
    state = {
        playing: true
    };

    componentDidMount() {
        if (this.props.autoplay) {
            //绑定事件以触发主动播放
            document.addEventListener('DOMContentLoaded', this.autoplay, false);
            document.addEventListener('WeixinJSBridgeReady', this.autoplay, false);

            document.addEventListener('touchstart', this.autoplay, false);

            //如果后加载组件，绑定WeixinJSBridgeReady事件不会重复触发，所以我们需要手动触发
            if (typeof WeixinJSBridge !== 'undefined') {
                this.autoplay();
            }
        }

        this.refs.box.addEventListener('click', this.togglePlay, false);
        this.refs.player.addEventListener('pause', this.onpause, false);
        this.refs.player.addEventListener('play', this.onplay, false);
    }

    componentWillUnmount() {
        this.refs.box.removeEventListener('click', this.togglePlay, false);
        this.refs.player.addEventListener('pause', this.onpause, false);
        this.refs.player.addEventListener('play', this.onplay, false);

        if (this.props.autoplay) {
            document.removeEventListener('touchstart', this.autoplay, false);
        }
    }

    onpause = () =>
        this.setState(
            {
                playing: false
            },
            this.props.onpause
        );

    onplay = () =>
        this.setState(
            {
                playing: true
            },
            this.props.onplay
        );

    autoplay = ev => {
        const player = this.refs.player;

        if (
            !this.userClick && //用户没有操作过
            player.paused //且没有在播放
        ) {
            //该功能依赖于已经验证过WeixinJSBridge权限
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
        const { playing } = this.state;
        const { className, autoplay, loop, component } = this.props;
        let children = component || this.props.children;

        if (typeof children === 'function') {
            const Children = children;

            children = <Children playing={playing} paused={!playing} />;
        }

        return (
            <div className={(className ? className + ' ' : '') + 'bgm-box ' + (this.state.playing ? 'bgm-playing' : 'bgm-paused')} ref="box">
                <audio autoPlay={autoplay} loop={loop} src={this.props.src} className="player" ref="player" />
                {children || <div className="music" />}
            </div>
        );
    }

    static defaultProps = {
        autoplay: true,
        loop: true
    };

    static propTypes = {
        src: PropTypes.string.isRequired,
        autoplay: PropTypes.bool,
        loop: PropTypes.bool,
        onplay: PropTypes.func,
        onpause: PropTypes.func,
        component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    };
}

export default BGM;
