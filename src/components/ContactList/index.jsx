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
import { groupArrayOfObjects } from "../../helpers/sorting";
import PullToRefresh from "react-simple-pull-to-refresh";

const ContactList = ({ socket, updateTitlebar, incomingMessageCallback }) => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([])
    const [newMessageOpen, setNewMessageOpen] = useState(false);

    const handleNewMessageDialog = () => setNewMessageOpen((prev) => !prev);

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

            incomingMessageCallback(data)
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

    return (
        <>
            <List>

                {/* receiving number */}
                {contacts && contacts?.map((item, index) => (
                    <div key={item?.[0]}>
                        <ListItemText primary={item?.[0]} primaryTypographyProps={{ color: 'textPrimary', variant: 'h2' }} />

                        <List key={index}>

                            {/* number that sent the text */}
                            {item?.[1]?.map(itemContact => (
                                <Link
                                    key={itemContact?._id}
                                    to={`/messages/${itemContact.toPhoneNumber}/${itemContact.phoneNumber}`}
                                    state={{ toPhoneNumber: itemContact.toPhoneNumber, fromPhoneNumber: itemContact.phoneNumber }}
                                >
                                    <ListItemText primary={itemContact?.alias || itemContact?.phoneNumber} primaryTypographyProps={{ color: 'textSecondary', variant: 'h4' }} />
                                </Link>
                            ))}
                        </List>

                    </div>
                ))}

                {/* <PullToRefresh onRefresh={handleRefresh} className={classes.pullContainer} pullingContent={' '}>
                    {contacts && Object.values(contacts).map(item => (
                        <Link key={item._id} to={`/messages/${item.phoneNumber}`} style={{ textDecoration: 'none' }}>
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
                </PullToRefresh> */}
            </List>

            <Fab size='small' color='secondary' aria-label='new message' className={classes.newMessageButton} onClick={handleNewMessageDialog}>
                <AddIcon className={classes.newMessageButtonIcon} />
            </Fab>

            <NewMessageForm open={newMessageOpen} closeDialog={handleNewMessageDialog} />
        </>
    );
};

export default ContactList;

