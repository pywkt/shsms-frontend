import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const magicGirl = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#f5b1cc',
            
        },
        secondary: {
            main: '#00ac8c',
            contrastText: '#fff'
        },
        background: {
            default: '#ffffff',
        },
        text: {
            primary: '#00ac8c',
        },
    },
    ...globalStyles
})