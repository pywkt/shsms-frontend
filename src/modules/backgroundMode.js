import BackgroundMode from 'cordova-plugin-advanced-background-mode';
import { Capacitor } from '@capacitor/core';

export const initBackgroundMode = () => {
    const isWeb = Capacitor.getPlatform() === 'web';

    if (!isWeb) {
        BackgroundMode.setEnabled(true)
        BackgroundMode.overrideBackButton();
        BackgroundMode.setDefaults({
            title: 'shSMS',
            text: 'shSMS has started and is running in the background',
            smallIcon: 'baseline_message_24',
            hidden: true,
            // Comment out this line if notificatios are not working after 
            // phone is asleep/locked for extended periods of time.
            silent: true
        })
        

        // When app goes in to the background
        BackgroundMode.on('activate', () => {
            BackgroundMode.disableBatteryOptimizations();
            BackgroundMode.disableWebViewOptimizations();
            document.title = "appInBackground"
        })

        // When app comes to the foreground
        BackgroundMode.on('deactivate', () => {
            document.title = 'shSMS'
        })
    }
}