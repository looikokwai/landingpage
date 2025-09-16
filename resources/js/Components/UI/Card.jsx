import React from 'react';
import { Card as MuiCard, CardContent, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledMuiCard = styled(MuiCard)(({ theme }) => ({
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.07)',
    borderRadius: '8px',
}));

const Card = ({ title, children, className }) => {
    return (
        <StyledMuiCard className={className}>
            {title && <CardHeader title={title} />}
            <CardContent>
                {children}
            </CardContent>
        </StyledMuiCard>
    );
};

export default Card;
