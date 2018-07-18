import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
} from 'react-native';

const styles = {
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
};

class ProgressBar extends Component {

    static defaultProps = { 
            style: styles,
            easing: Easing.inOut(Easing.ease),
            easingDuration: 500
    }

    constructor(props) {
        super(props);
        this.state = { progress: new Animated.Value(this.props.initialProgress || 0) };
    }

  componentDidUpdate(prevProps) {
    if (this.props.progress.props.progress >= 0 && this.props.progress.props.progress !== prevProps.progress.props.progress) {
      this.update();
    }
  }

  update() {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress.props.progress
    }).start();
  }  
  
  render() {
    const fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
    });
    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]} />
      </View>
    );
  }
}

export default ProgressBar;
