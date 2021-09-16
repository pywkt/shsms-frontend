import { createTheme } from '@material-ui/core'
import { globalStyles } from './globalStyles';

export const b00bs = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#f44c7f',
        },
        secondary: {
            main: '#939eae',
        },
        text: {
            primary: '#e9ecf0',
            secondary: '#b6c1c9',
        },
        background: {
            paper: '#333a45',
            default: '#272831',
        },
        error: {
            main: '#da3333',
        },
        warning: {
            main: '#ff9800',
        },
    },
    ...globalStyles
})