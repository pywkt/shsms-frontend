### Installation on GrapheneOS Device

- clone repo
- cd dir
- `npm install`
- create `.env`
- `npm run build && npx cap sync android`
- download latest version of Gradle from [https://gradle.org/releases](https://gradle.org/releases)
- unzip
- export `PATH=$PATH:/path/to/extracted/files/gradle-7.2/bin`
- in the same window: cd to the directory where you cloned 'frontend'
- `cd android`
- `gradle assembleDebug` note: the docs say to use `gradlew`, i could not get that to work, but just using `gradle` seems to work fine 🤷‍♀
- `cd app/build/outputs/apk/debug`
- `ip a | grep inet` or `ip a | grep 192.168.` note: you do not need the `/24` or `/16` if visible.
- take note of the local ip address (if you don't already know it)
- `python3 -m http.server`
- on your android device, open the browser and navigate to your local ip.
- click on the .apk file and download/install/open

```.env
TWILIO_ACCOUNT_SID=xxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxx
REACT_APP_TWILIO_PHONE_NUMBER=+12345678900
REACT_APP_KEY_HASH=ANY_VALUE_ONLY_YOU_HAVE
REACT_APP_SMS_SERVER_URL=https://yourserver.com
```

#### Useful Links
Gradle:
https://docs.gradle.org/current/userguide/installation.html
https://gradle.org/releases/

Building APK:
https://developer.android.com/studio/build/building-cmdline