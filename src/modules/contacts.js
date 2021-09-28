import ContactsX from "cordova-plugin-contacts-x";

const getDeviceContacts = async (cb) => {
    ContactsX.find((deviceContactList) => {
        cb(deviceContactList)
        return deviceContactList;
    }, error => {
        console.error('contact find error:', JSON.stringify(error));
    }, {
        fields: {
            phoneNumbers: true
        }
    });
}

const requestPermissionContacts = async () => {
    ContactsX.requestPermission(success => {
        getDeviceContacts()
    }, error => {
        console.error('requestPermission error:', JSON.stringify(error));
    });
}

export const checkPermissionContacts = async (cb) => {
    ContactsX.hasPermission(success => {
        if (success?.read === false) {
            requestPermissionContacts(cb)
        }

        getDeviceContacts(cb)
    }, error => {
        console.error('checkPermission error:', JSON.stringify(error));

        requestPermissionContacts()
    });
}