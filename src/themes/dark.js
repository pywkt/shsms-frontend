import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const dark = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#1e1e1e',
        },
        secondary: {
            main: '#625d5d',
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
    ...globalStyles
})