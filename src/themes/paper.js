import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const paper = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#444444',
        },
        secondary: {
            main: '#b2b2b2',
        },
        background: {
            default: '#eeeeee',
        },
        text: {
            primary: '#444444',
            secondary: '#444444',
        },
        error: {
            main: '#d70000',
        },
    },
    ...globalStyles
})