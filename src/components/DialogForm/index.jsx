import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DialogForm = ({ open, closeDialog, cancelText, confirmText, formContent, onSubmit, submitDisabled }) =>
    <Dialog fullWidth open={open} onClose={closeDialog} PaperProps={{ style: { maxHeight: '80%' } }}>
        <form onSubmit={onSubmit}>
            <DialogContent dividers>
                {formContent}
            </DialogContent>

            <DialogActions>
                <Button onClick={closeDialog} color='primary'>{cancelText}</Button>
                <Button disabled={submitDisabled} type='submit' color='primary'>{confirmText}</Button>
            </DialogActions>
        </form>
    </Dialog>

export default DialogForm;