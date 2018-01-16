var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*eslint no-loop-func: 0*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Preload.css';

var Preload = function (_Component) {
    _inherits(Preload, _Component);

    function Preload() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Preload);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Preload.__proto__ || Object.getPrototypeOf(Preload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            percent: 0,
            load: false
        }, _this.syncLoadNum = 5, _this.onLoad = function () {
            _this.setState({
                load: true
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    //同一时刻最大加载数量
    //同时加载图片过多，会严重占用阻塞http链接数，可能导致其它比如请求、音视频、异步脚本、样式资源的加载缓慢


    _createClass(Preload, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var context = require.context('app', true, /\.(png|jpeg|gif|png|jpg|svg)$/i);
            var allImgs = context.keys();
            var filesNum = allImgs.length;
            var syncLoadNum = this.syncLoadNum; //同时加载图片数量
            var loaded = 0;

            console.time('load time');

            var chain = Promise.resolve(); //Promise链

            var _loop = function _loop(i) {
                chain = chain.then(function () {
                    var tasks = [];

                    var _loop2 = function _loop2(j) {
                        var path = allImgs[i + j];
                        if (!path) {
                            return 'continue';
                        }

                        tasks.push(new Promise(function (resolve) {
                            var imgSrc = context(path);
                            var image = new Image();
                            var onload = function onload() {
                                resolve();
                                clearTimeout(timer);
                                image.onload = image.onerror = null;

                                _this2.setState({
                                    percent: ++loaded / filesNum
                                });
                            };
                            var timer = setTimeout(onload, 800); //如果某张图片加载时间过长，则跳过

                            image.onload = image.onerror = onload;
                            image.src = imgSrc;
                        }));
                    };

                    for (var j = 0; j < syncLoadNum; j++) {
                        var _ret3 = _loop2(j);

                        if (_ret3 === 'continue') continue;
                    }

                    return Promise.all(tasks);
                });
            };

            for (var i = 0; i < filesNum; i += syncLoadNum) {
                _loop(i);
            }

            chain.then(function () {
                console.timeEnd('load time');
                // 资源缓存完毕
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var percent = this.state.percent;


            return React.createElement(
                Fragment,
                null,
                percent >= 1 && this.props.children,
                React.createElement(
                    CSSTransition,
                    {
                        classNames: 'preload-fade',
                        timeout: 1100,
                        addEndListener: function addEndListener(node, done) {
                            node.addEventListener('transitionend', function (e) {
                                //确保动画来自于目标节点
                                if (e.target === node) {
                                    done();
                                }
                            }, false);
                        },
                        'in': percent < 1,
                        unmountOnExit: true },
                    React.createElement(
                        'div',
                        { className: 'preload' },
                        React.createElement(
                            'div',
                            { className: 'progress' },
                            React.createElement(
                                'div',
                                { className: 'bar-outer' },
                                React.createElement('div', { className: 'bar-inner', style: { width: percent * 100 + '%' } })
                            ),
                            React.createElement('div', { className: 'text' })
                        )
                    )
                )
            );
        }
    }]);

    return Preload;
}(Component);

Preload.propTypes = {
    children: PropTypes.element.isRequired
};


export default Preload;