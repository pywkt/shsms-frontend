import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { dropTables } from '../../api/settings';
import { themeList } from '../../data/themeList';
import { SettingsContext } from '../../context/settingsContext';
import { updateSettings } from '../../api/settings';

const SettingsForm = ({ closeDialog }) => {
    const currentSettings = useContext(SettingsContext)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            newTheme: currentSettings?.settings?.theme?.slug
        }
    });

    const handleImageLinkSwitch = (e) => {
        currentSettings.setSettings({ ...currentSettings.settings, showImageLink: !currentSettings.settings.showImageLink })
    }

    const submitNewSettings = async (data) => {
        const result = await updateSettings({
            ...currentSettings.settings, theme: { currentTheme: currentSettings.settings.theme.slug, newTheme: data.newTheme }
        })

        const findThemeResult = await themeList.find(i => i.slug === result.theme && i)
        
        currentSettings.setSettings({
            ...result.settings,
            _id: result._id,
            theme: findThemeResult,
            showImageLink: result.showImageLink,
            openLists: result.openLists
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

    return (
        <form onSubmit={handleSubmit(submitNewSettings)}>
            <DialogContent dividers>
                <Grid container direction='column' spacing={2}>
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

                    <Grid item>
                        <Grid item container justifyContent='space-between'>
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
                    </Grid>

                    <Grid item>
                        <Typography variant='caption'>Danger</Typography>
                        <Divider />
                    </Grid>
                    <DestroyContent />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color='primary'>Cancel</Button>
                <Button type='submit' color='primary'>Save</Button>
            </DialogActions>
        </form>
    )
}

export default SettingsForm;