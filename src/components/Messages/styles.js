import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => {
    const smsStyles = {
        padding: `${theme.spacing(.8)}px ${theme.spacing(1)}px`,
        borderRadius: 5
    }
    return ({
        recievedSMS: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
        },
        sentSMS: {
            display: 'flex',
            textAlign: 'left',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: 0,
        },
        recievedSMSTypography: {
            ...smsStyles,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            maxWidth: '60vw',
            wordBreak: 'break-word',
            '& a': {
                color: `${theme.palette.primary.contrastText} !important`
            }
        },
        sentSMSTypography: {
            ...smsStyles,
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            maxWidth: '60vw',
            wordBreak: 'break-word',
            '& a': {
                color: `${theme.palette.secondary.contrastText} !important`
            }
        },
        imageSMS: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    })
})