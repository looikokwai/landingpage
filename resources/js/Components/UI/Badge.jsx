import React from 'react';
import { Chip } from '@mui/material';

const Badge = ({ children, color = "primary", ...props }) => {
    return (
        <Chip label={children} color={color} {...props} />
    );
};

export default Badge;
