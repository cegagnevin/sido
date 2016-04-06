// For an introduction to this template, see the following documentation:
// https://github.com/dbiele/Boilerplate-Angular2-Cordova-TypeScript-VSStudio
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
module jahland.Quizz {
    'use strict';

    export module Application {

        export function initialize():void {
            console.log('Application initialize');

            document.addEventListener('deviceready', onDeviceReady, false);

        }

        function onDeviceReady():void {
            // Handle the Cordova pause and resume events
            console.log('Application onDeviceREady');

            document.addEventListener('pause', onDevicePause, false);
            document.addEventListener('resume', onDeviceResume, false);
            document.addEventListener('onMenuButton', onDeviceMenuButton, false);
            //document.addEventListener('onMenuButton', onDeviceOffline, false);
            //document.addEventListener('onMenuButton', onDeviceMenuOnline, false);
            //document.addEventListener('onMenuButton', onDeviceBackButton, false);
            //document.addEventListener('onMenuButton', onDeviceSearchButton, false);
            // TODO: Scripts are ready to load.


            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        }

        function onDevicePause():void {
            console.log('applicaiton onPause');
            // TODO: This application has been suspended. Save application state here.
        }

        function onDeviceResume():void {
            console.log('application onResume');
            // TODO: This application has been reactivated. Restore application state here.
        }

        function onDeviceMenuButton():void {

        }

    }
}