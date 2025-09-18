import React from 'react'
import { Box, Container, Typography, Grid, Card } from '@mui/material'
import { desktopViewColors } from '../../theme'

export default function HowToRegister() {
  return (
    <Container maxWidth='lg'>
      <Typography
        variant='h4'
        component='h2'
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 700,
          color: desktopViewColors.primary.red,
          fontSize: '25px',
        }}
      >
        How to Register?
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mt: 2, justifyContent: 'center' }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ position: 'relative', height: { xs: 160, md: 180 }, width: '100%', minWidth: { xs: 'auto', md: 250 }, maxWidth: { xs: 'auto', md: 250 }, mx: 'auto' }}>
              {/* Blur shadow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${desktopViewColors.gold.border}`,
                  borderRadius: '10px',
                  opacity: 0.5,
                  filter: 'blur(2px)',
                  zIndex: 0,
                }}
              />
              {/* Main card */}
              <Card
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  p: 2,
                  height: '100%',
                  width: '100%',
                  border: `2px solid ${desktopViewColors.gold.border}`,
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <img src='/images/icons/register-icon.png' alt='Register' style={{ width: '60px', height: '60px' }} />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '12px', md: '14px' },
                    textAlign: 'center',
                    px: 1,
                  }}
                >
                  Click Sign Up & Fill in your
                  <br />
                  login details
                </Typography>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ position: 'relative', height: { xs: 160, md: 180 }, width: '100%', minWidth: { xs: 'auto', md: 250 }, maxWidth: { xs: 'auto', md: 250 }, mx: 'auto' }}>
              {/* Blur shadow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${desktopViewColors.gold.bright}`,
                  borderRadius: '10px',
                  opacity: 0.5,
                  filter: 'blur(2px)',
                  zIndex: 0,
                }}
              />
              {/* Main card */}
              <Card
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  p: 2,
                  height: '100%',
                  width: '100%',
                  border: `2px solid ${desktopViewColors.gold.bright}`,
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <img src='/images/icons/deposit-icon.png' alt='Deposit' style={{ width: '60px', height: '60px' }} />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '12px', md: '14px' },
                    textAlign: 'center',
                    px: 1,
                  }}
                >
                  Make a deposit & Claim
                  <br />
                  your Free Credit
                </Typography>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ position: 'relative', height: { xs: 160, md: 180 }, width: '100%', minWidth: { xs: 'auto', md: 250 }, maxWidth: { xs: 'auto', md: 250 }, mx: 'auto' }}>
              {/* Blur shadow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${desktopViewColors.primary.red}`,
                  borderRadius: '10px',
                  opacity: 0.5,
                  filter: 'blur(2px)',
                  zIndex: 0,
                }}
              />
              {/* Main card */}
              <Card
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  p: 2,
                  height: '100%',
                  width: '100%',
                  border: `2px solid ${desktopViewColors.primary.red}`,
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <img src='/images/icons/play-icon.png' alt='Play' style={{ width: '60px', height: '60px' }} />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '12px', md: '14px' },
                    textAlign: 'center',
                    px: 1,
                    lineHeight: 1.3,
                  }}
                >
                  Start winning while playing
                  <br />
                  with your favourite games
                </Typography>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 3 }}>
            <Box sx={{ position: 'relative', height: { xs: 160, md: 180 }, width: '100%', minWidth: { xs: 'auto', md: 250 }, maxWidth: { xs: 'auto', md: 250 }, mx: 'auto' }}>
              {/* Blur shadow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${desktopViewColors.primary.darkRed}`,
                  borderRadius: '10px',
                  opacity: 0.5,
                  filter: 'blur(2px)',
                  zIndex: 0,
                }}
              />
              {/* Main card */}
              <Card
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  p: 2,
                  height: '100%',
                  width: '100%',
                  border: `2px solid ${desktopViewColors.primary.darkRed}`,
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <img src='/images/icons/withdraw-icon.png' alt='Withdraw' style={{ width: '60px', height: '60px' }} />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '12px', md: '14px' },
                    textAlign: 'center',
                    px: 1,
                    lineHeight: 1.3,
                  }}
                >
                  Enjoy exciting winnings
                  <br />
                  moment & withdraw
                </Typography>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* Progress Dots - positioned below cards using same Grid system */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            mt: 4,
            position: 'relative',
          }}
        >
          {/* Progress indicator with dots and lines */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 12,
              transform: 'translateY(-50%)',
              zIndex: 1,
              display: { xs: 'none', md: 'block' },
              pointerEvents: 'none',
            }}
          >
            {/* Dot 1 - Register */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 'calc(12.5% - 6px)',
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: desktopViewColors.gold.border,
              }}
            />

            {/* Line 1: Register to Deposit */}
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                left: 'calc(12.5% + 6px)',
                width: 'calc(25% - 12px)',
                height: 2,
                backgroundColor: desktopViewColors.gold.bright,
              }}
            />

            {/* Dot 2 - Deposit */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 'calc(37.5% - 6px)',
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: desktopViewColors.gold.bright,
              }}
            />

            {/* Line 2: Deposit to Play (gradient) */}
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                left: 'calc(37.5% + 6px)',
                width: 'calc(25% - 12px)',
                height: 2,
                background: `linear-gradient(to right, ${desktopViewColors.gold.bright}, ${desktopViewColors.primary.red})`,
              }}
            />

            {/* Dot 3 - Play */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 'calc(62.5% - 6px)',
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: desktopViewColors.primary.red,
              }}
            />

            {/* Line 3: Play to Withdraw */}
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                left: 'calc(62.5% + 6px)',
                width: 'calc(25% - 12px)',
                height: 2,
                backgroundColor: desktopViewColors.primary.darkRed,
              }}
            />

            {/* Dot 4 - Withdraw */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 'calc(87.5% - 6px)',
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: desktopViewColors.primary.darkRed,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
