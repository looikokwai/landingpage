import React from 'react';
import { InputLabel } from '@mui/material';

const Label = ({ children, ...props }) => {
    return (
        <InputLabel {...props}>
            {children}
        </InputLabel>
    );
};

export default Label;
