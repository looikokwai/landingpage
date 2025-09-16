import React from 'react';
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material';

const Select = ({ label, children, options, ...props }) => {
    const labelId = label ? `${props.name}-label` : undefined;

    return (
        <FormControl fullWidth>
            {label && <InputLabel id={labelId}>{label}</InputLabel>}
            <MuiSelect labelId={labelId} label={label} {...props}>
                {options && options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
                {children}
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
