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
import useStyles from './styles';
import { useDoubleClick } from '../../hooks/useDoubleClick';
import SettingsDrawer from '../SettingsDrawer';
import SettingsForm from '../Forms/SettingsForm';
import ContactSettingsForm from '../Forms/ContactSettingsForm';

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
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
    const isOnHome = window.location.pathname === '/';
    const classes = useStyles({ isOnHome });

    const handleRefresh = useDoubleClick(null, () => window.location.reload())
    const handleSettingsDrawer = () => setSettingsDrawerOpen((prev) => !prev);
    const handleGoBack = () => navigate('/');

    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        {!isOnHome &&
                            <IconButton size='small' onClick={handleGoBack} className={classes.appBarIcons}><ArrowBackIosIcon /></IconButton>
                        }
                        <Typography variant='h1' color='initial' className={classes.headerBarTitle} onClick={handleRefresh}>{label}</Typography>
                        <IconButton size='small' onClick={handleSettingsDrawer} className={classes.appBarIcons}><TuneIcon /></IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Container>
                <Box my={10}>
                    {children}
                </Box>
            </Container>

            <SettingsDrawer open={settingsDrawerOpen} onClose={handleSettingsDrawer}>{isOnHome ? <SettingsForm /> : <ContactSettingsForm />}</SettingsDrawer>
        </>
    )
}

export default HeaderBar;