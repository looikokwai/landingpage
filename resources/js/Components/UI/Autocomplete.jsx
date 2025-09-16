import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';

const Autocomplete = ({ options, label, ...props }) => {
    return (
        <MuiAutocomplete
            options={options}
            getOptionLabel={(option) => option.label || ''}
            renderInput={(params) => <TextField {...params} label={label} />}
            {...props}
        />
    );
};

export default Autocomplete;
