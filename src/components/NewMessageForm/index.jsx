import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DialogForm from '../DialogForm';
import PhoneNumberInput from './PhoneNumberInput';
import { sendMessage } from '../../api/messages';
import { checkPermissionContacts } from '../../modules/contacts';
import { parsePhoneNumber } from 'react-phone-number-input';

const NewMessageForm = ({ open, closeDialog, connectedNumbers }) => {
    const { control, handleSubmit, getValues, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [newNumberSelected, setNewNumberSelected] = useState(false);
    const [showDeviceContacts, setShowDeviceContacts] = useState(false);
    const [numbersFromContacts, setNumbersFromContacts] = useState('')

    const isWeb = Capacitor.getPlatform() === 'web'

    const submitNewMessageForm = async (data) => {
        setLoading(true)
        const updatedData = {
            fromPhoneNumber: !showDeviceContacts ? data.phoneNumber : parsePhoneNumber(data.fromContacts.replace(/[^0-9,+]/g, ''))?.number,
            toPhoneNumber: data.fromPhoneNumber,
            date: new Date().toISOString(),
            message: data.message
        }

        const initSendMessage = await sendMessage(updatedData)

        if (initSendMessage.status === 200) {
            setLoading(false)
            closeDialog()
        }
    }

    const handleNewNumber = () => setNewNumberSelected(prev => !prev)

    const handleNewNumberFromContacts = async () => {
        const cb = (contactData) => setNumbersFromContacts(contactData)
        await checkPermissionContacts(cb)

        setShowDeviceContacts(prev => !prev)
    }

    const SendNewMessageForm = () =>
        <>
            {(connectedNumbers?.length > 0 && newNumberSelected === false) ?
                <Controller
                    control={control}
                    name="fromPhoneNumber"
                    defaultValue={connectedNumbers?.[0]}
                    render={({ field }) => (
                        <>
                            <TextField select fullWidth value={connectedNumbers[0]} variant='outlined' {...field}>
                                <MenuItem value="newNumber" onClick={handleNewNumber}>New Phone Number</MenuItem>
                                {connectedNumbers.length > 0 && connectedNumbers.map(number => (
                                    <MenuItem key={number} value={number}>{number}</MenuItem>
                                ))}

                            </TextField>
                        </>
                    )
                    }
                /> :
                <>
                    <Controller
                        control={control}
                        name="fromPhoneNumber"
                        label='From'
                        render={() =>
                            <PhoneNumberInput
                                id="fromPhoneNumber"
                                onChange={(e) => setValue('fromPhoneNumber', e)}
                                value={getValues().fromPhoneNumber}
                                label="From"
                            />
                        }
                    />
                    {connectedNumbers?.length > 0 && <Typography variant='caption' color='textSecondary' onClick={handleNewNumber}>+ Select from list</Typography>}
                </>
            }

            {showDeviceContacts === true ?
                <Controller
                    control={control}
                    name="fromContacts"
                    defaultValue='Select a contact'
                    render={({ field }) => (
                        <>
                            <TextField select fullWidth value="" variant="outlined" {...field}>
                                <MenuItem value="Select a contact">Select a contact</MenuItem>
                                {numbersFromContacts?.length > 0 && numbersFromContacts.map(contact => (
                                    <MenuItem key={contact?.id} value={contact.phoneNumbers[0].value} onClick={setValue('phoneNumber', contact.phoneNumbers[0].value)}>{contact.displayName}</MenuItem>
                                ))}

                            </TextField>
                        </>
                    )}
                /> :

                <Controller
                    control={control}
                    name="phoneNumber"
                    render={() =>
                        <PhoneNumberInput
                            id="phoneNumber"
                            onChange={(e) => setValue('phoneNumber', e)}
                            value={getValues().phoneNumber}
                            label="To"
                        />
                    }
                />
            }

            {!isWeb && <Typography variant='caption' color='textSecondary' onClick={handleNewNumberFromContacts}>{showDeviceContacts ? "Enter number manually" : "+ Select from contacts"}</Typography>}

            <Controller
                control={control}
                name="message"
                defaultValue=''
                render={({ field }) =>
                    <TextField
                        fullWidth
                        multiline
                        label='Message'
                        variant='outlined'
                        minRows={10}
                        {...field}
                    />}
            />
        </>

    return (
        <DialogForm
            open={open}
            closeDialog={closeDialog}
            cancelText='Cancel'
            confirmText='Send'
            onSubmit={handleSubmit(submitNewMessageForm)}
            submitDisabled={loading}
            formContent={<SendNewMessageForm />}
        />
    )
}

export default NewMessageForm;