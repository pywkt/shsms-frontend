import * as axios from 'axios';

export const getMessages = async (toPhoneNumber, fromPhoneNumber) => {
    const response = await axios.get(`${process.env.REACT_APP_SMS_SERVER_URL}/messages/${toPhoneNumber}/${fromPhoneNumber}`,
        { headers: { "enc": process.env.REACT_APP_KEY_HASH } })
    return response?.data
}

export const sendMessage = async (messageData) => {
    const response = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/messages`,
        {
            toPhoneNumber: messageData.toPhoneNumber,
            phoneNumber: messageData.fromPhoneNumber,
            date: messageData.date,
            message: messageData.message,
            attachedMedia: messageData?.attachedMedia || null
        },
        { headers: { "enc": process.env.REACT_APP_KEY_HASH } }
    )

    return response
}

export const sendImage = async (messageData) => {
    const response = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/media/upload`,
        { photo: messageData },
        { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

    const newFileName = response?.data?.savedImage

    return { status: response?.status, imageUrl: `${process.env.REACT_APP_SMS_SERVER_URL}/media/${newFileName}` }
}