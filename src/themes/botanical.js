import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const botanical = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#495755',
        },
        secondary: {
            main: '#f59a71',
        },
        background: {
            default: '#eaf1f3',
            paper: '#d8e3e6',
        },
        text: {
            primary: '#495755',
        },
        error: {
            main: '#f6c9b4',
        },
    },
    ...globalStyles
})