import React, { useState, useEffect, useCallback } from "react";
import { Link } from '@reach/router';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { formatPhoneNumber } from "react-phone-number-input";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import NewMessageForm from "../NewMessageForm";
import useStyles from './styles';
import { getContacts } from '../../api/contacts';
import { sortArrayOfObjects } from "../../helpers/sorting";
import PullToRefresh from "react-simple-pull-to-refresh";

const ContactList = ({ socket, updateTitlebar, incomingMessageCallback }) => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([])
    const [newMessageOpen, setNewMessageOpen] = useState(false);

    const handleNewMessageDialog = () => setNewMessageOpen((prev) => !prev);

    const updateCallback = useCallback(() => {
        updateTitlebar('Messages')

        const handleIncomingMessage = (data) => {
            if (/(messages)/.test(window.location.pathname)) {
                return
            }

            incomingMessageCallback(data)
            setContacts(data)
        }

        const initSocket = () => {
            socket.on('updateContacts', handleIncomingMessage)
            return () => {
                socket.off('updateContacts', handleIncomingMessage)
            }
        }

        const getAndSetContacts = async () => {
            const contacts = await getContacts();
            const sortedContacts = sortArrayOfObjects(contacts, 'lastMessageRecieved', true)

            setContacts(sortedContacts)
        }

        if (contacts.length === 0) {
            getAndSetContacts()
            initSocket()
        }
    }, [contacts.length, updateTitlebar, incomingMessageCallback, socket])

    useEffect(updateCallback, [])

    const handleRefresh = async () => {
        console.log('iresnt')
        const contacts = await getContacts();
        const sortedContacts = sortArrayOfObjects(contacts, 'lastMessageRecieved', true)

        setContacts(sortedContacts)
    }

    return (
        <>
            <List>
                <PullToRefresh onRefresh={handleRefresh} className={classes.pullContainer} pullingContent={' '}>
                    {contacts && Object.values(contacts).map(item => (
                        <Link key={item.phoneNumber} to={`/messages/${item.phoneNumber}`} style={{ textDecoration: 'none' }}>
                            <ListItem divider>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item?.alias || formatPhoneNumber(item?.phoneNumber)}
                                    primaryTypographyProps={{
                                        color: 'textPrimary',
                                        variant: 'h2'
                                    }}
                                    secondary={formatDistanceStrict(new Date(item?.lastMessageRecieved), new Date()) + ' ago'}
                                    secondaryTypographyProps={{
                                        color: 'textSecondary',
                                        variant: 'caption'
                                    }}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </PullToRefresh>
            </List>

            <Fab size='small' color='secondary' aria-label='new message' className={classes.newMessageButton} onClick={handleNewMessageDialog}>
                <AddIcon className={classes.newMessageButtonIcon} />
            </Fab>

            <NewMessageForm open={newMessageOpen} closeDialog={handleNewMessageDialog} />
        </>
    );
};

export default ContactList;

