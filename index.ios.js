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
  Animated,
} from 'react-native';

import Video from './react-native-video';
import ProgressBar from './ProgressBar';

import { NativeDriverEvents, NativeDriverView } from './Libraries/NativeDriverEvents/NativeDriverEvents'

const AUDIO_URL = "https://cdn.flowkey.com/mp3/121/0079_2014-08-27_18-08-80/1461508773163.mp3";


const animatedTime = new Animated.Value(0);
const animatedDuration = new Animated.Value(1);
const animatedVideoProgress = Animated.divide(animatedTime, animatedDuration);


// Coupeled to an native event that is dispatched every 2s
const animatedEventTime = new Animated.Value(0);
const animatedEventBase = new Animated.Value(300);
const animatedEventProgress = Animated.divide(animatedEventTime, animatedEventBase);

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

        <ProgressBar animatedProgress={animatedVideoProgress} />

        <Video
          ref={(ref) => { this.player = ref; }}
          source={{ uri: AUDIO_URL }}
          paused={this.state.isPaused}
          onLoad={this.setDuration}
          onProgress={Animated.event([{ nativeEvent: { currentTime: animatedTime } }], { useNativeDriver: false })}
         />

        {/* This part will render a second progress bar that is connected via an simply native
         component that calls the onTimeUpdate callback every 2s */}

        {/* 
        <Text style={styles.welcome}>
          Dummy Native Events
        </Text>
        <NativeDriverView onTimeUpdate={Animated.event([{ nativeEvent: { currentTime: animatedEventTime } }], { useNativeDriver: false })}/>
        <ProgressBar animatedProgress={animatedEventProgress} /> 
        */}

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


