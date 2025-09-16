import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import { desktopViewColors } from '../../theme'

export default function MarqueeWelcome() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
        {/* Blur shadow */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            opacity: 0.5,
            filter: 'blur(2px)',
            zIndex: 0,
          }}
        />
        {/* Main container */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            width: '100%',
            zIndex: 1,
            py: 2,
          }}
        >
          <Typography
            variant='body1'
            sx={{
              display: 'inline-block',
              animation: 'marquee 20s linear infinite',
              fontFamily: 'Montserrat',
              fontSize: '16px',
              fontWeight: 500,
              color: desktopViewColors.text.primary,
              paddingLeft: '100%',
              willChange: 'transform',
              '@keyframes marquee': {
                '0%': {
                  transform: 'translateX(0%)',
                },
                '100%': {
                  transform: 'translateX(-100%)',
                },
              },
              // 响应式调整
              '@media (max-width: 768px)': {
                fontSize: '14px',
                animation: 'marquee 25s linear infinite',
              },
              // 鼠标悬停时暂停动画
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            Welcome to SQUEEN VIP - Trusted Online Casino in Malaysia since 2012
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
