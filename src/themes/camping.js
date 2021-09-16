import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const camping = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#618c56',
        },
        secondary: {
            main: '#c2b8aa',
        },
        background: {
            default: '#faf1e4',
            paper: '#ffffff',
        },
        text: {
            primary: '#3c403b',
            secondary: '#3c403b',
        },
        error: {
            main: '#ad4f4e',
        },
    },
    ...globalStyles
})