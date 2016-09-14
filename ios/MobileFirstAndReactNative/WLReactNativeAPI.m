//
//  WLReactNativeAPI.m
//  PropertyFinder
//
//  Created by Ishai Borovoy on 13/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "WLReactNativeAPI.h"


@implementation WLReactNativeAPI
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(requestWithURL:(NSString *)urlString location:(NSString *)method: (RCTResponseSenderBlock)callback)
{
  NSURL *url = [NSURL URLWithString:urlString];
  WLResourceRequest* resourceRequest = [WLResourceRequest requestWithURL:url method:WLHttpMethodGet];
  [resourceRequest sendWithCompletionHandler:^(WLResponse *response, NSError *error) {
    NSString* resultText;
    if(error != nil){
      resultText = @"Invocation failure.";
      resultText = [resultText stringByAppendingString: error.description];
      callback(@[resultText ,[NSNull null]]);
    }
    else{
      resultText = response.responseText;
      callback(@[[NSNull null], resultText]);
    }
  }];
}

@end
