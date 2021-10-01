# Updating the App

By now you're probably asking yourself, "How do I know if there's updates??" Well, that's a good question...

One of the features being worked on is a way \(within the app\) to check for updates, but since there's no central shSMS server to ping and check for updates it gets a little tricky. There is a manual solution for now though:

If you open a terminal and navigate to the either the frontend folder or the backend folder and type

`git pull`

You will pull the latest version that has been pushed to the master branch on Github. This is where the latest "stable" releases will be. There will probably still be some bugs that get through to this version, but it should be working to a usable point.

Remember to `git pull` in both the frontend and backend folders. Both folders may not have updates because they are independent from each other, but always do both.

Then you can follow the steps [09](../08.-build-apk.md) & [10](../09.-install-on-device.md) to re-build the app and put it on your device.

