import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { Link as InertiaLink } from '@inertiajs/react';

const Breadcrumb = ({ items }) => {
    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return isLast ? (
                    <Typography key={index} color="text.primary">
                        {item.label}
                    </Typography>
                ) : (
                    <Link
                        key={index}
                        component={InertiaLink}
                        href={item.href}
                        underline="hover"
                        color="inherit"
                    >
                        {item.label}
                    </Link>
                );
            })}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumb;
