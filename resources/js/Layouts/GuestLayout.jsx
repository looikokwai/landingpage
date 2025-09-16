import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import SEOHead from '../Components/SEOHead'
import MenuIcon from '@mui/icons-material/Menu'
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
        <Box component="footer" sx={{ backgroundColor: desktopViewColors.background.dark, color: 'white' }}>
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={4}>
              {/* Company Info */}
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: desktopViewColors.accent.blue,
                    mb: 2
                  }}
                >
                  {t('guestLayout.footer.brandName')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: desktopViewColors.text.secondary,
                    mb: 2
                  }}
                >
                  {t('guestLayout.footer.description')}
                </Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                borderTop: `1px solid ${desktopViewColors.border.dark}`,
                mt: 4,
                pt: 4,
                textAlign: 'center'
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: desktopViewColors.text.secondary }}
              >
                {t('guestLayout.footer.copyright')}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
      <Toaster />
      <FlashMessages />
    </>
  )
}
