//
//  WLChallengeHandlerEventEmitter.m
//  MobileFirstAndReactNative
//
//  Created by Ishai Borovoy on 18/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "SecurityCheckChallengeHandlerEventEmitter.h"




@implementation SecurityCheckChallengeHandlerEventEmitter
RCT_EXPORT_MODULE();

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(sendHandleChallenge:) name:@"handleChallenge" object:nil];
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"handleChallenge"];
}

-(void) sendHandleChallenge:(NSNotification*)notification{
  [self sendEventWithName:@"handleChallenge" body:notification.object];
}

@end

