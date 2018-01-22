import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requestAnimationFrame, cancelAnimationFrame } from 'raf-dom';

class BlinkAnimation extends Component {
    state = {
        key: 0
    };

    latestFrameTime = 0;

    componentDidMount() {
        if (this.props.frames.length && this.props.playing) {
            this.latestFrameTime = Date.now();
            this.frameInterval = this.props.duration / (this.props.frames.length || 1);
            this.play();
        }
    }

    play = () => {
        if (Date.now() - this.latestFrameTime >= this.frameInterval) {
            this.setState(
                preState => ({
                    key: (preState.key + 1) % this.props.frames.length
                }),
                state => {
                    this.latestFrameTime = Date.now();
                }
            );
        }

        this.timer = requestAnimationFrame(this.play);
    };

    pause = () => cancelAnimationFrame(this.timer);

    componentWillReceiveProps(nextProps) {
        if (nextProps.playing !== this.props.playing) {
            if (nextProps.playing) {
                this.play();
            } else {
                this.pause();
            }
        }
    }

    render() {
        const img = this.props.frames[this.state.key];
        return img ? <img src={img} alt="keyframe" /> : null;
    }

    static defaultProps = {
        playing: true,
        frames: [],
        duration: 300
    };
    static propTypes = {
        frames: PropTypes.array.isRequired,
        duration: PropTypes.number,
        playing: PropTypes.bool.isRequired
    };
}

export default BlinkAnimation;
