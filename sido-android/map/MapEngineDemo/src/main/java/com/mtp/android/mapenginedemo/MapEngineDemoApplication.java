package com.mtp.android.mapenginedemo;

import android.app.Application;

import com.mtp.android.mapengine.MapEngineManager;
import com.mtp.nf.MTPProfile;

/**
 * Created by mcamara on 08/10/2015.
 */
public class MapEngineDemoApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        initMapEngine();
    }

    private void initMapEngine() {
        MapEngineManager.getInstance().setProfile(MTPProfile.Profile.STAGING);
    }
}
