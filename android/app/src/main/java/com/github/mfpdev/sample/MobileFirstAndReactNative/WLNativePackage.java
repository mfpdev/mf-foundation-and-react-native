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

package com.github.mfpdev.sample.MobileFirstAndReactNative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.github.mfpdev.sample.MobileFirstAndReactNative.wlrnapi.SecurityCheckChallengeHandlerRN;
import com.github.mfpdev.sample.MobileFirstAndReactNative.wlrnapi.WLClientRN;
import com.github.mfpdev.sample.MobileFirstAndReactNative.wlrnapi.WLResourceRequestRN;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by ishaib on 15/09/16.
 */
public class WLNativePackage implements ReactPackage {

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new WLClientRN(reactContext));
        modules.add(new WLResourceRequestRN(reactContext));
        modules.add(new SecurityCheckChallengeHandlerRN(reactContext));
        return modules;
    }
}