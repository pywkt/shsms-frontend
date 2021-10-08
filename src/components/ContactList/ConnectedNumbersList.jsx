import React, { useContext } from "react";
import { formatPhoneNumber } from "react-phone-number-input";
import { SettingsContext } from "../../context/settingsContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ReceivedMessageList from "./ReceivedMessageList";
import { updateSettings } from "../../api/settings";
import { useTheme } from '@material-ui/core'
import { Draggable } from "react-beautiful-dnd";

const ConnectedNumbersList = ({ contacts }) => {
    const theme = useTheme();
    const classes = useStyles();
    const settingsContext = useContext(SettingsContext)

    const handleOpenList = (listIndex) => {
        const callUpdateSettings = async (data) => {
            await updateSettings({
                ...settingsContext.settings,
                openLists: data
            })

            settingsContext.setSettings({ ...settingsContext.settings, openLists: data })
        }

        if (settingsContext.settings?.openLists?.indexOf(listIndex) === -1) {
            callUpdateSettings([...settingsContext.settings?.openLists, listIndex])
        } else {
            const allOpenLists = settingsContext.settings?.openLists
            const updatedListArray = allOpenLists.filter(item => item !== listIndex)
            callUpdateSettings(updatedListArray)
        }
    }

    const updateStyle = (isDragging) => ({
        border: isDragging && `1px dashed ${theme.palette.secondary.dark}`,
        padding: isDragging && theme.spacing(1),
        position: 'relative',
        left: 0,
        top: 0
    })

    return (
        <>
            {contacts && contacts.map((item, index) => (
                <Draggable key={item?.[0]} draggableId={item[0]} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div key={item?.[0]} style={{
                                ...updateStyle(snapshot.isDragging),
                                background: theme.palette.background.default,
                            }}>
                                <ListItem disableGutters button onClick={() => handleOpenList(item?.[0])} className={classes.collapsablePanel}>
                                    <ListItemText
                                        primary={formatPhoneNumber(item?.[0])}
                                        primaryTypographyProps={{ color: 'textPrimary', variant: 'body2' }}
                                    />
                                    {settingsContext.settings?.openLists?.includes(item[0]) ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                                <Collapse in={settingsContext.settings?.openLists?.indexOf(item?.[0]) !== -1} timeout="auto" unmountOnExit>
                                    <List key={index} dense disablePadding>
                                        <ReceivedMessageList message={item} />
                                    </List>
                                </Collapse>
                            </div>
                        </div>
                    )}
                </Draggable>
            ))}
        </>
    )
}

export default ConnectedNumbersList;