//
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

#import "WLResourceRequestRN.h"



@implementation WLResourceRequestRN
RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{ @"GET": GET_METHOD, @"POST" : POST_METHOD };
}

RCT_EXPORT_METHOD(requestWithURL:(NSString *)urlString method:(NSString *)method: (RCTResponseErrorBlock)errorBlock:(RCTResponseSenderBlock)callback)
{
  NSURL *url = [NSURL URLWithString:urlString];
  WLResourceRequest* resourceRequest = [WLResourceRequest requestWithURL:url method:WLHttpMethodGet];
  [resourceRequest sendWithCompletionHandler:^(WLResponse *response, NSError *error) {
    NSString* resultText;
    if(error != nil){
      resultText = @"Invocation failure.";
      resultText = [resultText stringByAppendingString: error.description];
      errorBlock(error);
    }
    else{
      resultText = response.responseText;
      callback(@[resultText]);
    }
  }];
}

RCT_EXPORT_METHOD(asyncRequestWithURL:(NSString *)urlString method:(NSString *)method resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSURL *url = [NSURL URLWithString:urlString];
  WLResourceRequest* resourceRequest = [WLResourceRequest requestWithURL:url method:WLHttpMethodGet];
  [resourceRequest sendWithCompletionHandler:^(WLResponse *response, NSError *error) {
    NSString* resultText;
    if(error != nil){
      resultText = @"Invocation failure.";
      reject(@"Invocation failure.", resultText, error);
    }
    else{
      resolve(response.responseText);
    }
  }];
}

@end
