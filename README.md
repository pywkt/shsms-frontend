### Installation on GrapheneOS Device

There are a few ways to go about this, to start off, I'll go through the method I use and add other methods over time.

Here we go...

1. Create a directory on your computer to hold the two repos. When we're all done we will have a folder (shSMS) with two folders inside (shsms-frontend and shsms-backend)
    - `mkdir shSMS && cd shSMS`
2. Clone the frontend repo
    - `git clone https://github.com/pywkt/shsms-frontend.git`
3. Navigate to the directory we just created
    - `cd shsms-frontend`
4. Install frontend dependencies
    - `npm install`
5. Create a file to hold our environmental variables. These will be specific to your own personal build and will only be hosted on your machine. 
    - `touch .env`
6. Open the .env file you just created and add the following, *be sure to update these with your own information*

Note: Files that begin with '.' are hidden by default on many machines. You may need to change your display settings on your operating system to see them in the folder.
Personally, I prefer to just do it all in the terminal because we're already in there, why bother with all that double-clicking 🤷‍♀
To use the terminal:
 - `nano .env`
 - Copy/Paste the sample below
 - Change the values to match your own info
 - `Ctrl + O` (save changes)
 - `Enter` (confirm that you want to overwrite the file)
 - `Ctrl + X` (exit the Nano text editor)
 - `cat .env` (print the file to the screen and make sure your changes are correct and saved)
 - `clear` (clear the terminal in case some shady characters walk past you and want to peek at your screen)

Do not use any kind of quotes/spaces/parenthesis around the values after the equal (=) sign

Values to add to the .env file:
REACT_APP_TWILIO_PHONE_NUMBER - The Twilio number you want to use for sending/recieving messages
REACT_APP_KEY_HASH - Any "password" unique to you. This is used as validation in the requests to the server and will be used in several places.
REACT_APP_SMS_SERVER_URL - The URL to where you will be hosting your server. If using Heroku, add the root path to your app. If self hosting (personal server/raspberry pi/vps/etc), add the location and port. eg: https://281.23.98.102:4001

Your final .env should look something like this:
```.env
REACT_APP_TWILIO_PHONE_NUMBER=+12345678900
REACT_APP_KEY_HASH=THIS_IS_YOUR_SECRET_KEY_IT_CAN_BE_ANYTHING
REACT_APP_SMS_SERVER_URL=https://cool-heroku-project-01.herokuapp.com
```

From here (if you've already set up the backend) you should be able to run the frontend locally on your machine with no issues.

To do so:
1. Make sure you are in the main frontend folder in your terminal (shSMS/shsms-frontend) and type
    - `npm start`
2. Once the terminal says _"You can now view shsms in the browser."_, open a browser and navigate to localhost:3000 and you should see the app running.
3. Send your Twilio number an SMS from a different number and watch in amazement.

protip: I like to either make the browser window smaller or open dev-tools and set it to the size of a phone so the messages aren't as spread out on the screen. This is intended to be a mobile app after all.

Congratulations! You've set up the local web version, but that's probably not why you came here is it? Let's take a breather and get on that Android APK I mentioned earlier...

---

Still with me? Cool, pretty straight-forward so far. Now the fun part...
Before we can build the APK, we need to set up the Android SDK on our machine.

We're still in the root of our frontend folder (shSMS/shsms-frontend)

1. Add Android to the project
    - `npx cap add android`

#### Installing Android SDK (Android Studio)
The _"easiest"_ way to get the android sdk on your system is to install Android Studio. 
Another benefit to this method is that it allows you to run the app in an emulator before deploying to your device.

Note: "easiest" is in quotes because, yes, it is pretty simple because installing Android Studio will automatically install the Android SDK and you can keep it up to date, but Android Studio is fairly large and once set up, there's a decent chance you won't be using it regularly unless you really want to play around with the code/add new features, which in that case you probably already have it installed. But anyway, we're going to use it because it gives us a 'wizard' style setup and then we should be good to compile from the terminal.

First, make sure you have all the required libraries installed on your system.

Debian
`sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386`

To install Android Studio, navigate to https://developer.android.com/studio#downloads and download the version for Linux
Unzip the file to a location you'd prefer, I just keep mine in the Downloads folder because that's how I did it the first time and I just stuck with that for whatever reason.
Once unzipped, in the terminal, navigate to the `bin` folder in the directory you created. For me it's `cd ~/Dowloads/android-studio/bin`
Open Android Studio by running `./studio.sh`
Go through the setup and make note of where you install the Android SDK, we will need this path in a minute. I installed my SDK in my home (~) directory. So it's `/home/<username>/Android/sdk`.

#### Installing Android SDK (without Android Studio)
https://proandroiddev.com/how-to-setup-android-sdk-without-android-studio-6d60d0f2812a

1. Open a new terminal window and Download the Android Command Line Tools zip file for Linux. I'm going to save it in my Downloads folder (~/Downloads)
At the time of writing this 'commandlinetools-linux-7583922_latest.zip' is the latest version.
    - https://developer.android.com/studio#command-tools
2. I prefer to keep my SDK in an Android folder in my home folder, but it's up to you where you keep it, just remember where it is because we'll need to reference it in a minute.
    - `cd ~ && mkdir Android && cd Android`
3. Move (mv) the zip in to this folder, unzip the contents, delete the zip file, open the folder 'cmdline-tools', make a folder called 'tools' and move everything in to the newly created 'tools' folder
Depending on when you follow these steps you might have to change the name of the zip file. The next command looks like a lot, but it's just because I tried to make this as simple as possible by giving you a single one-liner chain of commands
    - `mv ~/Downloads/commandlinetools-linux-7583922_latest.zip ./ && unzip commandlinetools-linux-7583922_latest.zip && rm commandlinetools-linux-7583922_latest.zip && cd cmdline-tools && mkdir tools && mv -i * tools`
3.1 That warning kinda scared us, let's just get some re-assurance and make sure everything went as planned
    - `ls tools`
    You should see the folders `bin` and `lib` and then a few other files in there. Good stuff.
4. The next step will vary depending on what shell your terminal is using. If you're not sure what that means, you're probably using BASH, but let's double check anyway
    - `echo $SHELL`
    You will probably see something like `/usr/bin/bash` or `/usr/bin/zsh`
5. If you're using bash, we'll need to edit `.bash_profile`. If you're using zsh you've probably got `.zshrc`
    - `nano ~/.bash_profile`
6. At the end of the file add the following
    ```.env
    export ANDROID_HOME=$HOME/Android
    export PATH=$ANDROID_HOME/cmdline-tools/tools/bin/:$PATH
    export PATH=$ANDROID_HOME/emulator/:$PATH
    export PATH=$ANDROID_HOME/platform-tools/:$PATH
    ```
    See what we did there? We're setting the "home" directory for our Android stuff to `~/Android` and telling it where our command line tools stuff is located.
7. Save (`Ctrl + O`, `Enter`) and exit (`Ctrl + X`)
8. Close your terminal window and open a new one
9. Check to see if sdkmanager installed correctly. You might see something like "picked up _JAVA_OPTIONS: etc" and underneath it on the last line printed will be a version number. If so, we're good.
    - `sdkmanager --version`
10. Install the SDK. At the time of writing this, shSMS is looking for at least 27, so let's do 30 because yolo.
    - `sdkmanager --install "platform-tools" "platforms;android-30" "build-tools;30.0.3" "emulator"`

We did it. We're sooooo close now

1. Navigate back to the root of the frontend folder (shSMS/shsms-frontend)
3. Build the app and sync with some Android stuff
    - `npm run build && npx cap sync android`
4. Navigate to the 'android' folder
    - `cd android`
5. Build the APK
    - `./gradlew assembleDebug`
6. Navigate to where the APK was saved
    - `cd app/build/outputs/apk/debug`
7. Make sure your APK is there
    - `ll` (lists the files in the current directory)

Do you see `app-debug.apk`? If so CONGRATULATIONS! 🎉

8. We're going to download this directly to our phone now, but we need to get our local ip address
    - `ip a | grep inet` or `ip a | grep 192.168.` Note: if you see a "/24" or "/16" after the local ip address you can ignore it. We just want the "192.168.X.XXX"
9. In your terminal start a simple python server
    - `python3 -m http.server`
10. On your GrapheneOS device, open a web browser and go to your local ip address
11. The files in that directory should be listed.
12. Click the .apk to download it.
13. Open/install the .apk
14. Close the browser, swipe up or whatever and you should now see shSMS in with all your other sweet Google-free-open-source apps.

Can you believe it?? You've got some top-notch patience if you made it all the way here, but it's totally worth it! You just added another layer between you and the data-controlling 'man'. These text messages belong to you and you should have the right to choose who sees them. So pat yourself on the back and grab a snack because you deserve it...
Unless you did this part first, then you've still got to set up the server, but trust me, it's waayyyyyy easier/faster. Like, all you have to do is make a few accounts, clone, add env variables and push it to Heroku or whatever server you want to use.


- clone repo
- cd dir
- `npm install`
- create `.env`
- `npx cap add android`
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



