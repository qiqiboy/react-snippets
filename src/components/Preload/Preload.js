/*eslint no-loop-func: 0*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Preload.scss';

class Preload extends Component {
    state = {
        percent: 0,
        load: false
    };

    //同一时刻最大加载数量
    //同时加载图片过多，会严重占用阻塞http链接数，可能导致其它比如请求、音视频、异步脚本、样式资源的加载缓慢
    syncLoadNum = 5; 

    componentDidMount() {
        const context = require.context('app', true, /\.(png|jpeg|gif|png|jpg|svg)$/i);
        const allImgs = context.keys();
        const filesNum = allImgs.length;
        const syncLoadNum = this.syncLoadNum; //同时加载图片数量
        let loaded = 0;

        console.time('load time');

        let chain = Promise.resolve(); //Promise链
        for (let i = 0; i < filesNum; i += syncLoadNum) {
            chain = chain.then(() => {
                const tasks = [];
                for (let j = 0; j < syncLoadNum; j++) {
                    const path = allImgs[i + j];
                    if (!path) {
                        continue;
                    }

                    tasks.push(
                        new Promise(resolve => {
                            const imgSrc = context(path);
                            const image = new Image();
                            const onload = () => {
                                resolve();
                                clearTimeout(timer);
                                image.onload = image.onerror = null;

                                this.setState({
                                    percent: ++loaded / filesNum
                                });
                            };
                            const timer = setTimeout(onload, 800); //如果某张图片加载时间过长，则跳过

                            image.onload = image.onerror = onload;
                            image.src = imgSrc;
                        })
                    );
                }

                return Promise.all(tasks);
            });
        }

        chain.then(() => {
            console.timeEnd('load time');
            // 资源缓存完毕
        });
    }

    onLoad = () => {
        this.setState({
            load: true
        });
    };

    render() {
        const { percent } = this.state;

        return (
            <Fragment>
                {percent >= 1 && this.props.children}
                <CSSTransition
                    classNames="preload-fade"
                    timeout={1100}
                    addEndListener={(node, done) => {
                        node.addEventListener(
                            'transitionend',
                            function(e) {
                                //确保动画来自于目标节点
                                if (e.target === node) {
                                    done();
                                }
                            },
                            false
                        );
                    }}
                    in={percent < 1}
                    unmountOnExit={true}>
                    <div className="preload">
                        <div className="progress">
                            <div className="bar-outer">
                                <div className="bar-inner" style={{ width: percent * 100 + '%' }} />
                            </div>
                            <div className="text" />
                        </div>
                    </div>
                </CSSTransition>
            </Fragment>
        );
    }

    static propTypes = {
        children: PropTypes.element.isRequired
    };
}

export default Preload;
