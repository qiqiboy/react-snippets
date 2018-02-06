import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
class CreatePic extends Component {
    state = { img: null };

    componentDidMount() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.props.width;
        this.canvas.height = this.props.height;

        this.create().then(() => {
            this.setState({
                img: this.canvas.toDataURL()
            }, this.props.onload);
        }, this.props.onerror);
    }

    create = () => {
        const { config, width, height, background } = this.props;

        if (background) {
            this.ctx.fillStyle = background;
            this.ctx.fillRect(0, 0, width, height);
        }

        return config.reduce(
            (chain, item) =>
                chain.then(
                    () =>
                        new Promise((resolve, reject) => {
                            if (item.image) {
                                const img = new Image();
                                img.setAttribute('crossOrigin', 'anonymous');
                                img.onload = () => {
                                    this.ctx.globalCompositeOperation = item.composite || 'source-over';
                                    this.drawImage(img, item.x, item.y, item.width, item.height);
                                    resolve();
                                };
                                img.onerror = () => {
                                    console.log(item.image + ' 图片加载失败!');
                                    reject(item.image);
                                };

                                img.src = item.image;
                            }

                            if (item.text) {
                                this.ctx.globalCompositeOperation = item.composite || 'source-over';
                                this.drawText(item);
                                resolve();
                            }
                        })
                ),
            Promise.resolve()
        );
    };

    /**
     * @desc 绘制图片
     * @param {Image} img 图片对象
     * @param {Number} x 绘制起始横坐标
     * @param {Number} y 绘制起始纵坐标
     * @param {Number} [width] 图片缩放宽度
     * @param {Number} [height] 图片缩放高度
     * @param {string} [composite] 图片组合蒙层类型，取值同globalCompositeOperation
     */
    drawImage(...args) {
        if (args[3] == null) {
            args = args.slice(0, 3);
        }
        this.ctx.drawImage(...args);
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
    drawText(item) {
        const ctx = this.ctx;
        ctx.font = item.font || '30px arial';
        ctx.fillStyle = item.color;

        const maxWidth = item.width || this.props.width - item.x;
        const lineHeight = item.lineHeight || ctx.measureText('热').width * 1.4;

        let curLine = 0, //当前绘制行
            curIndex = 0, //要绘制的字符串索引
            curDrawWidth = 0; //当前行已绘制宽度

        for (let i = curIndex; i < item.text.length; i++) {
            if (item.text[i] === '\n') {
                //遇到换行符，主动换行
                ctx.fillText(
                    item.text.substring(curIndex, i),
                    this.countX(item.align, item.x, curDrawWidth, maxWidth),
                    item.y + lineHeight * curLine
                );
                curIndex = i;
                curLine++;
                curDrawWidth = 0;
            } else {
                const curCharWidth = ctx.measureText(item.text[i]).width;

                //判断是否需要换行
                if (curDrawWidth + curCharWidth > maxWidth) {
                    const { index: findWordStart, offset } = this.findWord(item.text, i);
                    //英文单词等不要分割
                    if (findWordStart >= curIndex && this.isWordLetter(item.text[i])) {
                        ctx.fillText(
                            item.text.substring(curIndex, findWordStart + 1),
                            this.countX(item.align, item.x, curDrawWidth - offset, maxWidth),
                            item.y + lineHeight * curLine
                        );
                        curIndex = findWordStart + 1;
                        curDrawWidth = offset;
                    } else {
                        ctx.fillText(
                            item.text.substring(curIndex, i),
                            this.countX(item.align, item.x, curDrawWidth, maxWidth),
                            item.y + lineHeight * curLine
                        );
                        curIndex = i;
                        curDrawWidth = curCharWidth;
                    }

                    curLine++;
                } else if (i + 1 === item.text.length) {
                    //绘制最后一行
                    ctx.fillText(
                        item.text.substring(curIndex),
                        this.countX(item.align, item.x, curDrawWidth + curCharWidth, maxWidth),
                        item.y + lineHeight * curLine
                    );
                } else {
                    //累加字符渲染宽度
                    curDrawWidth += curCharWidth;
                }
            }
        }
    }

    findWord(text, index) {
        let offset = 0;
        while (index-- || index === 0) {
            if (!this.isWordLetter(text[index])) {
                return {
                    index,
                    offset
                };
            }

            offset += this.ctx.measureText(text[index]).width;
        }
    }

    isWordLetter(char) {
        const charCode = char.charCodeAt(0);

        return charCode >= 33 && charCode <= 126;
    }

    countX(type, x, width, maxWidth) {
        switch (type) {
            case 'center':
                return x + maxWidth / 2 - width / 2;
            case 'right':
                return x + maxWidth - width;
            default:
                return x;
        }
    }

    render() {
        const { img } = this.state;
        const { children } = this.props;

        return img ? <img src={img} alt="create pic output" className="create-pic-output" /> : children;
    }

    static propTypes = {
        config: PropTypes.array.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        background: PropTypes.string,
        onload: PropTypes.func,
        onerror: PropTypes.func
    };
}

export default CreatePic;
