import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.background.default
        }
    },
    appBarIcons: {
        '& svg': {
            fill: theme.palette.primary.contrastText
        }
    },
    headerBarTitle: {
        flexGrow: 1,
        paddingLeft: (styles) => styles.isOnHome ? theme.spacing(2) : 0
    }
}))