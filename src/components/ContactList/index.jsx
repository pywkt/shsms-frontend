import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from '@reach/router';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { formatPhoneNumber } from "react-phone-number-input";
import { SettingsContext } from "../../context/settingsContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import PullToRefresh from "react-simple-pull-to-refresh";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NewMessageForm from "../NewMessageForm";
import { getContacts } from '../../api/contacts';
import { updateSettings } from "../../api/settings";
import { groupArrayOfObjects, sortArrayOfObjects } from "../../helpers/sorting";
import { useTheme } from '@material-ui/core'
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from "react-beautiful-dnd";


const ContactList = ({ socket, updateTitlebar, incomingMessageCallback }) => {
    const theme = useTheme();
    const classes = useStyles();
    const settingsContext = useContext(SettingsContext)
    const [contacts, setContacts] = useState([])
    const [newMessageOpen, setNewMessageOpen] = useState(false);
    const handleNewMessageDialog = () => setNewMessageOpen((prev) => !prev);

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

    const updateCallback = useCallback(() => {
        updateTitlebar('Messages')

        const getAndSetContacts = async () => {
            const contacts02 = await getContacts();
            const groupedContacts = groupArrayOfObjects(contacts02, 'toPhoneNumber')

            setContacts(Object.entries(groupedContacts))
        }

        const handleIncomingMessage = async (data) => {
            if (/(messages)/.test(window.location.pathname)) {
                return
            }

            incomingMessageCallback(data, 'contacts')
            getAndSetContacts()
        }

        const initSocket = () => {
            socket.on('updateContacts', handleIncomingMessage)
            return () => {
                socket.off('updateContacts', handleIncomingMessage)
            }
        }

        if (contacts.length === 0) {
            getAndSetContacts()
            initSocket()
        }
    }, [contacts.length, updateTitlebar, incomingMessageCallback, socket])

    useEffect(updateCallback, [])

    const handleRefresh = async () => {
        const contacts03 = await getContacts();
        const groupedContacts = groupArrayOfObjects(contacts03, 'toPhoneNumber')

        setContacts(Object.entries(groupedContacts))
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragStart = useCallback(() => { }, []);

    const onDragUpdate = useCallback(() => { }, []);

    const onDragEnd = useCallback(
        (result) => {
            if (!result.destination) {
                return;
            }

            const newItems = reorder(
                contacts,
                result.source.index,
                result.destination.index
            );

            setContacts(newItems);
            // update settingsContext to store the order here
        },
        [contacts]
    );

    const updateStyle = (isDragging) => ({
        border: isDragging && `1px dashed ${theme.palette.secondary.dark}`,
        padding: isDragging && theme.spacing(1)
    })

    return (
        <>
            <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                onDragUpdate={onDragUpdate}
            >
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div ref={provided.innerRef}>
                            <List disablePadding>
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

                                                            {/* number that sent the text */}
                                                            {sortArrayOfObjects(item?.[1], 'lastMessageRecieved', true).map(itemContact => (
                                                                <Link
                                                                    key={itemContact?._id}
                                                                    to={`/messages/${itemContact.toPhoneNumber}/${itemContact.phoneNumber}`}
                                                                    state={{ toPhoneNumber: itemContact.toPhoneNumber, fromPhoneNumber: itemContact.phoneNumber }}
                                                                    style={{ textDecoration: 'none' }}
                                                                >
                                                                    <ListItem divider className={classes.fromNumberListItem}>
                                                                        <ListItemAvatar>
                                                                            <Avatar className={classes.contactsListAvatar} />
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={itemContact?.alias || formatPhoneNumber(itemContact?.phoneNumber)}
                                                                            primaryTypographyProps={{ color: 'textSecondary', variant: 'h3' }}
                                                                            secondary={formatDistanceStrict(new Date(itemContact?.lastMessageRecieved), new Date()) + ' ago'}
                                                                            secondaryTypographyProps={{
                                                                                color: 'textSecondary',
                                                                                variant: 'caption'
                                                                            }}
                                                                        />
                                                                    </ListItem>
                                                                </Link>
                                                            ))}
                                                        </List>
                                                    </Collapse>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </List>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* <List disablePadding>
                <PullToRefresh onRefresh={handleRefresh} className={classes.pullContainer} pullingContent={' '}>
                </PullToRefresh>
            </List> */}

            <Fab size='small' color='secondary' aria-label='new message' className={classes.newMessageButton} onClick={handleNewMessageDialog}>
                <AddIcon className={classes.newMessageButtonIcon} />
            </Fab>

            <NewMessageForm open={newMessageOpen} closeDialog={handleNewMessageDialog} connectedNumbers={contacts?.length !== 0 && contacts.map(num => num[0])} />
        </>
    );
};

export default ContactList;

