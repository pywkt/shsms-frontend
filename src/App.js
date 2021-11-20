import React, { useState, useEffect, useContext, useCallback } from 'react';
import { scheduleLocalNotification } from './modules/localNotifications';
import { initBackgroundMode } from './modules/backgroundMode';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderBar from './components/HeaderBar';
import ContactList from './components/ContactList';
import Messages from './components/Messages';
import { themeList } from './data/themeList';
import { getSettings } from './api/getSettings';
import Loader from './components/Loader';
import { SettingsContext } from './context/settingsContext';

const App = ({ socket }) => {
  const [loading, setLoading] = useState(true);
  const [titlebarLabel, setTitlebarLabel] = useState('Messages');
  const settingsContext = useContext(SettingsContext)

  const updateTitlebarLabel = (newValue) => newValue !== titlebarLabel && setTitlebarLabel(newValue)

  const initApp = useCallback(() => {
    const callGetSettings = async () => {
      const userSettings = await getSettings()
      const getTheme = await themeList.find(i => i.slug === userSettings.theme && i)
      const contextToUpdate = {
        ...userSettings,
        theme: getTheme,
        _id: userSettings._id,
        openLists: userSettings?.openLists,
        connectedNumbersOrder: userSettings?.connectedNumbersOrder,
        connectedNumbers: userSettings?.connectedNumbers,
        disableNotifications: userSettings?.disableNotifications
      }

      if (contextToUpdate.theme.theme !== settingsContext.settings.theme) {
        settingsContext.setSettings(contextToUpdate)
      }

      setLoading(false)
    }

    callGetSettings();
    initBackgroundMode();
  }, [settingsContext])

  useEffect(initApp, [])

  const handleIncomingMessage = async (data, view) => {
    const { disableNotifications } = await getSettings()

    if (disableNotifications === false) {
      await scheduleLocalNotification(data, view)
    }

    return
  }

  return (
    <>
      {loading ? <Loader /> :
        <>
          <CssBaseline />
          <ThemeProvider theme={settingsContext?.settings?.theme?.theme}>
            <HeaderBar label={titlebarLabel}>
              <Router>
                <ContactList
                  socket={socket} path='/'
                  updateTitlebar={updateTitlebarLabel}
                  incomingMessageCallback={(data, view) => handleIncomingMessage(data, view)}
                />
                <Messages
                  socket={socket}
                  path='/messages/:toPhoneNumber/:fromPhoneNumber'
                  updateTitlebar={updateTitlebarLabel}
                  incomingMessageCallback={(data, view) => handleIncomingMessage(data, view)}
                />
              </Router>
            </HeaderBar>
          </ThemeProvider>
        </>
      }
    </>
  )
}

export default App;
