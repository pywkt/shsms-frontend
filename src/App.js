import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import { scheduleLocalNotification } from './modules/localNotifications';

const App = ({ socket }) => {
  const [loading, setLoading] = useState(true);
  const [titlebarLabel, setTitlebarLabel] = useState('Messages');
  const settingsContext = useContext(SettingsContext)

  const updateTitlebarLabel = (newValue) => newValue !== titlebarLabel && setTitlebarLabel(newValue)

  const initApp = useCallback(() => {
    const callGetSettings = async () => {
      const userSettings = await getSettings()
      const getTheme = await themeList.find(i => i.slug === userSettings.theme && i)
      const contextToUpdate = { ...userSettings, theme: getTheme, _id: userSettings._id }

      if (contextToUpdate.theme.theme !== settingsContext.settings.theme) {
        settingsContext.setSettings(contextToUpdate)
      }

      setLoading(false)
    }

    callGetSettings()
  }, [settingsContext])

  useEffect(initApp, [])

  const handleIncomingMessage = async (data) => {
    console.log('data:', data)
    await scheduleLocalNotification(data)
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
                  incomingMessageCallback={(data) => handleIncomingMessage(data)}
                />
                <Messages
                  socket={socket}
                  path='/messages/:phoneNumber'
                  updateTitlebar={updateTitlebarLabel}
                  incomingMessageCallback={(data) => handleIncomingMessage(data)}
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
