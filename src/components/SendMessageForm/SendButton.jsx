import React, { useRef, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import Repeatable from 'react-repeatable';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import { Camera, CameraResultType } from '@capacitor/camera';

const SendButton = ({ loading, cb }) => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const holdRef = useRef(0)

    const whileHolding = () => {
        holdRef.current = holdRef.current += 1

        if (holdRef.current === 12) {
            handlePopover()
        }
    }

    const resetCount = () => holdRef.current = 0

    const handlePopover = () => {
        setMenuOpen(true)
    }

    const handleClose = () => setMenuOpen(false);

    const handleAddPhoto = () => {
        takePicture();
    }

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        })

        cb(image)
    }

    return (
        <>
            <div>
                <IconButton
                    disabled={loading}
                    aria-label='send'
                    type='submit'
                    onMouseDown={(e) => setAnchorEl(e.currentTarget)}
                >
                    <Repeatable
                        repeatDelay={500}
                        repeatInterval={32}
                        onHold={whileHolding}
                        onHoldEnd={resetCount}
                        style={{ marginBottom: -5 }}
                    >
                        <SendRoundedIcon />
                    </Repeatable>
                </IconButton>
            </div>

            <Popover
                id='add-photo-popover'
                open={menuOpen}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleClose}
                elevation={0}
                className={classes.addPhotoPopover}
                PaperProps={{
                    className: classes.addPhotoPopover,
                    elevation: 0
                }}
            >
                <Paper elevation={0} className={classes.addPhotoPopupPaper}>
                    <PhotoCameraRoundedIcon className={classes.photoIcon} onClick={handleAddPhoto} color='secondary' />
                </Paper>
            </Popover>
        </>
    )
}

export default SendButton;