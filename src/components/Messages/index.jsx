import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { formatPhoneNumber } from "react-phone-number-input";
import { SettingsContext } from '../../context/settingsContext';
import SendMessageForm from '../SendMessageForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import Link from '@material-ui/core/Link';
import useStyles from './styles';
import { getMessages } from '../../api/messages';

const Messages = ({ phoneNumber, updateTitlebar, incomingMessageCallback, socket, location }) => {
    const classes = useStyles({ phoneNumber });
    const settingsContext = useContext(SettingsContext);
    const messagesEndRef = useRef(null)
    const [messages, setMessages] = useState([]);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    const updateCallback = useCallback(() => {
        const { state: locationState } = location

        const handleIncomingMessage = (data) => {
            if (!/(messages)/.test(window.location.pathname)) {
                return
            }

            const mostRecentMessage = data?.data.length - 1

            const dataToSend = {
                phoneNumber: locationState.fromPhoneNumber,
                media: data?.data[mostRecentMessage]?.media?.[0] || null
            }

            incomingMessageCallback(dataToSend, 'messages')
            setMessages(data?.data)
        }

        const getAndUpdateMessages = async () => {
            const allMessages = await getMessages(locationState?.toPhoneNumber, locationState?.fromPhoneNumber)
            setMessages(allMessages?.messages)
            updateTitlebar(allMessages?.alias || formatPhoneNumber(locationState?.fromPhoneNumber) || locationState?.fromPhoneNumber)
        }

        if (messages.length === 0) {
            getAndUpdateMessages()
        }

        const initSocket = () => {
            socket.on('FromApi', handleIncomingMessage)
            return () => {
                socket.off('FromApi')
            }
        }

        initSocket()
    }, [messages.length, updateTitlebar, location, incomingMessageCallback, socket])

    useEffect(updateCallback, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <>
            <List className={classes.messageListContainer}>
                {messages?.length !== 0 && messages?.map((message, index, arr) =>
                    <ListItem
                        key={message._id}
                        className={message?.from === location?.state?.fromPhoneNumber ? classes.recievedSMS : classes.sentSMS}
                    >
                        {message?.media?.length > 0 &&
                            <ListItemText
                                primary={message?.media.map((image, index) => (
                                    <div key={image}>
                                        {settingsContext.settings.showImageLink ?
                                            <Link href={image}>
                                                <div className={classes.imageSMS}>
                                                    <ImageIcon size='small' />
                                                    <span style={{ marginLeft: 5 }} >Image Link</span>
                                                </div>

                                            </Link> :
                                            <Link href={image}>
                                                <img style={{ maxWidth: '100%', marginBottom: 5 }} src={message?.media[index]} alt={`${index} of ${arr?.length} from ${message?.to}`} />
                                            </Link>
                                        }</div>
                                ))}
                                primaryTypographyProps={{
                                    className: message?.from === location?.state?.toPhoneNumber ? classes.recievedSMSTypography : classes.sentSMSTypography,
                                    variant: 'body2'
                                }}
                            >
                            </ListItemText>
                        }

                        {message?.body && <ListItemText
                            primary={message?.body}
                            primaryTypographyProps={{
                                className: message?.from === location?.state?.toPhoneNumber ? classes.recievedSMSTypography : classes.sentSMSTypography,
                                variant: 'body2'
                            }}
                        />}
                    </ListItem>
                )}
            </List>
            <div ref={messagesEndRef} style={{ height: 0, visibility: 'hidden' }} />

            <SendMessageForm phoneNumber={location?.state?.fromPhoneNumber} locationState={location?.state} />
        </>
    )
}

export default Messages;