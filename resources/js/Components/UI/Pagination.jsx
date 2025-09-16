import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import { Link, usePage } from '@inertiajs/react';

const Pagination = ({ links }) => {
    if (!links || links.length <= 3) return null;

    return (
        <MuiPagination
            count={links.length - 2}
            page={usePage().props.meta.current_page}
            renderItem={(item) => {
                const link = links[item.page];
                return (
                    <Link href={link.url}>
                        <MuiPagination.item {...item} />
                    </Link>
                );
            }}
        />
    );
};

export default Pagination;
