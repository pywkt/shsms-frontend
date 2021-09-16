import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import BackgroundMode from 'cordova-plugin-advanced-background-mode';

const isWeb = Capacitor.getPlatform() === 'web';

export const createNotificationChannel = async () => {
    return LocalNotifications.createChannel({
        id: 'smsNotificationChannel',
        name: 'New shSMS Message',
        importance: 5,
        description: 'New shSMS Message',
        sound: 'message_tone.wav',
        visibility: 1,
        vibration: true,
    })
}

export const scheduleLocalNotification = async (data) => {
    let screenIsOff;

    if (!isWeb) {
        LocalNotifications.requestPermissions()
        BackgroundMode.setDefaults({
            title: 'shSMS',
            text: 'shSMS has started and is running in the background',
            hidden: true,
            smallIcon: 'baseline_message_24',
            // silent: true            
        })

        BackgroundMode.enable();

        BackgroundMode.isScreenOff(off => {
            if (off) {
                screenIsOff = off
                BackgroundMode.wakeUp()
            }
        })
        
        const appInBackground = BackgroundMode.isActive()

        if (appInBackground || screenIsOff) {
            await createNotificationChannel();

            LocalNotifications.schedule({
                notifications: [
                    {
                        title: data?.[0]?.alias || data?.[0]?.phoneNumber,
                        body: "New Message | shSMS",
                        id: 0,
                        schedule: {
                            at: new Date(Date.now() + 2000),
                            allowWhileIdle: true
                        },
                        sound: 'message_tone.wav',
                        attachments: data?.media,
                        extra: null,
                        channelId: 'smsNotificationChannel',
                        smallIcon: 'baseline_message_24',
                        largeIcon: 'baseline_message_24',
                        iconColor: '#e090b8',
                        group: 'shSMSGroup',
                        groupSummary: true

                    }
                ]
            })
        }

    }
}