import BackgroundMode from 'cordova-plugin-advanced-background-mode';
import { Capacitor } from '@capacitor/core';

export const initBackgroundMode = () => {
    const isWeb = Capacitor.getPlatform() === 'web';

    if (!isWeb) {
        BackgroundMode.enable();
        BackgroundMode.setDefaults({
            title: 'shSMS',
            text: 'shSMS has started and is running in the background',
            hidden: true,
            smallIcon: 'baseline_message_24',
            // silent: true            
        })
    }
}