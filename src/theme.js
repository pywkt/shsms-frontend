import { createTheme } from "@material-ui/core/styles";

export default createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#2F5061',
            light: '#4297A0',
            dark: '#2F5061',
        },
        secondary: {
            main: '#E57F84',
            light: '#FFE4E4',
            dark: '#AA4B53',
        },
        text: {
            primary: '#2F5061',
            secondary: '#4297A0',
        },

    },
    typography: {
        body1: {
            // fontWeight: 500
        },
        body2: {
            fontSize: '.8rem'
        }
    },
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiFab: {
            size: 'small',
        },
        MuiFormControl: {
            margin: 'dense',
            size: 'small',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiRadio: {
            size: 'small',
        },
        MuiSwitch: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            size: 'small',
        },
        MuiFilledInput: {
            disableUnderline: true
        },
    },
    overrides: {
        MuiInputLabel: {
            root: {
                fontSize: '.95rem',
                fontWeight: 400,
                color: '#2F5061'
            }
        },
    }
})