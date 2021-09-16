import { createTheme } from '@material-ui/core';
import { globalStyles } from './globalStyles';

export const bento = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ff7a90',
            contrastText: '#2d394d',
        },
        secondary: {
            main: '#4a768d',
        },
        background: {
            default: '#2d394d',
            paper: '#1d232d',
        },
        text: {
            primary: '#fffaf8',
        },
        error: {
            main: '#ee2a3a',
        },
    },
    ...globalStyles
})
