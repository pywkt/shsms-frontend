import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import DialogForm from '../DialogForm';
import PhoneNumberInput from './PhoneNumberInput';
import { sendMessage } from '../../api/messages';
// import ContactsX from 'cordova-plugin-contacts-x';

const NewMessageForm = ({ open, closeDialog }) => {
    const { control, handleSubmit, getValues, setValue } = useForm();
    const [loading, setLoading] = useState(false);

    const submitNewMessageForm = async (data) => {
        setLoading(true)
        const updatedData = {
            phoneNumber: data.phoneNumber,
            date: new Date().toISOString(),
            message: data.message
        }

        const initSendMessage = await sendMessage(updatedData)

        if (initSendMessage.status === 200) {
            setLoading(false)
            closeDialog()
        }
    }

    const SendNewMessageForm = () =>
        <>
            <Controller
                control={control}
                name="phoneNumber"
                render={() =>
                    <PhoneNumberInput
                        id="phoneNumber"
                        onChange={(e) => setValue('phoneNumber', e)}
                        value={getValues().phoneNumber}
                    />
                }
            />

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