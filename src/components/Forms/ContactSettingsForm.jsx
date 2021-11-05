import React from 'react';
import { navigate } from '@reach/router';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import * as axios from 'axios';
import { removeContact } from '../../api/contacts';

const ContactSettingsForm = ({ closeDialog }) => {
    const { control, handleSubmit } = useForm();
    const reg = /([+])([^/])*/g
    const phoneNumberGroup = window.location.pathname.match(reg)
    const phoneNumber = phoneNumberGroup[1]
    const toPhoneNumber = phoneNumberGroup[0]

    const updateContactSettings = async (data) => {
        await axios.post(`${process.env.REACT_APP_SMS_SERVER_URL}/contacts/updateAlias`,
            {
                phoneNumber,
                toPhoneNumber,
                newAlias: data.contactAlias
            },
            { headers: { "enc": process.env.REACT_APP_KEY_HASH } })

        window.location.reload()
    }

    const handleDeleteContact = async () => {
        await removeContact(toPhoneNumber, phoneNumber)
        closeDialog()
        navigate('/')

    }

    return (
        <form onSubmit={handleSubmit(updateContactSettings)}>
            <DialogContent dividers>

                <Grid item>
                    <Typography variant='caption'>Contact Settings</Typography>
                </Grid>
                <Grid container item direction='column'>
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
                        <Grid item>
                            <Button fullWidth variant='contained' color='secondary' onClick={handleDeleteContact} style={{ marginTop: 20 }}>Delete Contact</Button>
                        </Grid>

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