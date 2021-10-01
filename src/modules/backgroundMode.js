import BackgroundMode from 'cordova-plugin-advanced-background-mode';
import { Capacitor } from '@capacitor/core';

export const initBackgroundMode = () => {
    const isWeb = Capacitor.getPlatform() === 'web';

    if (!isWeb) {
        BackgroundMode.enable();
        BackgroundMode.overrideBackButton()
        BackgroundMode.setDefaults({
            title: 'shSMS',
            text: 'shSMS has started and is running in the background',
            smallIcon: 'baseline_message_24',
            hidden: true,
            // silent: true
        })
    }
}