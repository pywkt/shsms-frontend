import React from 'react';
import { navigate } from '@reach/router';
import { useForm, Controller } from 'react-hook-form';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import * as axios from 'axios';
import { removeContact } from '../../api/contacts';
import { formatPhoneNumber } from 'react-phone-number-input';

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
        <form onSubmit={handleSubmit(updateContactSettings)} style={{ height: '100vh', width: '80vw' }}>
            <DialogContent>
                <Grid item container direction='column'>

                    <Grid item>
                        <Typography variant='caption'>Contact Settings</Typography>
                        <Divider style={{ marginBottom: 16 }} />
                    </Grid>
                    <Grid item container>
                        <Controller
                            control={control}
                            name="contactAlias"
                            defaultValue=''
                            render={({ field }) => 
                                <TextField
                                    fullWidth
                                    label='Alias'
                                    variant='outlined'
                                    placeholder={formatPhoneNumber(phoneNumber) || phoneNumber}
                                    {...field}
                                />}
                        />

                        <Button fullWidth type='submit' variant='contained' color='primary'>Save</Button>

                    </Grid>

                    <Grid item style={{ marginTop: 16 }}>
                        <Typography variant='caption'>Danger</Typography>
                        <Divider />
                    </Grid>

                    <Grid item>
                        <Button fullWidth variant='text' color='secondary' onClick={handleDeleteContact} style={{ marginTop: 20 }}>Delete Contact</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </form>
    )
}

export default ContactSettingsForm;