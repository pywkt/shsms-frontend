import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    settingsDrawer: {
        position: 'relative',
        // maxWidth: '80vw'
    },
    settingsDrawerFooter: {
        color: 'pink',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: theme.spacing(2)
    }
}))