//
//  WLChallengeHandlerRN.m
//  MobileFirstAndReactNative
//
//  Created by Ishai Borovoy on 18/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "SecurityCheckChallengeHandlerRN.h"
#import "RCTEventDispatcher.h"
#import "SecurityCheckChallengeHandlerEventEmitter.h"


@implementation SecurityCheckChallengeHandlerRN

RCT_EXPORT_MODULE();

-(void) handleChallenge:(NSDictionary *)challenge {
  [challenge setValue:self.securityCheck forKey:@"securityCheck"];
  [[NSNotificationCenter defaultCenter] postNotificationName:@"handleChallenge" object:challenge];
}

RCT_EXPORT_METHOD(submitChallengeAnswer: (NSDictionary *)answer securityCheck:(NSString *) securityCheck)
{
  BaseChallengeHandler *challenge = [[WLClient sharedInstance] getChallengeHandlerBySecurityCheck:securityCheck];
  if (challenge != nil) {
    [(SecurityCheckChallengeHandler *)(challenge) submitChallengeAnswer:answer];
  }
}

RCT_EXPORT_METHOD(cancel :(NSString *) securityCheck)
{
  BaseChallengeHandler *challenge = [[WLClient sharedInstance] getChallengeHandlerBySecurityCheck:securityCheck];
  if (challenge != nil) {
    [challenge cancel];
  }
}

@end
