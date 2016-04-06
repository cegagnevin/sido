package com.mtp.android.mapenginedemo;

import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import com.mtp.android.utils.MLog;
import net.hockeyapp.android.CrashManager;
import net.hockeyapp.android.UpdateManager;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Set;

public class MainActivity extends ListActivity {
    private final static String APP_ID = "12ac1057725c5e20e92a20c08a4d2103";
    LinkedHashMap<String, Class<?>> examples;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MLog.setEnabled(false);
        initExamples();

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, getKeys());

        setListAdapter(adapter);
        checkForUpdates();
    }

    @Override
    protected void onResume() {
        super.onResume();
        checkForCrashes();
    }

    private void checkForCrashes() {
        CrashManager.register(this, APP_ID);
    }

    private void checkForUpdates() {
        // TODO : Remove this for store builds!
        UpdateManager.register(this, APP_ID);
    }

    private void initExamples() {
        examples = new LinkedHashMap<String, Class<?>>();
        examples.put("Copyright", CopyrightActivity.class);
    }

    private ArrayList<String> getKeys() {
        ArrayList<String> keys = new ArrayList<String>();
        Set keySet = examples.keySet();
        Iterator<String> iterator = keySet.iterator();
        while (iterator.hasNext()) {
            keys.add(iterator.next());
        }
        return keys;
    }

    private Class<?> getValue(String key) {
        return examples.get(key);
    }

    @Override
    protected void onListItemClick(ListView l, View v, int position, long id) {
        String item = (String) getListAdapter().getItem(position);
        startActivity(getValue(item));
    }

    private void startActivity(Class<?> clazz) {
        Intent intent = new Intent(this, clazz);
        startActivity(intent);
    }
}
