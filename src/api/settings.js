import * as axios from 'axios';

export const getSettings = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_SMS_SERVER_URL}/settings`)
        return res?.data
    } catch (err) {
        console.log(err)
    }
}

export const updateSettings = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings`, data)
        return res?.data
    } catch (err) {
        console.log(err)
    }
}

export const dropTables = async (confirm) => {
    const response = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings/dropTables`, { confirm })
    return response?.status
}