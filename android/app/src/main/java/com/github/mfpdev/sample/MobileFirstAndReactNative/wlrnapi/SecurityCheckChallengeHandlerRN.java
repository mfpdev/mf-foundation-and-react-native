package com.github.mfpdev.sample.MobileFirstAndReactNative.wlrnapi;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.github.mfpdev.sample.MobileFirstAndReactNative.RNJSONUtils;
import com.worklight.wlclient.api.WLClient;
import com.worklight.wlclient.api.challengehandler.SecurityCheckChallengeHandler;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by ishaib on 15/09/16.
 */
public class SecurityCheckChallengeHandlerRN extends ReactContextBaseJavaModule {
    ReactApplicationContext reactContext;

    public SecurityCheckChallengeHandlerRN(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void cancel(String securityCheck) {
        SecurityCheckChallengeHandler securityCheckChallengeHandler = WLClient.getInstance().getSecurityCheckChallengeHandler(securityCheck);
        if (securityCheckChallengeHandler != null)
            ((GenericSecurityCheckChallengeHandler)securityCheckChallengeHandler).cancel();
    }

    @ReactMethod
    public void submitChallengeAnswer(ReadableMap challengeAnswer, String securityCheck) {

        SecurityCheckChallengeHandler securityCheckChallengeHandler = WLClient.getInstance().getSecurityCheckChallengeHandler(securityCheck);
        JSONObject answer;
        try {
            if (securityCheckChallengeHandler != null) {
                answer = RNJSONUtils.convertMapToJson(challengeAnswer);
                securityCheckChallengeHandler.submitChallengeAnswer(answer);
            }
        } catch (JSONException e) {
            Log.e(this.getClass().getCanonicalName(), e.getMessage(), e);
        }
    }

    @Override
    public String getName() {
        return "SecurityCheckChallengeHandlerRN";
    }
}
