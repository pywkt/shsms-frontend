import { createTheme } from "@material-ui/core";
import { globalStyles } from "./globalStyles";

export const monokai = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#66d9ef',
        },
        secondary: {
            main: '#f92672',
        },
        background: {
            default: '#272822',
            paper: '#3f3f3f',
        },
        text: {
            primary: '#a6e22e',
            secondary: '#f92672',
        },
        error: {
            main: '#fd971f',
        },
    },
    ...globalStyles
})