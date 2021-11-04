import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import BackgroundMode from 'cordova-plugin-advanced-background-mode';

const setTitle = (title) => document.title = title
const isWeb = Capacitor.getPlatform() === 'web';

export const createNotificationChannel = async (specData) => {
    return LocalNotifications.createChannel({
        id: specData?.phoneNumber.replace(/[^0-9]/g, ''),
        name: 'New shSMS Message',
        importance: 5,
        description: 'New shSMS Message',
        sound: 'message_tone.wav',
        visibility: 1,
        vibration: true,
    })
}

export const scheduleLocalNotification = async (data, view) => {
    if (!isWeb) {
        const dateOfLastMessage = new Date(Math.max(...data.map(e => new Date(e.lastMessageRecieved)))).toISOString()
        const latestMessageContact = data.find(contact => contact.lastMessageRecieved === dateOfLastMessage && contact)

        let specData;
        view === 'contacts' ? specData = latestMessageContact : specData = data

        BackgroundMode.isScreenOff(async off => {
            console.log('isScreenOff > off:', off)
            if (off === true) {
                await setTitle('appInBackground')
                BackgroundMode.wakeUp()
            }
        })

        if (document.title === 'appInBackground') {
            document.title = 'shSMS'

            await createNotificationChannel(specData);

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: specData?.alias || specData?.phoneNumber,
                        body: "New Message | shSMS",
                        id: specData?.phoneNumber.replace(/[^0-9]/g, ''),
                        schedule: {
                            at: new Date(Date.now() + 2000),
                            allowWhileIdle: true
                        },
                        sound: 'message_tone.wav',
                        attachments: specData?.media,
                        extra: null,
                        channelId: specData?.phoneNumber.replace(/[^0-9]/g, ''),
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