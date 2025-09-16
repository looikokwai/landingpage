import React from 'react'
import { Box, styled } from '@mui/material'
import { desktopViewColors } from '../../theme'

// Styled components
const BannerSection = styled(Box)(({ theme }) => ({
  height: '400px',
  backgroundImage: 'url("/images/banners/banner-2.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}))

export default function BannerSectionComponent() {
  return (
    <BannerSection>
      {/* Banner Selection Dots - positioned at bottom right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 23,
          right: 311,
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <Box
            key={index}
            sx={{
              width: index === 3 ? 35 : 12,
              height: 12,
              borderRadius: '100px',
              backgroundColor: index === 3 ? desktopViewColors.gold.bright : 'rgba(255, 255, 255, 0.75)',
            }}
          />
        ))}
      </Box>
    </BannerSection>
  )
}
