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
    },
    collapsablePanel: {
        '& svg': {
            fill: theme.palette.text.primary
        }
    },
    contactsListAvatar: {
        maxWidth: 35, 
        maxHeight: 35, 
        color: theme.palette.text.secondary, 
        backgroundColor: theme.palette.background.default
    },
    fromNumberListItem: {
        '&:last-child': {
            marginBottom: theme.spacing(2)
        }
    },
}))