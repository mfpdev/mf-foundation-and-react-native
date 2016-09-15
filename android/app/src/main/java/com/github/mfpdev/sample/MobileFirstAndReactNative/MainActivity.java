package com.github.mfpdev.sample.MobileFirstAndReactNative;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.worklight.wlclient.api.WLClient;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MobileFirstAndReactNative";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        WLClient.createInstance(this);
        super.onCreate(savedInstanceState);
    }
}
