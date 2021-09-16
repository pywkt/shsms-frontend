export const globalStyles = {
    typography: {
        // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        // fontFamily: "'DankMono', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        body1: {
            // fontWeight: 500,
            fontSize: 16,
            // fontStyle: 'normal'
        },
        body2: {
            fontSize: 14,
            fontWeight: 400
            // fontStyle: 'normal',
        },
        button: {
            fontSize: 14,
        },
        caption: {
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 300
        },
        h1: {
            fontSize: 20,
            fontWeight: 500,
        },
        h2: {
            fontSize: 18,
            fontWeight: 400
        },
        h3: {
            fontSize: 16,
        },
        h4: {
            fontSize: 14,
        },
        h5: {
            fontSize: 13,
        },
        h6: {
            fontSize: 12,
        },
        // switchLabels: {
        //     fontWeight: 600,
        //     fontSize: '.4rem', // 12px
        //     letterSpacing: 0.5,
        //     textTransform: 'uppercase'
        // }
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
    },
    overrides: {
        MuiInputBase: {
            root: {
                fontSize: 14
            }
        },
        MuiInputLabel: {
            outlined: {
                fontSize: 15
            },
            shrink: {
                fontStyle: 'italic',
                fontSize: 16
            },
        },

        MuiDivider: {
            root: {
                // marginBottom: 20
            }
        },
        MuiFormControlLabel: {
            label: {
                fontSize: 14
            }
        }
    }
}