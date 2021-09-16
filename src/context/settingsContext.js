import React, { createContext, useState } from 'react';
import { themeList } from '../data/themeList';
export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ theme: themeList[0].theme, showImageSwitch: false });

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

// import React, { createContext, useState } from 'react';
// import { themeList } from '../data/themeList';
// export const SettingsContext = createContext();

// export const SettingsProvider = ({ children }) => {
//     const [theme, setTheme] = useState(themeList[0].theme);

//     return (
//         <SettingsContext.Provider
//             value={{
//                 theme,
//                 setTheme
//             }}
//         >
//             {children}
//         </SettingsContext.Provider>
//     )
// }
