import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    settingsDrawer: {
        position: 'relative',
    },
    settingsDrawerFooter: {
        color: 'pink',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        justifyContent: 'flex-end'
    }
}))