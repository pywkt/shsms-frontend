import React from 'react';
import Input from 'react-phone-number-input/input';
import TextRef from './TextRef';

const PhoneNumberInput = ({ value, onChange, id, disabled }) => (
    <Input
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        inputComponent={TextRef}
        defaultCountry="US"
        // international
        // country="US"
        
    />
);

export default PhoneNumberInput;
