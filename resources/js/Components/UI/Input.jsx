import React from 'react';
import { TextField } from '@mui/material';

const Input = React.forwardRef(({ error, helperText, ...props }, ref) => (
    <TextField
        variant="outlined"
        fullWidth
        error={!!error}
        helperText={error || helperText}
        inputRef={ref}
        {...props}
    />
));

export default Input;
