//
//  WLChallengeHandlerEventEmitter.m
//  MobileFirstAndReactNative
//
//  Created by Ishai Borovoy on 18/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WLChallengeHandlerEventEmitter.h"




@implementation WLChallengeHandlerEventEmitter
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendHandleChallenge:) name:@"handleChallenge" object:nil];
  return @[@"handleChallenge"];
}

-(void) sendHandleChallenge:(NSNotification*)notification{
  [self sendEventWithName:@"handleChallenge" body:notification.object];
}

@end

