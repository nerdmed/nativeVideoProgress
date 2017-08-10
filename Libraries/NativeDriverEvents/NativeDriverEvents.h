#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>
#import <React/RCTView.h>

@interface NativeDriverEvents : RCTEventEmitter <RCTBridgeModule>
@end

@interface NativeDriverEventsViewManager: RCTViewManager
@end

@interface MyDummyView: RCTView
@end
