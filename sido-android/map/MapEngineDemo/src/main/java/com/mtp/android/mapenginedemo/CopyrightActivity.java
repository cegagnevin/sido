package com.mtp.android.mapenginedemo;

import android.os.Bundle;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.widget.*;
import butterknife.ButterKnife;
import butterknife.InjectView;
import butterknife.OnCheckedChanged;
import butterknife.OnClick;
import com.mtp.android.mapengine.catalog.MapErrorListener;
import com.mtp.android.mapengine.event.MapError;
import com.mtp.android.mapengine.event.MapTypeList;
import com.mtp.android.mapengine.event.ScaleChangedEvent;
import com.mtp.android.mapengine.event.ZoomChangedEvent;
import com.mtp.android.mapengine.map.MapFacade;
import com.mtp.android.mapengine.map.MapFragment;
import com.mtp.android.mapengine.map.MapTypeListener;
import com.mtp.android.mapengine.scale.ScaleView;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CopyrightActivity extends ActionBarActivity implements ActionBar.OnNavigationListener, MapFacade.OnZoomChangedListener, MapErrorListener, MapTypeListener, MapFacade.OnScaleChangedListener {
    @InjectView(R.id.zoomIn) Button zoomIn;
    @InjectView(R.id.zoomOut) Button zoomOut;
    @InjectView(R.id.tv_zoom) TextView zoomLabel;
    @InjectView(R.id.toggleTraffic) ToggleButton toggleTraffic;
    @InjectView(R.id.scaleView) ScaleView scaleView;

    MapFragment mapFragment;
    MapFacade map;
    private List<String> mapTypeList = new ArrayList<String>();
    private ArrayAdapter adapter;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.homepage);
        ButterKnife.inject(this);

        initActionBar();
        initMapFragment();
        initGUI();
    }

    private void initMapFragment() {
        mapFragment = (MapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        map = mapFragment.getMap();
        map.addOnZoomChangedListener(this);
        map.addMapErrorListener(this);
        map.getMapTypes(this);
        map.addOnScaleChangeListener(this);
    }

    private void initGUI() {
        zoomLabel.setText(String.valueOf(map.getZoom()));
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
        //displayCopyrights(mapTypeList.get(position));
        return true;
    }

    private void displayCopyrights(String mapType) {
        ArrayList<String> mapTypeCopyrights = map.getCopyrights(mapType);
        ArrayList<String> currentlyDisplayedCopyrights = map.getCopyrights();
        Collections.sort(mapTypeCopyrights);
        Collections.sort(currentlyDisplayedCopyrights);
        Toast.makeText(this, "[getCopyrights(" + mapType + ")] : \n" + mapTypeCopyrights.toString(), Toast.LENGTH_LONG).show();
        Toast.makeText(this, "[currently displayed copyrights] : \n" + currentlyDisplayedCopyrights, Toast.LENGTH_LONG).show();
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
        mapTypeList.clear();
        mapTypeList.addAll(list);
        mapTypeList.add("invalid MapType");
        adapter.notifyDataSetChanged();
    }

    @Override
    public void onEvent(ScaleChangedEvent event) {
        scaleView.setMetersPerPixel(event.getMetersPerPixel());
    }
}