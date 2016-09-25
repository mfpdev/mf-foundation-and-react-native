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

package com.github.mfpdev.sample.MobileFirstAndReactNative.wlrnapi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.challengehandler.SecurityCheckChallengeHandler;

/**
 * Created by ishaib on 15/09/16.
 */
public class WLClientRN extends ReactContextBaseJavaModule {
    public WLClientRN(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WLClientRN";
    }

    @ReactMethod
    public void registerChallengeHandler(String securityCheck) {
        SecurityCheckChallengeHandler securityCheckChallengeHandler = WLClient.getInstance().getSecurityCheckChallengeHandler(securityCheck);
        if (securityCheckChallengeHandler == null) {
            WLClient.getInstance().registerChallengeHandler(new GenericSecurityCheckChallengeHandler(securityCheck , this.getReactApplicationContext()));
        }
    }
}
