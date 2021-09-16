import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    newMessageButton: {
        position: 'absolute',
        right: theme.spacing(2),
        bottom: theme.spacing(2)
    },
    newMessageButtonIcon: {
        fill: theme.palette.primary.contrastText
    }
}))