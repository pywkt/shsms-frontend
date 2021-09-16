import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const nautilus = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ebb723',
        },
        secondary: {
            main: '#da3333',
        },
        background: {
            default: '#132237',
            paper: '#121d2d',
        },
        text: {
            primary: '#1cbaac',
        },
        info: {
            main: '#0b4c6c',
        },
    },
    ...globalStyles
})