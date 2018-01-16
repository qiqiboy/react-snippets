var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CreatePic.css';

/*
 * @desc 将图片、文本等绘制到canvas上，以供用户下载保存
 *  <CreatePic config={[
        {
            image: require('static/images/1.png'),
            x: 10,
            y: 10
        },{
            image: require('static/images/3.png'),
            x: 160,
            y: 10,
            width: 100,
            height:100,
            composite: 'source-over'
        },
        {
            text: `火影忍者，尾兽拥有无穷无尽的查克拉和战斗力，被称为“凶暴的神”`,
            x: 50,
            y: 200,
            align: 'right',
            width: 500,
            color:'red',
            lineHeight: 30,
            font: '20px Helvetica'
        }
    ]} width={600} height={1200} background="grey" />
 * 
 */

var CreatePic = function (_Component) {
    _inherits(CreatePic, _Component);

    function CreatePic() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CreatePic);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CreatePic.__proto__ || Object.getPrototypeOf(CreatePic)).call.apply(_ref, [this].concat(args))), _this), _this.state = { img: null, loading: true }, _this.create = function () {
            var _this$props = _this.props,
                config = _this$props.config,
                width = _this$props.width,
                height = _this$props.height,
                background = _this$props.background;


            if (background) {
                _this.ctx.fillStyle = background;
                _this.ctx.fillRect(0, 0, width, height);
            }

            return config.reduce(function (chain, item) {
                return chain.then(function () {
                    return new Promise(function (resolve) {
                        if (item.image) {
                            var img = new Image();
                            img.onload = function () {
                                _this.ctx.globalCompositeOperation = item.composite || 'source-over';
                                _this.drawImage(img, item.x, item.y, item.width, item.height);
                                resolve();
                            };
                            img.onerror = function () {
                                console.log(item.image + ' 图片加载失败!');
                                resolve();
                            };

                            img.src = item.image;
                        }

                        if (item.text) {
                            _this.ctx.globalCompositeOperation = item.composite || 'source-over';
                            _this.drawText(item);
                            resolve();
                        }
                    });
                });
            }, Promise.resolve());
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CreatePic, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = this.props.width;
            this.canvas.height = this.props.height;

            this.create().then(function () {
                _this2.setState({
                    loading: false,
                    img: _this2.canvas.toDataURL()
                });
            });
        }
    }, {
        key: 'drawImage',


        /**
         * @desc 绘制图片
         * @param {Image} img 图片对象
         * @param {Number} x 绘制起始横坐标
         * @param {Number} y 绘制起始纵坐标
         * @param {Number} [width] 图片缩放宽度
         * @param {Number} [height] 图片缩放高度
         * @param {string} [composite] 图片组合蒙层类型，取值同globalCompositeOperation
         */
        value: function drawImage() {
            var _ctx;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            if (args[3] == null) {
                args = args.slice(0, 3);
            }
            (_ctx = this.ctx).drawImage.apply(_ctx, _toConsumableArray(args));
        }

        /**
         * @desc 绘制文本，支持多行绘制，支持换行符
         * @param {object} item 要绘制的文本对象，有以下属性：
         *              text 文本字符串
         *              font 绘制的字体样式，同css里的font字端
         *              width 绘制的最大宽幅，如果省略，则默认绘制到canvas边缘换行
         *              lineHeight 行高，省略则会等于字体宽度的1.4
         *              color 字体颜色
         *              align 对齐方向，可选值 left、center、right
         *              x 开始横坐标
         *              y 开始纵坐标
         */

    }, {
        key: 'drawText',
        value: function drawText(item) {
            var ctx = this.ctx;
            ctx.font = item.font || '30px arial';
            ctx.fillStyle = item.color;

            var maxWidth = item.width || this.props.width - item.x;
            var lineHeight = item.lineHeight || ctx.measureText('热').width * 1.4;

            var curLine = 0,
                //当前绘制行
            curIndex = 0,
                //要绘制的字符串索引
            curDrawWidth = 0; //当前行已绘制宽度

            for (var i = curIndex; i < item.text.length; i++) {
                if (item.text[i] === '\n') {
                    //遇到换行符，主动换行
                    ctx.fillText(item.text.substring(curIndex, i), this.countX(item.align, item.x, curDrawWidth, maxWidth), item.y + lineHeight * curLine);
                    curIndex = i;
                    curLine++;
                    curDrawWidth = 0;
                } else {
                    var curCharWidth = ctx.measureText(item.text[i]).width;

                    //判断是否需要换行
                    if (curDrawWidth + curCharWidth > maxWidth) {
                        var _findWord = this.findWord(item.text, i),
                            findWordStart = _findWord.index,
                            offset = _findWord.offset;
                        //英文单词等不要分割


                        if (findWordStart >= curIndex && this.isWordLetter(item.text[i])) {
                            ctx.fillText(item.text.substring(curIndex, findWordStart + 1), this.countX(item.align, item.x, curDrawWidth - offset, maxWidth), item.y + lineHeight * curLine);
                            curIndex = findWordStart + 1;
                            curDrawWidth = offset;
                        } else {
                            ctx.fillText(item.text.substring(curIndex, i), this.countX(item.align, item.x, curDrawWidth, maxWidth), item.y + lineHeight * curLine);
                            curIndex = i;
                            curDrawWidth = curCharWidth;
                        }

                        curLine++;
                    } else if (i + 1 === item.text.length) {
                        //绘制最后一行
                        ctx.fillText(item.text.substring(curIndex), this.countX(item.align, item.x, curDrawWidth + curCharWidth, maxWidth), item.y + lineHeight * curLine);
                    } else {
                        //累加字符渲染宽度
                        curDrawWidth += curCharWidth;
                    }
                }
            }
        }
    }, {
        key: 'findWord',
        value: function findWord(text, index) {
            var offset = 0;
            while (index-- || index === 0) {
                if (!this.isWordLetter(text[index])) {
                    return {
                        index: index,
                        offset: offset
                    };
                }

                offset += this.ctx.measureText(text[index]).width;
            }
        }
    }, {
        key: 'isWordLetter',
        value: function isWordLetter(char) {
            var charCode = char.charCodeAt(0);

            return charCode >= 33 && charCode <= 126;
        }
    }, {
        key: 'countX',
        value: function countX(type, x, width, maxWidth) {
            switch (type) {
                case 'center':
                    return x + maxWidth / 2 - width / 2;
                case 'right':
                    return x + maxWidth - width;
                default:
                    return x;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                img = _state.img,
                loading = _state.loading;


            return React.createElement(
                'div',
                { className: 'create-pic' },
                loading ? React.createElement(
                    'div',
                    { className: 'canvas-loading' },
                    '\u56FE\u7247\u751F\u6210\u4E2D...'
                ) : React.createElement('img', { src: img, alt: 'ouput', className: 'canvas-image' })
            );
        }
    }]);

    return CreatePic;
}(Component);

CreatePic.propTypes = {
    config: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    background: PropTypes.string
};


export default CreatePic;