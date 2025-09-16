import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = React.forwardRef((props, ref) => {
    const { variant = "contained", children, ...rest } = props;
    return (
        <MuiButton variant={variant} ref={ref} {...rest}>
            {children}
        </MuiButton>
    );
});

export default Button;
