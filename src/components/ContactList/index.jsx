import React, { useState, useEffect, useCallback, useContext } from "react";
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';
import NewMessageForm from "../NewMessageForm";
import { getContacts } from '../../api/contacts';
import { groupArrayOfObjects } from "../../helpers/sorting";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ConnectedNumbersList from "./ConnectedNumbersList";
import { SettingsContext } from "../../context/settingsContext";
import { updateSettings } from "../../api/settings";

const ContactList = ({ socket, updateTitlebar, incomingMessageCallback }) => {
    const classes = useStyles();
    const settingsContext = useContext(SettingsContext)
    const [contacts, setContacts] = useState([])
    const [newMessageOpen, setNewMessageOpen] = useState(false);
    const handleNewMessageDialog = () => setNewMessageOpen((prev) => !prev);

    const updateCallback = useCallback(() => {
        updateTitlebar('Messages')

        const getAndSetContacts = async () => {
            const contacts02 = await getContacts();
            const groupedContacts = groupArrayOfObjects(contacts02, 'toPhoneNumber')
            const sortOrder = settingsContext.settings.connectedNumbersOrder

            setContacts(Object.entries(groupedContacts).sort((a, b) => sortOrder.indexOf(a[0]) - sortOrder.indexOf(b[0])))
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
    }, [contacts.length, updateTitlebar, incomingMessageCallback, socket, settingsContext])

    useEffect(updateCallback, [])

    // const handleRefresh = async () => {
    //     const contacts03 = await getContacts();
    //     const groupedContacts = groupArrayOfObjects(contacts03, 'toPhoneNumber')

    //     setContacts(Object.entries(groupedContacts))
    // }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragStart = useCallback(() => { }, []);

    const onDragUpdate = useCallback(() => { }, []);

    const onDragEnd = useCallback((result) => {
        if (!result.destination) { return; }

        const newOrder = reorder(contacts, result.source.index, result.destination.index);

        setContacts(newOrder);

        const updatedContactOrder = newOrder.map(item => item[0]);

        const updateDBandContext = async () => {
            try {
                await updateSettings({ ...settingsContext.settings, connectedNumbersOrder: updatedContactOrder })
                settingsContext.setSettings({ ...settingsContext.settings, connectedNumbersOrder: updatedContactOrder })
            } catch (err) {
                throw err
            }
        }

        updateDBandContext()
    },
        [contacts, settingsContext]
    );

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
                                <ConnectedNumbersList contacts={contacts} />
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

