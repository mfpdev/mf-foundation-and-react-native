//
//  WLReactNativeAPI.m
//  PropertyFinder
//
//  Created by Ishai Borovoy on 13/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

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
