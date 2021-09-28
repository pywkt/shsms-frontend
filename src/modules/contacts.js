import ContactsX from "cordova-plugin-contacts-x";

const getDeviceContacts = async (cb) => {
    ContactsX.find((deviceContactList) => {
        console.log('find,', JSON.stringify(deviceContactList));

        cb(deviceContactList)
        return deviceContactList;
    }, error => {
        console.error('contact find:', JSON.stringify(error));
    }, {
        fields: {
            phoneNumbers: true
        }
    });
}

const requestPermissionContacts = async () => {
    ContactsX.requestPermission(success => {
        console.log('request permission:', JSON.stringify(success));

        getDeviceContacts()
    }, error => {
        console.error('requestPermission error:', JSON.stringify(error));
    });
}

export const checkPermissionContacts = async (cb) => {
   ContactsX.hasPermission(success => {
        console.log('permission:', JSON.stringify(success));

        if (success?.read === false) {
            requestPermissionContacts(cb)
        }

        getDeviceContacts(cb)
    }, error => {
        console.error('checkPermission error:', JSON.stringify(error));

       requestPermissionContacts()
    });

    // if (!hasPermission?.read) {
        
    //     return false
    // }
}