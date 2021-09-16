import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import * as axios from 'axios';

const ContactSettingsForm = ({ closeDialog }) => {
    const { control, handleSubmit } = useForm();

    const phoneNumber = /[^/]*$/.exec(window.location.pathname)[0]

    const updateContactSettings = async (data) => {
        await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/settings/updateAlias/${phoneNumber}`,
            {
                phoneNumber,
                newAlias: data.contactAlias
            })

        window.location.reload()

    }

    return (
        <form onSubmit={handleSubmit(updateContactSettings)}>
            <DialogContent dividers>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='caption'>Contact Settings</Typography>
                        <Divider />
                    </Grid>

                    <Grid item>
                        <Controller
                            control={control}
                            name="contactAlias"
                            defaultValue=''
                            render={({ field }) =>
                                <TextField
                                    fullWidth
                                    label='Alias'
                                    variant='outlined'
                                    {...field}
                                />}
                        />
                    </Grid>


                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeDialog} color='primary'>Cancel</Button>
                <Button type='submit' color='primary'>Save</Button>
            </DialogActions>
        </form>
    )
}

export default ContactSettingsForm;