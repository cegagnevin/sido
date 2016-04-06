package com.mtp.android.mapenginedemo;

import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.widget.*;
import butterknife.ButterKnife;
import butterknife.InjectView;
import butterknife.OnCheckedChanged;
import butterknife.OnClick;

import com.mtp.android.mapengine.catalog.MapErrorListener;
import com.mtp.android.mapengine.event.CalloutHiddenEvent;
import com.mtp.android.mapengine.event.CalloutShownEvent;
import com.mtp.android.mapengine.event.MapError;
import com.mtp.android.mapengine.event.MapTypeList;
import com.mtp.android.mapengine.event.MarkerClickedEvent;
import com.mtp.android.mapengine.event.RegionHasChangedEvent;
import com.mtp.android.mapengine.event.ScaleChangedEvent;
import com.mtp.android.mapengine.event.ZoomChangedEvent;
import com.mtp.android.mapengine.map.MapContext;
import com.mtp.android.mapengine.map.MapFacade;
import com.mtp.android.mapengine.map.MapFragment;
import com.mtp.android.mapengine.map.MapTypeListener;
import com.mtp.android.mapengine.map.model.LatLng;
import com.mtp.android.mapengine.map.model.MapOptions;
import com.mtp.android.mapengine.overlay.model.MarkerOptions;
import com.mtp.android.mapengine.scale.ScaleView;
import com.mtp.android.utils.MLog;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class CopyrightActivity extends ActionBarActivity implements ActionBar.OnNavigationListener, MapFacade.OnZoomChangedListener, MapErrorListener, MapTypeListener {
    @InjectView(R.id.zoomIn) Button zoomIn;
    @InjectView(R.id.zoomOut) Button zoomOut;
    @InjectView(R.id.tv_zoom) TextView zoomLabel;
    @InjectView(R.id.toggleTraffic) ToggleButton toggleTraffic;
    @InjectView(R.id.scaleView) ScaleView scaleView;
    @InjectView(R.id.toggleParis)
    ToggleButton parisToggle;

    MapFragment mapFragment;
    MapFacade map;
    private List<String> mapTypeList = new ArrayList<String>();
    private ArrayAdapter adapter;
    HashMap<ToggleButton, MarkerOptions> dictionary;

    MarkerOptions parisMarker = new MarkerOptions(new LatLng(MapContext.PARIS.latitude, MapContext.PARIS.longitude)).setIcon(R.drawable.eiffel_128)
            .setTitle("Tour Eiffel")
            .setSnippet(
                    "named after the engineer Gustave Eiffel,\nwhose company designed and built the tower.");


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.homepage);
        ButterKnife.inject(this);

        initActionBar();
        if (savedInstanceState == null) {
            addMapFragment(savedInstanceState);
        } else {
            mapFragment = (MapFragment) getSupportFragmentManager().findFragmentByTag("TAG_MAP");
        }

    }

    private void addMapFragment(Bundle savedInstanceState) {

        MapOptions mapOption = MapOptions.Builder.create()
                .setAuthKey(getString(R.string.auth_key))
                .setLatLng(new LatLng(MapContext.PARIS.latitude, MapContext.PARIS.longitude))
                .setLocationTimeOutMs(1000)
                .setZoom(11)
                .build();

        mapFragment = MapFragment.newInstance(mapOption);

        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.add(R.id.map, mapFragment, "TAG_MAP");
        transaction.commit();
    }

    @Override
    protected void onStart() {
        super.onStart();
        initMap();
        initMarkers();
    }

    private void initMap() {
        map = mapFragment.getMap();
        zoomLabel.setText(String.valueOf(map.getZoom()));
        map.addOnZoomChangedListener(this);
        map.addMapErrorListener(this);
        map.getMapTypes(this);
    }

    private void initMarkers() {
        dictionary = new HashMap<>();
        dictionary.put(parisToggle, parisMarker);

        map.addMarker(parisMarker);
    }

    private void initActionBar() {
        getSupportActionBar().setNavigationMode(ActionBar.NAVIGATION_MODE_LIST);
        ArrayAdapter<String> adapter = initDropDownNavigationList();
        getSupportActionBar().setListNavigationCallbacks(adapter, this);
    }

    private ArrayAdapter initDropDownNavigationList() {
        adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item,
                mapTypeList);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        return adapter;
    }

    @Override
    public boolean onNavigationItemSelected(int position, long itemId) {
        mapFragment.getMap().setMapType(mapTypeList.get(position));
        return true;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ButterKnife.reset(this);
    }

    @OnClick(R.id.zoomIn)
    public void zoomInClicked(Button button) {
        mapFragment.getMap().zoomIn();
    }

    @OnClick(R.id.zoomOut)
    public void zoomOutClicked(Button button) {
        mapFragment.getMap().zoomOut();
    }

    @OnCheckedChanged({R.id.toggleTraffic})
    public void toggleTraffic(ToggleButton button) {
        mapFragment.getMap().enableTraffic(button.isChecked());
    }

    @Override
    public void onEvent(ZoomChangedEvent zoom) {
        zoomLabel.setText(String.valueOf(zoom.getLevel()));
    }

    @Override
    public void onEvent(MapError mapError) {
        Toast.makeText(this, "MapError " + mapError.getMapErrorType().name(), Toast.LENGTH_LONG).show();
    }

    @Override
    public void onEvent(MapTypeList list) {
        MLog.i("MapTypeList", list.toString());
        mapTypeList.clear();
        mapTypeList.addAll(list);
        mapTypeList.add("invalid MapType");
        adapter.notifyDataSetChanged();
        map.setMapType("viamichelin");
    }
}