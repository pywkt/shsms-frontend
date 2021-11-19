import React, { useState } from 'react';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';

const SettingsDrawer = ({ open, onClose, children }) => {
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(prev => !prev)
    }

    return (
        <Drawer
            anchor="right"
            open
            onClose={onClose}
            onOpen={toggleDrawer}
            className={classes.settingsDrawer}
        >
            <Grid container direction='column' justifyContent='flex-start' alignItems='center'>
                {/* <Grid item>
                    close button
                </Grid> */}

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