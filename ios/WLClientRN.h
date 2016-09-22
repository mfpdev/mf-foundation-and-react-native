//
//  WLCLientRN.h
//  MobileFirstAndReactNative
//
//  Created by Ishai Borovoy on 18/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <IBMMobileFirstPlatformFoundation/IBMMobileFirstPlatformFoundation.h>
#import "RCTBridgeModule.h"

@interface WLClientRN : NSObject<RCTBridgeModule>
-(void)registerChallengeHandler:(NSString *)securityCheck;
@end
