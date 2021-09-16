import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SettingsForm from '../Forms/SettingsForm';
import ContactSettingsForm from '../Forms/ContactSettingsForm';

const SettingsDialog = ({ open, closeDialog, phoneNumber }) => {
    const isMessages = /(messages)/.test(window.location.pathname)

    return (
        <Dialog fullWidth open={open} onClose={closeDialog} PaperProps={{ style: { maxHeight: '70%' } }}>
            {isMessages ?
                <ContactSettingsForm closeDialog={closeDialog} />
                :
                <SettingsForm closeDialog={closeDialog} />
            }
        </Dialog>
    )
}

export default SettingsDialog;