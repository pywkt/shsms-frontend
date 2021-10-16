import * as axios from 'axios';

export const getSettings = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SMS_SERVER_URL}/settings`,
        {
            headers: {
                "enc": process.env.REACT_APP_KEY_HASH
            }
        })

        return response?.data
}