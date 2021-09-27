/* eslint react/prop-types: 0 */
import React, { forwardRef } from 'react';
import TextField from '@material-ui/core/TextField';

const TextfieldRef = (props, ref) => {
    // const { value } = props;

    return (
        <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            inputRef={ref}
            fullWidth
            label={props.label || "Phone Number"}
            variant="outlined"
            name="phoneNumber"
            // inputProps={{ maxLength: value[0] === '1' ? 16 : 14 }}
            
        />
    );
};

export default forwardRef(TextfieldRef);