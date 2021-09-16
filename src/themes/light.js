import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const light = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
    },
    typography: {
        caption: {
            color: 'white !important'
        }
    },
    ...globalStyles
})