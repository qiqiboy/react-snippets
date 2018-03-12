import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default function withTransition(defaultProps) {
    return class Transition extends React.Component {
        static defaultProps = {
            timeout: 1000,
            unmountOnExit: true,
            ...defaultProps
        };

        static propTypes = {
            classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
        }

        render() {
            const { in: inProp, timeout, children, classNames, unmountOnExit } = this.props;

            return (
                <CSSTransition
                    classNames={classNames}
                    in={inProp}
                    timeout={timeout}
                    unmountOnExit={unmountOnExit}
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
                    }}>
                    {children}
                </CSSTransition>
            );
        }
    };
}
