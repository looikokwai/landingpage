import React from 'react'
import { Box, Container } from '@mui/material'

const CTABanner = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Box
        sx={{
          width: '100%',
          height: { xs: '200px', md: '150px' },
          borderRadius: '20px',
          backgroundImage: 'url("/images/icons/ctabanner.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          my: 4,
          aspectRatio: '16/9'
        }}
      />
    </Container>
  )
}

export default CTABanner
