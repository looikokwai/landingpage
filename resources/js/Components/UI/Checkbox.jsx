import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

const Checkbox = React.forwardRef(({ label, ...props }, ref) => {
    if (label) {
        return (
            <FormControlLabel
                control={<MuiCheckbox {...props} ref={ref} />}
                label={label}
            />
        );
    }
    return <MuiCheckbox {...props} ref={ref} />;
});

export default Checkbox;
