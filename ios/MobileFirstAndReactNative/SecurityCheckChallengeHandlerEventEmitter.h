//
//  WLChallengeHandlerEventEmitter.h
//  MobileFirstAndReactNative
//
//  Created by Ishai Borovoy on 18/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTEventEmitter.h"
#import "RCTBridgeModule.h"


@interface SecurityCheckChallengeHandlerEventEmitter : RCTEventEmitter <RCTBridgeModule>
-(void) sendHandleChallenge:(NSNotification *) notification;
@end

