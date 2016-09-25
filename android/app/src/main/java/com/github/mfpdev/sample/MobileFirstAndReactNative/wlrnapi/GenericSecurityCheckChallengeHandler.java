
package com.github.mfpdev.sample.MobileFirstAndReactNative.wlrnapi;

import android.support.annotation.Nullable;
import android.util.Log;
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

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.github.mfpdev.sample.MobileFirstAndReactNative.RNJSONUtils;
import com.worklight.wlclient.api.challengehandler.SecurityCheckChallengeHandler;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by ishaib on 21/09/16.
 */
public class GenericSecurityCheckChallengeHandler extends SecurityCheckChallengeHandler{
    private ReactApplicationContext reactApplicationContext;
    private String securityCheck;

    public GenericSecurityCheckChallengeHandler(String securityCheck, ReactApplicationContext reactApplicationContext) {
        super(securityCheck);
        this.securityCheck = securityCheck;
        this.reactApplicationContext = reactApplicationContext;
    }

    @Override
    public void handleChallenge(JSONObject jsonObject) {
        WritableMap params = null;
        try {
            params = RNJSONUtils.convertJsonToMap(jsonObject);
            params.putString("securityCheck", this.securityCheck);
            reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
            sendEvent(reactApplicationContext, "handleChallenge", params);
        } catch (JSONException e) {
            Log.e(this.getClass().getCanonicalName(), e.getMessage(), e);
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public void cancel() {
        try {
            super.cancel();
        } catch (Exception e) {
            Log.d(this.getClass().getCanonicalName(), e.getMessage());
        }
    }


}
