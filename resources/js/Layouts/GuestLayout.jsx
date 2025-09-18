import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import SEOHead from '../Components/SEOHead'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Facebook,
  Instagram,
  YouTube,
  Telegram,
  WhatsApp,
  Chat
} from '@mui/icons-material'
import { Toaster, toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { desktopViewColors } from '../theme'
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid
} from '@mui/material'

// FlashMessages component definition (moved here)
function FlashMessages() {
  const { flash } = usePage().props

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success)
    }
    if (flash.error) {
      toast.error(flash.error)
    }
  }, [flash.success, flash.error])

  return null
}

export default function GuestLayout({ children }) {
  const { url } = usePage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation('user')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Online Slots', href: '/slots' },
    { name: 'Live Casino', href: '/live-casino' },
    { name: 'Sports', href: '/sports' },
    { name: 'VIP Club', href: '/vip' },
    { name: 'Promos', href: '/promos' }
  ]

  return (
    <>
      <SEOHead />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'white' }}>
        {/* Header */}
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: 'white',
            boxShadow: `3px 3px 10px 0px ${desktopViewColors.shadow.light}`,
            zIndex: 50
          }}
        >
          <Toolbar sx={{ px: 0, py: '9px' }}>
            <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', px: { xs: 2, md: 0 } }}>
              {/* Logo */}
              <Box sx={{ flexShrink: 0 }}>
                <Link href='/'>
                  <Box
                    component="img"
                    src='/images/logo.png'
                    alt='Logo'
                    sx={{ width: '250px', height: '80px' }}
                  />
                </Link>
              </Box>

              {/* Desktop Navigation */}
              <Box sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '20px',
                mx: 'auto'
              }}>
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '18px',
                        color: item.name === 'Home' ? desktopViewColors.primary.red : desktopViewColors.text.primary,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: desktopViewColors.primary.red
                        }
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                ))}
              </Box>

              {/* Login and Sign Up Buttons */}
              <Box sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '20px',
                ml: 'auto'
              }}>
                <Button
                  variant='outlined'
                  href='/login'
                  sx={{
                    borderRadius: '50px',
                    color: desktopViewColors.primary.red,
                    borderColor: desktopViewColors.primary.red,
                    fontSize: '16px',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      borderColor: desktopViewColors.primary.red,
                      backgroundColor: 'rgba(169, 0, 0, 0.04)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant='contained'
                  href='/register'
                  sx={{
                    background: desktopViewColors.gradient.primary,
                    color: desktopViewColors.text.white,
                    fontSize: '16px',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'none',
                    borderRadius: '8px',
                    px: 3,
                    py: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      background: desktopViewColors.gradient.primaryHover,
                      boxShadow: 'none'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>

              {/* Mobile menu button */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 'auto' }}>
                <IconButton
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  sx={{ color: desktopViewColors.text.primary }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 250,
              backgroundColor: 'white'
            }
          }}
        >
          <List sx={{ pt: 2 }}>
            {navigation.map(item => (
              <ListItem key={item.name} sx={{ px: 0 }}>
                <Link
                  href={item.href}
                  style={{
                    textDecoration: 'none',
                    width: '100%'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ListItemText
                    primary={item.name}
                    sx={{
                      px: 3,
                      py: 1,
                      '& .MuiListItemText-primary': {
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '16px',
                        color: url === item.href ? desktopViewColors.primary.red : desktopViewColors.text.primary,
                        fontWeight: url === item.href ? 'bold' : 'normal'
                      }
                    }}
                  />
                </Link>
              </ListItem>
            ))}
            <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant='outlined'
                href='/login'
                fullWidth
                sx={{
                  borderRadius: '50px',
                  color: desktopViewColors.primary.red,
                    borderColor: desktopViewColors.primary.red,
                  fontSize: '16px',
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'none'
                }}
              >
                Login
              </Button>
              <Button
                variant='contained'
                href='/register'
                fullWidth
                sx={{
                  background: desktopViewColors.gradient.primary,
                  color: desktopViewColors.text.white,
                  fontSize: '16px',
                  fontFamily: 'Montserrat, sans-serif',
                  textTransform: 'none',
                  borderRadius: '8px',
                  boxShadow: 'none'
                }}
              >
                Sign Up
              </Button>
            </Box>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main">{children}</Box>

        {/* Footer */}
        <Box component="footer" sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
          <Container maxWidth="lg" sx={{ py: 3, px: { xs: 2, md: 0 } }}>
            {/* Payment Gateway */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
              <Box component="img" src="/images/footer/1.png" sx={{ borderRadius: '10px', width: '112px', height: '56px' }} />
              <Box component="img" src="/images/footer/2.png" sx={{ borderRadius: '10px', width: '110px', height: '55px' }} />
              <Box component="img" src="/images/footer/3.png" sx={{ borderRadius: '10px', width: '55px', height: '55px' }} />
              <Box component="img" src="/images/footer/4.png" sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
              <Box component="img" src="/images/footer/5.png" sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
              <Box component="img" src="/images/footer/6.png" sx={{ borderRadius: '10px', width: '84px', height: '56px' }} />
              <Box component="img" src="/images/footer/7.png" sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
              <Box component="img" src="/images/footer/8.png" sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
              <Box component="img" src="/images/footer/9.png" sx={{ borderRadius: '10px', width: '84px', height: '56px' }} />
              <Box component="img" src="/images/footer/10.png" sx={{ borderRadius: '10px', width: '123px', height: '56px' }} />
            </Box>

            {/* Divider */}
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%', height: '1px', mb: 2 }} />

            {/* Regulation Awards */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.5, gap: 3.5, flexWrap: 'wrap' }}>
                <Box component="img" src="/images/footer/1-1.png" sx={{ width: '92px', height: '19px' }} />
                <Box component="img" src="/images/footer/1-2.png" sx={{ width: '88px', height: '31px' }} />
                <Box component="img" src="/images/footer/1-3.png" sx={{ width: '104px', height: '30px' }} />
                <Box component="img" src="/images/footer/1-4.png" sx={{ width: '135px', height: '26px' }} />
                <Box component="img" src="/images/footer/1-5.png" sx={{ width: '36px', height: '34px' }} />
              </Box>

              <Box sx={{ backgroundColor: '#404040', width: '1px', height: '61px', mx: 2, display: { xs: 'none', md: 'block' } }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', opacity: 0.5, gap: 2 }}>
                  <Box component="img" src="/images/footer/1-6.png" sx={{ width: '87px', height: '42px' }} />
                  <Box sx={{ backgroundColor: '#4b4b4b', width: '1px', height: '44px' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box component="img" src="/images/footer/other.png" sx={{ width: '34px', height: '7px', opacity: 0.5 }} />
                    <Typography sx={{ fontSize: '15px', fontWeight: 900, color: '#b3bec1', opacity: 0.5, mt: 0.1 }}>MALAYSIA</Typography>
                    <Typography sx={{ fontSize: '10px', color: '#b3bec1', opacity: 0.5 }}>2024</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Divider */}
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%', height: '1px', mb: 3.5 }} />

            {/* Sitemap */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 3 }}>
              {/* Casino */}
              <Box sx={{ minWidth: '150px' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'white', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>Casino</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Live Casino</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Recommended</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Table Game</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Black Jack</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Roulette</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Baccarat</Typography>
                </Box>
              </Box>

              {/* Sports */}
              <Box sx={{ minWidth: '150px' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'white', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>Sports</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Sportsbook</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Live Game</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Rules</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Sports Betting Insight</Typography>
                </Box>
              </Box>

              {/* Promo */}
              <Box sx={{ minWidth: '150px' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'white', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>Promo</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>VIP Club</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Promotions</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Affiliate</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Refer a Friend</Typography>
                </Box>
              </Box>

              {/* Supports */}
              <Box sx={{ minWidth: '150px' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'white', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>Supports</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Licenses</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Help Center</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Gambler Aware</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>FAQs</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Privacy Policy</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Terms of Service</Typography>
                  <Typography sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Montserrat, sans-serif' }}>Live Supports</Typography>
                </Box>
              </Box>

              {/* Join Our Community */}
              <Box sx={{ minWidth: '200px' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: 'white', mb: 2, fontFamily: 'Montserrat, sans-serif' }}>Join Our Community</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Telegram sx={{ fontSize: '30px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <Facebook sx={{ fontSize: '30px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <Chat sx={{ fontSize: '30px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <YouTube sx={{ fontSize: '30px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <WhatsApp sx={{ fontSize: '25px', color: 'rgba(255, 255, 255, 0.3)' }} />
                  <Instagram sx={{ fontSize: '25px', color: 'rgba(255, 255, 255, 0.3)' }} />
                </Box>
              </Box>
            </Box>

            {/* Divider */}
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%', height: '1px', mb: 3.5 }} />

            {/* License Information */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 4 }}>
              <Box sx={{ maxWidth: '450px' }}>
                <Box component="img" src="/images/footer/logo.png" sx={{ width: '156px', height: '50px', mb: 4 }} />
                <Typography sx={{ fontSize: '10px', color: 'white', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.5 }}>
                  The ultimate crypto gaming destination, trusted by millions worldwide. We bring bold entertainment, cutting-edge experiences, and a thriving community together for non-stop thrills. Play, win, and stay untamed.
                  <br /><br />
                  Your use of and access to SQUEEN VIP signifies that you fully understand and agree to be legally bound by the contents of our Terms of Service and Responsible Gaming Policy
                  <br /><br />
                  Crypto trading is not gambling by definition, therefore it is not covered by our gaming license.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: '450px' }}>
                <Box component="img" src="/images/footer/other.png" sx={{ width: '57px', height: '57px', mb: 3 }} />
                <Typography sx={{ fontSize: '10px', color: 'white', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.5 }}>
                  SQUEEN VIP is operated by Mega Technology Ltd. SQUEEN VIP is licensed and regulated by the Government of the Autonomous Island of Anjouan, Union of Comoros and operates License No. ALSI-202409020-FI2.
                  <br /><br />
                  SQUEEN VIP has passed all regulatory compliance and is legally authorized to conduct gaming operations for any and all games of chance and wagering.
                </Typography>
              </Box>
            </Box>

            {/* Final Divider */}
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', width: '100%', height: '1px', mb: 2 }} />

            {/* Copyright */}
            <Typography sx={{ textAlign: 'center', fontSize: '12px', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
              Copyright ©2025 SQUEEN VIP ALL RIGHTS RESERVED.
            </Typography>
          </Container>
        </Box>
      </Box>
      <Toaster />
      <FlashMessages />
    </>
  )
}
