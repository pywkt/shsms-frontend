import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DialogCancelConfirm = () => {
    return (
        <Dialog fullWidth open>
            <DialogContent>
                Are you sure?
                <Button variant='contained'>Cancel</Button>
                <Button variant='contained'>Burn it all</Button>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCancelConfirm;