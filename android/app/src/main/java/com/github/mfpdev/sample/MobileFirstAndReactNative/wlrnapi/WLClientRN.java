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
