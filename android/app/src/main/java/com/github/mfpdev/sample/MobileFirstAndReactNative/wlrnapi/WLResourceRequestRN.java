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

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.worklight.wlclient.api.WLFailResponse;
import com.worklight.wlclient.api.WLResourceRequest;
import com.worklight.wlclient.api.WLResponse;
import com.worklight.wlclient.api.WLResponseListener;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ishaib on 15/09/16.
 */
public class WLResourceRequestRN extends ReactContextBaseJavaModule {
    public WLResourceRequestRN(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WLResourceRequestRN";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("GET", WLResourceRequest.GET);
        constants.put("POST", WLResourceRequest.POST);
        return constants;
    }

    @ReactMethod
    public void requestWithURL(
            String url,
            String method,
            final Callback errorCallback,
            final Callback successCallback) {
        try {
            WLResourceRequest request = new WLResourceRequest(URI.create(url),method);
            request.send(new WLResponseListener(){
                public void onSuccess(WLResponse response) {
                    successCallback.invoke(response.getResponseText());
                    Log.d("Success", response.getResponseText());
                }
                public void onFailure(WLFailResponse response) {
                    errorCallback.invoke(response.getErrorMsg());
                    Log.d("Failure", response.getErrorMsg());
                }
            });
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void asyncRequestWithURL(
            String url,
            String method,
            final Promise promise) {
        try {
            WLResourceRequest request = new WLResourceRequest(URI.create(url),method);
            request.send(new WLResponseListener(){
                public void onSuccess(WLResponse response) {
                    promise.resolve(response.getResponseText());
                    Log.d("Success", response.getResponseText());
                }
                public void onFailure(WLFailResponse response) {
                    promise.reject(response.getErrorStatusCode(), response.getErrorMsg());
                    Log.d("Failure", response.getErrorMsg());
                }
            });
        } catch (IllegalViewOperationException e) {
            promise.reject("failure" ,e.getMessage(), e);
        }
    }
}
