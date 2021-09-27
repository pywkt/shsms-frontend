import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { formatPhoneNumber } from 'react-phone-number-input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { sendImage, sendMessage } from '../../api/messages';
import SendButton from './SendButton';
import useStyles from './styles';

const SendMessageForm = ({ phoneNumber, locationState }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [inputType, setInputType] = useState('text');
    const [imageToSend, setImageToSend] = useState({});

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            phoneNumber: locationState?.fromPhoneNumber,
            photo: ''
        }
    });

    const handleImageCallback = (image) => {
        setImageToSend(image.dataUrl)
        setInputType('photo')
        setValue('photo', image.dataUrl)
    }

    const onSubmit = async (data) => {
        setLoading(true)

        if (inputType === 'text') {
            const updatedData = {
                fromPhoneNumber: locationState?.fromPhoneNumber,
                toPhoneNumber: locationState?.toPhoneNumber,
                date: new Date().toISOString(),
                message: data.message
            }

            const sendStatus = await sendMessage(updatedData)
            if (sendStatus.status === 200) {
                setLoading(false)
            }

            setValue('message', '')
        } else {
            const imageUrl = await sendImage(data.photo)

            if (imageUrl?.status === 200) {
                const updatedDataWithImage = {
                    fromPhoneNumber: locationState?.fromPhoneNumber,
                    toPhoneNumber: locationState?.toPhoneNumber,
                    date: new Date().toISOString(),
                    message: '',
                    attachedMedia: [imageUrl?.imageUrl] || null
                }

                const sendStatus = await sendMessage(updatedDataWithImage)

                if (sendStatus?.status === 200) {
                    setLoading(false)
                    handleCancelSendImage()
                }
            }
        }
    }

    const handleCancelSendImage = () => {
        setInputType('text');
        setValue('photo', '')
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} id='myForm'>
            <div className={classes.bottomBlocker} />

            <Grid container justifyContent='center' alignItems='center' className={classes.sendMessageFormContainer}>
                <Controller
                    name="message"
                    control={control}
                    defaultValue=''
                    fullWidth
                    render={({ field }) => (
                        <>
                            {inputType === 'text' ?
                                <Grid item xs={12} className={classes.sendMessageFormControls}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label='Message'
                                        placeholder={`Sending from ${formatPhoneNumber(locationState?.toPhoneNumber)}`}
                                        variant='outlined'
                                        InputProps={{
                                            endAdornment: <SendButton cb={handleImageCallback} loading={loading} />
                                        }}
                                        {...field}
                                    />
                                </Grid>
                                :
                                <>
                                    <Grid item xs={12} className={classes.sendMessageFormControls}>
                                        <div
                                            className={classes.mmsPreviewContainer}
                                            style={{ backgroundImage: `url('${imageToSend}')` }}
                                        >
                                            <IconButton disableRipple disableFocusRipple onClick={handleCancelSendImage} className={classes.mmsPreviewCancelButton} size='small'>
                                                <CancelRoundedIcon />
                                            </IconButton>
                                        </div>

                                        <SendButton cb={handleImageCallback} loading={loading} />
                                    </Grid>
                                </>
                            }
                        </>
                    )}
                />
            </Grid>
        </form>
    )
}

export default SendMessageForm;