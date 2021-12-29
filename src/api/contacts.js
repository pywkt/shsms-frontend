import * as axios from 'axios';

export const getContacts = async () => {
    const result = await axios.get(`${process.env.REACT_APP_SMS_SERVER_URL}/contacts`,
        { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

    return result?.data
}

export const removeContact = async (connectedNumber, contactToRemove) => {
    const result = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/contacts/removeContact`,
        { connectedNumber, contactToRemove },
        { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

    return result?.data
}