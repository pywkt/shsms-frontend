import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
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

    const handleImageLinkSwitch = async (e) => {
        await updateSettings({...currentSettings.settings, showImageLink: !currentSettings.settings.showImageLink})
        currentSettings.setSettings({ ...currentSettings.settings, showImageLink: !currentSettings.settings.showImageLink })
    }

    const submitNewSettings = async (data) => {
        const result = await updateSettings({
            ...currentSettings.settings, theme: { currentTheme: currentSettings.settings.theme.slug, newTheme: data.newTheme }
        }, currentSettings)

        const findThemeResult = await themeList.find(i => i.slug === result.theme && i)

        currentSettings.setSettings({
            ...result.settings,
            _id: result._id,
            theme: findThemeResult,
            showImageLink: result.showImageLink,
            openLists: result.openLists,
            connectedNumbersOrder: result.connectedNumbersOrder,
            connectedNumbers: result.connectedNumbers
        })

        closeDialog()
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
                    <Grid item container direction='column' spacing={2}>
                        <Grid item>
                            <Typography variant='body2' color='primary' align='center'>
                                Are you sure you want to delete all entries in the database?
                            </Typography>
                        </Grid>
                        <Grid item container justifyContent='space-evenly'>
                            <Button variant='outlined' onClick={() => setView('')}>Cancel</Button>
                            <Button variant='contained' color='secondary' onClick={initDrop}>Drop Tables</Button>
                        </Grid>
                    </Grid> :
                    <Button fullWidth variant='contained' color='secondary' onClick={() => setView('confirm')}>Clear Database</Button>
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

    return (
        <form onSubmit={handleSubmit(submitNewSettings)} style={{ backgroundColor: 'lightcyan', height: '100vh' }}>
            <DialogContent dividers>
                <Grid container direction='column' spacing={2}>

                    <Grid item>
                        <Typography variant='caption'>Connected Phone Numbers</Typography>
                        <Divider />
                    </Grid>

                    <List dense>
                        {currentSettings?.settings?.connectedNumbersOrder?.map((item, index) => (
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
                                    <Grid item container justifyContent='space-between' alignItems='center'>
                                        <Controller
                                            name={`${item}-alias`}
                                            label={`${item}`}
                                            control={control}
                                            render={({ field }) =>
                                                <TextField
                                                    style={{ flexGrow: 1, marginRight: 10 }}
                                                    margin='dense'
                                                    variant='outlined'
                                                    label={item}
                                                    onChange={(e) => setValue(`${item}-alias`, e.target.value)}
                                                />}
                                        />

                                        <Button variant='contained' color='secondary' onClick={() => updateConnectedAlias(item)}>Save</Button>
                                    </Grid>
                                }
                            </ListItem>
                        ))}
                    </List>




                    <Grid item>
                        <Typography variant='caption'>Theme</Typography>
                        <Divider />
                    </Grid>

                    <Grid item>
                        <Controller
                            render={({ field }) => (
                                <Select {...field} fullWidth>
                                    {themeList.map((item, index) => (
                                        <MenuItem key={item.slug} value={item.slug}>
                                            {item.displayName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                            name="newTheme"
                            control={control}
                        />
                    </Grid>

                    {/* <Grid item> */}
                    <Grid item container justifyContent='space-between' style={{ flexGrow: 1 }}>
                        <Controller
                            name='showImageLink'
                            label='Show'
                            control={control}
                            render={({ field }) =>
                                <FormControlLabel
                                    label="Show link to images for MMS"
                                    control={
                                        <Switch {...field}
                                            checked={currentSettings.settings.showImageLink}
                                            onChange={handleImageLinkSwitch}
                                            size='small'
                                        />}
                                />}
                        />
                    </Grid>
                    {/* </Grid> */}

                    <Grid item>
                        <Typography variant='caption'>Danger</Typography>
                        <Divider />
                    </Grid>
                    <DestroyContent />
                </Grid>
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={closeDialog} color='primary'>Cancel</Button>
                <Button type='submit' color='primary'>Save</Button>
            </DialogActions> */}
        </form>
    )
}

export default SettingsForm;