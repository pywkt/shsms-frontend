import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    newMessageButton: {
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2)
    },
    newMessageButtonIcon: {
        fill: theme.palette.primary.contrastText
    },
    pullContainer: {
        height: '70vh',
        color: theme.palette.primary.contrastText,
        '& .lds-ellipsis div': {
            background: theme.palette.secondary.main
        }
    }
}))