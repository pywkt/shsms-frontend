import { makeStyles } from '@material-ui/core';

const handWidth = '.1rem'
const clockSize = '2rem'

export default makeStyles((theme) => ({
    loaderContainer: {
        minHeight: '100vh',
        width: '100vw',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#1e1c49',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    loadingText: {
        fontSize: 13,
        fontStyle: 'italic',
        color: 'pink',
        marginTop: 30
    },
    clockLoader: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: clockSize,
        height: clockSize,
        border: '2px solid pink',
        borderRadius: '50%',

        '&::before, &::after': {
            position: 'absolute',
            content: '""',
            top: `calc(calc(${clockSize} / 2) * 0.25)`,
            width: handWidth,
            background: 'pink',
            borderRadius: '100px',
            transformOrigin: `center calc(100% - calc(${handWidth} / 2))`,
            animation: `$spin infinite linear`,
        },

        '&::before': {
            height: `calc(${clockSize} * 0.4)`,
            animationDuration: '6s',
        },

        '&::after': {
            top: `calc(calc(${clockSize} / 2) * 0.25 + calc(${clockSize} * 0.2))`,
            height: `calc(${clockSize} * 0.2)`,
            animationDuration: '30s',
        }
    },

    '@keyframes spin': {
        to: {
            transform: 'rotate(1turn)',
        },
        // '100%': {
        //     transform: 'rotate(0turn)'
        // }
    }

}))