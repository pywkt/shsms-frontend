## shSMS
#### Self Hosted Short Message Service

![shSMS](./public/docs/images/logo-01.png "shSMS")

---

An app designed to run natively on the Android operating system and allow you to communicate via SMS.

Please note: This app makes several assumptions about you as a user. First and formost, it assumes you are following the steps in Chapter Two (p.33) of Michael Bazzell's Book "Extreme Privacy: What It Takes To Dissapear (Third Edition)". By that assumption, it is assumed that you have a Google Pixel device running GrapheneOS, a Twilio account with at least one phone number and access to a computer with Linux installed.

### What this app is not:
   * shSMS is **NOT** an end to end encrypted messaging service. Yes, the messages are stored on your personal database and you have full control over those, but the person you're communicating with, (presumably) is using a standard mobile device with a "traditional" cellular service provider, ie: AT&T, Verizon, etc. There is absolutely nothing that can be done to stop those providers from storing your data. Just a fact of life we all have to deal with.

   * shSMS is not intended to be 100% private, even on your end (depending on how you host). Your messages go through Twilio. You can delete them, but still, they must go through Twilio servers at some point in order to get to you. Think of it as a tool to help you stay more _anonymous_
   
   * If you choose to host your server on Heroku: Heroku is now owned by Salesforce. Salesforce is a monster when it comes to data. Assume they have _everything_ that comes through their servers and are using it as they please.
   
   * If you choose to host your database on mLab (mongodb) your data is also in their hands. We can encrypt our entries before they go in to the database (coming soon), but the fact remains that even though we're "self-hosting" away from the major providers, we're still depending on someone else to hold on to all of our information.

### Now tell me what it can do
   * Send and receive SMS (text messages) with people who are using a standard mobile device.
   * Send and receive MMS (Multimedia Messaging Service) with people who are using a standard mobile device. 
   * Recieve push notifications when a new message is received. An alert will show and the device will vibrate and/or chime when a new message is recieved just like you would expect, but without any Google services.
   * Run on any computer locally (not hosted publically on the internet) and have the same functionality as the native Android app with updates in real-time.
   * Switch themes. Because, we can I guess...
   * Receive/send messages from multiple phone numbers with a single instance of the app across all devices.
   * Import device contacts (read only) and message through shSMS.

![shSMS](./public/docs/images/contact-list.png "Contact List") ![shSMS](./public/docs/images/message-01.png "Messages") ![shSMS](./public/docs/images/settings-01.png "Settings") ![shSMS](./public/docs/images/notification.png "Notification")

**Note:** I took those screenshots on the emulator and I couldn't get one of the notification appearing on the lock screen, but it does turn on the screen and appear on the actual device when the phone is on and the screen is locked. Also, the screenshots above do not show multiple phone numbers, since the ability to rename the numbers is not implemented yet it's tricky to get an image without having to have a black box around several parts of the image. And that doesn't look cool.

---

### Installation

I have created a pretty extensive guide on gitbook, it seems very daunting at first, but I tried to split it up in to several short sections and explain as much as possible. Even things you might not really care about, but hey, this whole process is probably new to a lot of people so I figured I'd give as much help as I can.

[https://pywkt.gitbook.io/shsms/](https://pywkt.gitbook.io/shsms/)

### Issues

If there's something vital I left out in the documentation, send an email to: `34s44nzy [at] anonaddy.me`. (really hoping I didn't open a can of worms with that.)

If there's something wrong with the app, or a feature worth talking about, submit a ticket for it through Github and it will be addressed

### September 28, 2021 - v1.1.0 Release
   * Added support for multiple Twilio numbers to be connected.
   * Added ability to import number from device's saved contacts.
   * Swipe down to refresh (contacts page only).
   * Tightened up notifications. Should be much more reliable now.

### To-Do:
   * ~~Ability to select from native contacts for new message.~~
   * ~~Add multiple Twilio phone numbers to same app instance.~~
   * ~~Send text with MMS/multiple MMS in one message.~~
   * ~~Swipe down to refresh.~~
   * Encrypt/decrypt messages to and from the database (full self-hosting may solve this. tbd.).
   * ~~Make top-level (owned) phone numbers draggable/sortable.~~
   * Overall code cleanup. lint, rename variables etc.
   * Add visual indicators when sending media other than images.
   * ~~Update docs for setting up without Heroku/mLab (still testing).~~
   * Images/colors assignable to contacts.
   * ~~Rename/create alias for your owned numbers.~~
   * Add in-app version checking.