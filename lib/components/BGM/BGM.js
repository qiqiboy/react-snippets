var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BGM.css';

var BGM = function (_Component) {
    _inherits(BGM, _Component);

    function BGM() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BGM);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BGM.__proto__ || Object.getPrototypeOf(BGM)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            playing: true
        }, _this.onpause = function () {
            return _this.setState({
                playing: false
            });
        }, _this.onplay = function () {
            return _this.setState({
                playing: true
            });
        }, _this.autoplay = function (ev) {
            var player = _this.refs.player;

            if (!_this.userClick && //用户没有操作过
            player.paused //且没有在播放
            ) {
                    //该功能依赖于已经验证过WeixinJSBridge权限
                    //只需要页面调用过 share.init() 即可，该操作会自动去微信验证WeixinJSBridge调用权限
                    if (typeof WeixinJSBridge !== 'undefined') {
                        window.WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                            player.play();
                        });
                    } else {
                        player.play();
                    }
                }

            if (ev && ev.type === 'touchstart') {
                //移除事件绑定
                document.removeEventListener('touchstart', _this.autoplay, false);
            }
        }, _this.togglePlay = function () {
            var player = _this.refs.player;

            _this.userClick = true; //标示用户已操作过

            player.paused ? player.play() : player.pause();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BGM, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
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
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.box.removeEventListener('click', this.togglePlay, false);
            this.refs.player.addEventListener('pause', this.onpause, false);
            this.refs.player.addEventListener('play', this.onplay, false);

            document.removeEventListener('touchstart', this.autoplay, false);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'bgm-box' + (this.state.playing ? ' bgm-playing' : ''), ref: 'box' },
                React.createElement('audio', { autoPlay: true, loop: true, src: this.props.src, className: 'player', ref: 'player' }),
                React.createElement('div', { className: 'music' })
            );
        }
    }]);

    return BGM;
}(Component);

BGM.propTypes = {
    src: PropTypes.string.isRequired
};


export default BGM;