/**
 *    © Copyright 2016 IBM Corp.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

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
