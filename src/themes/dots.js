import { createTheme } from "@material-ui/core";
import { globalStyles } from "./globalStyles";

export const dots = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#ffd543',
        },
        secondary: {
            main: '#9261ff',
        },
        background: {
            default: '#121520',
            paper: '#121520',
        },
        error: {
            main: '#f94348',
        },
        info: {
            main: '#3cc5f8',
        },
        success: {
            main: '#4acb8a',
        },
    },
    ...globalStyles
})