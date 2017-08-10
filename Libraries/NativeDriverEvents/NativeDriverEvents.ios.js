/**
 * @providesModule NativeDriverEvents
 * @flow
 */
'use strict';
import { NativeEventEmitter, NativeModules, requireNativeComponent } from 'react-native';
const { NativeDriverEvents } = NativeModules;

/**
 * High-level docs for the NativeDriverEvents iOS API can be written here.
 */

 const nativeDriverEventsEmitter = new NativeEventEmitter(NativeDriverEvents);

 const subscription = nativeDriverEventsEmitter.addListener(
  'TimerUpdate',
  (body) => console.log(body.time)
);


module.exports = {
  NativeDriverEvents: NativeDriverEvents,
  NativeDriverView: requireNativeComponent('NativeDriverEventsView'),
}