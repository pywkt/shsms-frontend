import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';

const SettingsDrawer = ({ open, onClose, children }) => {
    const classes = useStyles();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            className={classes.settingsDrawer}
        >
            <Grid container direction='column' justifyContent='flex-start' alignItems='center'>
                <Grid item>
                    {children}
                </Grid>

                <Grid
                    item
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    className={classes.settingsDrawerFooter}
                >
                    <Button fullWidth variant='contained' color='primary' onClick={onClose}>Close</Button>
                </Grid>
            </Grid>
        </Drawer>
    )
}

export default SettingsDrawer;