import React, { createContext, useState } from 'react';
import { themeList } from '../data/themeList';
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ theme: themeList[0].theme, showImageSwitch: false, openLists: [], disableNotifications: false });

    return (
        <SettingsContext.Provider
            value={{
                settings,
                setSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}