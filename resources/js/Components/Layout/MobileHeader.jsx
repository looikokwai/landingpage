import React from 'react'
import { useTranslation } from 'react-i18next'
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LanguageSwitcher from '../LanguageSwitcher'

const MobileHeader = ({ mobileMenuOpen, onToggleMenu }) => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <AppBar
            position="fixed"
            sx={{
                display: { xs: 'block', md: 'none' },
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: `0px 2px 4px ${theme.palette.primary.main}10`,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    {t('nav.title')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageSwitcher position='top' />
                    <IconButton
                        color="inherit"
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        onClick={onToggleMenu}
                        sx={{
                            color: theme.palette.text.primary,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(MobileHeader)
