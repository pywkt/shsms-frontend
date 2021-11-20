import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from '@material-ui/icons/Edit';
import { dropTables, getSettings, updateSettings } from '../../api/settings';
import { themeList } from '../../data/themeList';
import { SettingsContext } from '../../context/settingsContext';
import * as axios from 'axios';

const SettingsForm = ({ closeDialog }) => {
    const currentSettings = useContext(SettingsContext)

    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            newTheme: currentSettings?.settings?.theme?.slug
        }
    });

    const handleImageLinkSwitch = async () => {
        await updateSettings({ ...currentSettings.settings, showImageLink: !currentSettings.settings.showImageLink })
        currentSettings.setSettings({ ...currentSettings.settings, showImageLink: !currentSettings.settings.showImageLink })
    }

    const handleDisableNotifications = async () => {
        console.log('handleDisable')
        // console.log(currentSettings.settings)
        await updateSettings({ ...currentSettings.settings, disableNotifications: !currentSettings.settings.disableNotifications })
        currentSettings.setSettings({ ...currentSettings.settings, disableNotifications: !currentSettings.settings.disableNotifications })
    }

    const submitNewSettings = async (e) => {
        const result = await updateSettings({ ...currentSettings.settings, theme: { currentTheme: currentSettings.settings.theme.slug, newTheme: e.target.value } })
        const findThemeResult = await themeList.find(i => i.slug === result.theme && i)

        currentSettings.setSettings({ ...currentSettings.settings, theme: findThemeResult })
    }

    const DestroyContent = () => {
        const [view, setView] = useState('');

        const initDrop = async () => {
            const res = await dropTables('burnEverything')
            if (res === 200) {
                window.location.reload()
            }
            return
        }
        return (
            <>
                {view === 'confirm' ?
                    <Grid item container>
                        <Grid item>
                            <Typography variant='body2' color='primary' align='center' gutterBottom>
                                Are you sure you want to delete all entries in the database?
                            </Typography>
                        </Grid>
                        <Grid item container direction='row' justifyContent='space-evenly'>
                            <Button variant='outlined' onClick={() => setView('')}>Cancel</Button>
                            <Button variant='contained' color='secondary' onClick={initDrop}>Drop Tables</Button>
                        </Grid>
                    </Grid> :
                    <Button fullWidth variant='outlined' color='secondary' onClick={() => setView('confirm')}>Clear Database</Button>
                }
            </>
        )
    }

    const [editConnectedAlias, setEditConnectedAlias] = useState(null);

    const updateConnectedAlias = async (item) => {
        const dataToUpdate = {
            phoneNumber: item,
            alias: getValues(`${item}-alias`)
        }
        const cn = currentSettings.settings.connectedNumbers
        const fff = cn.findIndex(i => i.phoneNumber === item)
        cn.splice(fff, 1, dataToUpdate)

        const res = await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings/updateConnectedAlias`, cn,
            { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

        currentSettings.setSettings({ ...res.data, theme: currentSettings.settings.theme })

        setEditConnectedAlias(false)
    }

    const getSettingsCallback = useCallback(() => {
        const fetchSettings = async () => {
            await getSettings(currentSettings)
        }

        fetchSettings()
    }, [currentSettings])

    useEffect(getSettingsCallback, [])

    // console.log(currentSettings.settings.disableNotifications)

    return (
        <form onSubmit={handleSubmit(submitNewSettings)} style={{ height: '100vh', width: '80vw' }}>
            <DialogContent>
                <Grid container direction='column' spacing={2}>

                    <List dense subheader={<Typography variant='caption' color='textSecondary'>Connected Numbers</Typography>}>
                        {currentSettings?.settings?.connectedNumbersOrder?.map((item) => (
                            <ListItem key={item}>
                                {editConnectedAlias !== item ?
                                    <>
                                        <ListItemText
                                            primary={currentSettings.settings.connectedNumbers.find(i => i.phoneNumber === item)?.alias || item}
                                            primaryTypographyProps={{ color: 'textPrimary', variant: 'body2' }}
                                            onClick={() => setEditConnectedAlias(item)}
                                        />
                                        <EditIcon style={{ fontSize: 14 }} />
                                    </> :
                                    <Grid item container direction='row' alignItems='center' justifyContent='space-between'>
                                        <Controller
                                            name={`${item}-alias`}
                                            label={item}
                                            control={control}
                                            render={({ field }) =>
                                                <TextField
                                                    fullWidth
                                                    variant='outlined'
                                                    label={item}
                                                    onChange={(e) => setValue(`${item}-alias`, e.target.value)}
                                                    {...field}
                                                />}
                                        />

                                        <Button fullWidth variant='contained' color='primary' onClick={() => updateConnectedAlias(item)}>Save</Button>
                                    </Grid>
                                }
                            </ListItem>
                        ))}
                    </List>

                    <Divider />

                    <Grid item>
                        <Controller
                            render={({ field }) => (
                                <TextField {...field} select onChange={submitNewSettings} fullWidth variant='outlined' label='Theme' value={currentSettings.settings.theme.slug}>
                                    {themeList.map((item) => (
                                        <MenuItem key={item.slug} value={item.slug}>
                                            {item.displayName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            name="newTheme"
                            control={control}
                        />
                    </Grid>

                    <Divider />

                    <Grid item container>
                        <Controller
                            name='showImageLink'
                            control={control}
                            render={({ field }) =>
                                <FormControlLabel
                                    label={<Typography align='right' variant='caption' style={{ marginLeft: 10 }}>Show links to images for MMS</Typography>}
                                    control={
                                        <Switch {...field}
                                            checked={currentSettings.settings.showImageLink}
                                            onChange={handleImageLinkSwitch}
                                            size='small'
                                        />}
                                />}
                        />
                    </Grid>

                    <Grid item container>
                        <Controller
                            name='disablePushNotifications'
                            control={control}
                            render={({ field }) =>
                                <FormControlLabel
                                    label={<Typography align='right' variant='caption' style={{ marginLeft: 10 }}>Disable push notifications</Typography>}
                                    control={
                                        <Switch {...field}
                                            checked={currentSettings.settings.disableNotifications}
                                            onChange={handleDisableNotifications}
                                            size='small'
                                        />}
                                />}
                        />
                    </Grid>

                    <Divider />

                    <Grid item>
                        {/* <Typography variant='caption'>Danger</Typography> */}
                        {/* <Divider /> */}
                    </Grid>
                    <DestroyContent />
                </Grid>
            </DialogContent>
        </form>
    )
}

export default SettingsForm;