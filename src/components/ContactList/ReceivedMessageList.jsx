import React from 'react';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { formatPhoneNumber } from "react-phone-number-input";
import { Link } from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import { sortArrayOfObjects } from "../../helpers/sorting";
import useStyles from './styles';

const ReceivedMessageList = ({ message }) => {
    const classes = useStyles();

    return (
        <>
            {sortArrayOfObjects(message?.[1], 'lastMessageRecieved', true).map(itemContact => (
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
        </>
    )
}

export default ReceivedMessageList;