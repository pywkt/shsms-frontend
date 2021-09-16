import React, { useState } from 'react';
import { navigate } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import TuneIcon from '@material-ui/icons/Tune';
import IconButton from '@material-ui/core/IconButton';
import SettingsDialog from '../SettingsDialog';
import useStyles from './styles';

const HideOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction='down' in={!trigger}>
            {children}
        </Slide>
    )
}

const HeaderBar = ({ label, children }) => {
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const isOnHome = window.location.pathname === '/';
    const classes = useStyles({ isOnHome });

    const handleSettingsDialog = () => setSettingsDialogOpen((prev) => !prev);
    const handleGoBack = () => navigate('/');

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        {!isOnHome &&
                            <IconButton size='small' onClick={handleGoBack} className={classes.appBarIcons}><ArrowBackIosIcon /></IconButton>
                        }
                        <Typography variant='h1' color='initial' className={classes.headerBarTitle}>{label}</Typography>
                        <IconButton size='small' onClick={handleSettingsDialog} className={classes.appBarIcons}><TuneIcon /></IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Container>
                <Box my={10}>
                    {children}
                </Box>
            </Container>

            <SettingsDialog
                open={settingsDialogOpen}
                closeDialog={handleSettingsDialog}
            />
        </>
    )
}

export default HeaderBar;