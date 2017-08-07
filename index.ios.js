/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Loading,
  Button,
  Animated
} from 'react-native';

import Video from './react-native-video';

const AUDIO_URL = "https://cdn.flowkey.com/mp3/121/0079_2014-08-27_18-08-80/1461508773163.mp3";

const PROGRESS_BAR_WIDTH = 200;
const animatedTime = new Animated.Value(0);
const animatedDuration = new Animated.Value(1);
const animatedProgress = Animated.divide(animatedTime, animatedDuration);

// USE THIS LOGGER TO SEE IF THE PROGRESS IS RECEIVED
// If this logs with useNativeDriver: true - your implementation is working

// animatedTime.addListener((e) => {
//     console.warn('PROGRESS', e);
// });

export default class VideoNativeProgress extends Component {
  state = {
    isPaused: true,
  }

  onTogglePause = () => {
    this.setState({isPaused: !this.state.isPaused});
  }

  setDuration = (e) => {
    animatedDuration.setValue(e.duration)
  }

  render() {
    const borderWidth = 1;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Native Video Progress
        </Text>
        <Button
          onPress={this.onTogglePause}
          title={this.state.isPaused ? 'Play' : 'Pause'}
          color="#841584"
        />
        <View style={{
            borderColor: 'black', 
            borderWidth, 
            width: PROGRESS_BAR_WIDTH + 2 * borderWidth, 
            height: 10,
            overflow: 'hidden'
          }}
        >
          <Animated.View style={[
            {backgroundColor: 'orange', width: PROGRESS_BAR_WIDTH, height: 8 }, 
            { transform: [{
                  translateX: animatedProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-PROGRESS_BAR_WIDTH, 0],
                      extrapolate: 'clamp',
                  })
              }]}
            ]}
          />
        </View>
        <Video
          ref={(ref) => { this.player = ref; }}
          source={{ uri: AUDIO_URL }}
          paused={this.state.isPaused}
          onLoad={this.setDuration}
          onProgress={Animated.event([{ nativeEvent: { currentTime: animatedTime } }], { useNativeDriver: false })}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('VideoNativeProgress', () => VideoNativeProgress);


