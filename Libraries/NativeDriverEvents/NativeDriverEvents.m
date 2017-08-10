#import "NativeDriverEvents.h"
#import <React/RCTConvert.h>
#import <React/RCTViewManager.h>



@implementation NativeDriverEvents

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"TimerUpdate"];
}

- (void) startObserving {
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [NSTimer scheduledTimerWithTimeInterval:2.0
                                         target:self
                                       selector:@selector(runCallback:)
                                       userInfo:nil
                                        repeats:YES];
    });

}


- (void) runCallback: (NSTimer *)theTimer {
    NSTimeInterval timeStamp = [[NSDate date] timeIntervalSince1970];
    NSNumber *timeStampObj = [NSNumber numberWithDouble: timeStamp];
    printf("CALLING TIMER");
    [self sendEventWithName:@"TimerUpdate" body:@{@"time": timeStampObj}];
    
}

@end


@implementation NativeDriverEventsViewManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
    return [[MyDummyView alloc] init];
}


RCT_EXPORT_VIEW_PROPERTY(onTimeUpdate, RCTBubblingEventBlock)

@end


@implementation MyDummyView

RCTBubblingEventBlock myCallback;
NSNumber *startTime;

- (void) setOnTimeUpdate: (RCTBubblingEventBlock)callback
{
    printf("SETTING TIME UPDATE");
    NSTimeInterval timeStamp = [[NSDate date] timeIntervalSince1970];
    startTime = [NSNumber numberWithDouble: timeStamp];
    

    myCallback = callback;
    dispatch_async(dispatch_get_main_queue(), ^{
        
        [NSTimer scheduledTimerWithTimeInterval:2.0
                                         target:self
                                       selector:@selector(runCallback:)
                                       userInfo:nil
                                        repeats:YES];
    });
    
}

- (void) runCallback: (NSTimer *)theTimer {
    NSTimeInterval timeStamp = [[NSDate date] timeIntervalSince1970];
    NSNumber *timeStampObj = [NSNumber numberWithDouble: timeStamp];
    
    NSNumber *diff = @([timeStampObj intValue] - [startTime intValue]);
    myCallback(@{ @"currentTime": diff });
}

@end


