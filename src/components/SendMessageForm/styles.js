import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    sendMessageFormContainer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: theme.spacing(1),
        paddingTop: 0,
        lineHeight: theme.typography.pxToRem(12)
    },
    sendMessageFormControls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: theme.palette.background.default
    },
    sendMessageInputLabel: {
        paddingTop: 6,
        '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            paddingTop: '0 !important'
        }
    },
    addPhotoPopupPaper: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(1),
        backgroundColor: theme.palette.text.primary,
        position: 'fixed',
        right: theme.spacing(2.5),
        bottom: theme.spacing(6)
    },
    photoIcon: {
        padding: 0,
        margin: 0,
        cursor: 'pointer'
    },
    mmsPreviewContainer: {
        width: 150,
        height: 150,
        position: 'relative',
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        backgroundSize: 'cover',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: 5,
        boxShadow: `3px 3px 3px rgba(0, 0, 0, 0.2)`
    },
    mmsPreviewCancelButton: {
        position: 'absolute',
        top: -16,
        right: -16,
        zIndex: 2,
        backgroundColor: theme.palette.background.default,
        '&:hover': {
            backgroundColor: theme.palette.background.default
        }
    },
    bottomBlocker: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: 60,
        position: 'fixed',
        bottom: 0,
        left: 0
    },
    addPhotoPopover: {
        backgroundColor: 'transparent !important'
    }
}))