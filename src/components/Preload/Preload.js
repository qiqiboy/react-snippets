/*eslint no-loop-func: 0*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

class Preload extends Component {
    state = {
        percent: 0
    };

    componentDidMount() {
        const directives = typeof this.props.dir === 'string' ? [this.props.dir] : this.props.dir;
        const allImgs = directives.reduce((total, dir) => {
            const context = require.context('app', true, /\.(png|jpeg|gif|png|jpg|svg)$/i);

            return total.concat(
                context.keys().map(path => ({
                    path,
                    context
                }))
            );
        }, []);
        const filesNum = allImgs.length;
        const syncLoadNum = this.props.parallel; //同时加载图片数量
        let loaded = 0;

        //console.time('Preload time');

        let chain = Promise.resolve(); //Promise链
        for (let i = 0; i < filesNum; i += syncLoadNum) {
            chain = chain.then(() => {
                const tasks = [];
                for (let j = 0; j < syncLoadNum; j++) {
                    const img = allImgs[i + j];
                    if (!img) {
                        continue;
                    }

                    tasks.push(
                        new Promise(resolve => {
                            const imgSrc = img.context(img.path);
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

        // 资源缓存完毕
        chain.then(() => {
            //console.timeEnd('Preload time');
        });

        chain.then(this.props.onload);
    }

    render() {
        const { percent } = this.state;
        let { component, ...props } = this.props;

        if (typeof component === 'function') {
            const Children = component;

            component = <Children percent={percent} />;
        }

        return (
            <Fragment>
                {percent >= 1 && this.props.children}
                <CSSTransition {...props} in={percent < 1}>
                    {component || <div>{(percent * 100).toFixed(0)}%</div>}
                </CSSTransition>
            </Fragment>
        );
    }

    static defaultProps = {
        parallel: 5,
        classNames: 'preload',
        timeout: 1000,
        unmountOnExit: true,
        addEndListener: (node, done) => {
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
        }
    };

    static propTypes = {
        children: PropTypes.element.isRequired,
        component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        dir: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
        parallel: PropTypes.number
    };
}

export default Preload;
