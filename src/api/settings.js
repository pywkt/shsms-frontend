import * as axios from 'axios';

export const getSettings = async (sc) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_SMS_SERVER_URL}/settings`,
            { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

        sc.setSettings({ ...res?.data, theme: sc.settings.theme })
        return res?.data
    } catch (err) {
        console.log(err)
    }
}

export const updateSettings = async (data, sc) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings`,
            data,
            { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

        return res?.data
    } catch (err) {
        console.log(err)
    }
}

export const dropTables = async (confirm) => {
    const response = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings/dropTables`,
        { confirm },
        { headers: { "enc": process.env.REACT_APP_KEY_HASH } })
    return response?.status
}

export const updateOpenLists = async (listData, sc) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings/openCloseList`,
            listData,
            { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

        sc.setSettings({ ...sc.settings, openLists: response?.data?.openLists })

        return response?.data
    } catch (err) {
        console.log(err)
    }
}