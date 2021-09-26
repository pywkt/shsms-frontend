import ContactsX from "cordova-plugin-contacts-x";

const getDeviceContacts = async () => {
    ContactsX.find((deviceContactList) => {
        console.log('find,', deviceContactList);

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
        console.error(JSON.stringify(error));
    });
}

export const checkPermissionContacts = async () => {
   ContactsX.hasPermission(success => {
        console.log('permission:', JSON.stringify(success));

        getDeviceContacts()
    }, error => {
        console.error(JSON.stringify(error));

       requestPermissionContacts()
    });

    // if (!hasPermission?.read) {
        
    //     return false
    // }
}