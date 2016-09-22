//
//  WLCLientRN.m
//  MobileFirstAndReactNative
//
//  Created by Ishai Borovoy on 18/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WLCLientRN.h"
#import "SecurityCheckChallengeHandlerRN.h"

@implementation WLClientRN
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(registerChallengeHandler:(NSString *)securityCheck)
{
  BaseChallengeHandler *existingChallenge = [[WLClient sharedInstance] getChallengeHandlerBySecurityCheck:securityCheck];
  
  if (existingChallenge == nil) {
    SecurityCheckChallengeHandlerRN *challenge = [[SecurityCheckChallengeHandlerRN alloc] initWithSecurityCheck:securityCheck];
    [[WLClient sharedInstance] registerChallengeHandler:challenge];
  }
}
@end
