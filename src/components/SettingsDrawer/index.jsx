import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
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
                    className={classes.settingsDrawerFooter}
                >
                    <Button
                        fullWidth
                        variant='text'
                        color='primary'
                        size='medium'
                        onClick={onClose}
                        endIcon={<NavigateNextIcon />}
                        classes={{ text: classes.closeButton }}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    )
}

export default SettingsDrawer;