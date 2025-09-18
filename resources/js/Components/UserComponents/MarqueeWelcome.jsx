import React from 'react'
import { Box, Typography, Container, Paper, useTheme } from '@mui/material'
import { desktopViewColors } from '../../theme';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function MarqueeWelcome({ marqueeTexts }) {
  const theme = useTheme();

  if (!marqueeTexts || marqueeTexts.length === 0) {
    return null;
  }

  const combinedText = marqueeTexts.map(t => t.text).join('  •  ');
  const duration = combinedText.length * 0.3;

  return (
    <Container maxWidth='lg'>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          mt: 3,
          mb: 2,
          overflow: 'hidden',
          borderRadius: '10px',
          border: `1px solid ${theme.palette.divider}`,
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: theme.palette.background.paper
        }}
      >
        <CampaignIcon sx={{ color: desktopViewColors.primary.darkRed }} />
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              width: '200%',
              animation: `marquee ${duration}s linear infinite`,
              willChange: 'transform',
              '@keyframes marquee': {
                '0%': {
                  transform: 'translateX(0%)',
                },
                '100%': {
                  transform: 'translateX(-50%)',
                },
              },
              '&:hover': {
                animationPlayState: 'paused',
              },
            }}
          >
            <Typography
              variant='body1'
                            sx={{
                width: '50%', // 每个文本块占一半
                whiteSpace: 'nowrap',
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 500,
                color: desktopViewColors.primary.darkRed,
              }}
            >
              {combinedText}
            </Typography>
            <Typography
              variant='body1'
                            sx={{
                width: '50%', // 每个文本块占一半
                whiteSpace: 'nowrap',
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 500,
                color: desktopViewColors.primary.darkRed,
              }}
            >
              {combinedText}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
