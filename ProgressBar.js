import React from 'react';
import { View, Animated } from 'react-native';

const borderWidth = 1;
const PROGRESS_BAR_WIDTH = 200;

const ProgressBar = ({ animatedProgress }) =>
  <View 
    style={{
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

export default ProgressBar;