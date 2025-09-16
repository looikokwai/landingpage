import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    IconButton,
    Tooltip,
    Fade
} from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckIcon from '@mui/icons-material/Check'
import ReactCountryFlag from 'react-country-flag'

const LanguageSwitcher = ({ as = 'button', variant = 'light', position = 'bottom' }) => {
    const { i18n, t } = useTranslation()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const languages = [
        { code: 'en', name: 'English', countryCode: 'US', short: 'EN' },
        { code: 'zh', name: '中文', countryCode: 'CN', short: '中文' },
        { code: 'ms', name: 'Bahasa Melayu', countryCode: 'MY', short: 'MS' },
    ]

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode)
        localStorage.setItem('i18nextLng', languageCode)
        setAnchorEl(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // 侧边栏样式 (as='div')
    if (as === 'li' || as === 'div') {
        return (
            <Box sx={{ position: 'relative', width: '100%' }}>
                <Button
                    onClick={handleClick}
                    fullWidth
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1.5,
                        px: 2,
                        borderRadius: 2,
                        textTransform: 'none',
                        color: theme.palette.text.primary,
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                        transition: 'all 0.2s ease',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                        <LanguageIcon sx={{ mr: 1.5, flexShrink: 0, fontSize: 20 }} />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {currentLanguage.name}
                        </Typography>
                    </Box>
                    <ExpandMoreIcon
                        sx={{
                            fontSize: 16,
                            transition: 'transform 0.2s ease',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    />
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    PaperProps={{
                        sx: {
                            mt: 1,
                            minWidth: 200,
                            borderRadius: 2,
                            boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                            border: `1px solid ${theme.palette.divider}`,
                        }
                    }}
                >
                    {languages.map((language) => (
                        <MenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            selected={i18n.language === language.code}
                            sx={{
                                py: 1.5,
                                px: 2,
                                borderRadius: 1,
                                mx: 1,
                                my: 0.5,
                                '&.Mui-selected': {
                                    backgroundColor: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.dark}15)`,
                                    '&:hover': {
                                        backgroundColor: `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.primary.dark}25)`,
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <Box
                                    sx={{
                                        width: 28,
                                        height: 20,
                                        borderRadius: 0.5,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: `0 1px 3px ${theme.palette.primary.main}20`,
                                    }}
                                >
                                    <ReactCountryFlag
                                        countryCode={language.countryCode}
                                        svg
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: i18n.language === language.code ? 600 : 500,
                                            color: i18n.language === language.code
                                                ? theme.palette.primary.main
                                                : theme.palette.text.primary,
                                        }}
                                    >
                                        {language.name}
                                    </Typography>
                                }
                            />
                            {i18n.language === language.code && (
                                <CheckIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 18,
                                    }}
                                />
                            )}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        )
    }

    // 默认按钮样式
    const isDark = variant === 'dark'

    return (
        <Box sx={{ position: 'relative' }}>
            <Button
                onClick={handleClick}
                variant="text"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    minHeight: 44,
                    textTransform: 'none',
                    color: isDark ? theme.palette.text.secondary : theme.palette.text.primary,
                    backgroundColor: 'transparent',
                    borderRadius: 2,
                    '&:hover': {
                        backgroundColor: isDark ? theme.palette.action.hover : theme.palette.action.hover,
                        color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
                    },
                    transition: 'all 0.2s ease',
                }}
            >
                <LanguageIcon sx={{ fontSize: 18 }} />
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 500,
                        display: { xs: 'none', sm: 'inline' },
                    }}
                >
                    {currentLanguage.name}
                </Typography>
                <ExpandMoreIcon
                    sx={{
                        fontSize: 16,
                        transition: 'transform 0.2s ease',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: position === 'bottom' ? 'top' : 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: position === 'bottom' ? 'bottom' : 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: position === 'bottom' ? 1 : 0,
                        mb: position === 'bottom' ? 0 : 1,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
                        border: `1px solid ${theme.palette.divider}`,
                    }
                }}
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        selected={i18n.language === language.code}
                        sx={{
                            py: 1.5,
                            px: 2,
                            borderRadius: 1,
                            mx: 1,
                            my: 0.5,
                            '&.Mui-selected': {
                                backgroundColor: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.dark}15)`,
                                '&:hover': {
                                    backgroundColor: `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.primary.dark}25)`,
                                },
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <Box
                                sx={{
                                    width: 28,
                                    height: 20,
                                    borderRadius: 0.5,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 1px 3px ${theme.palette.primary.main}20`,
                                }}
                            >
                                <ReactCountryFlag
                                    countryCode={language.countryCode}
                                    svg
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: i18n.language === language.code ? 600 : 500,
                                        color: i18n.language === language.code
                                            ? theme.palette.primary.main
                                            : theme.palette.text.primary,
                                    }}
                                >
                                    {language.name}
                                </Typography>
                            }
                        />
                        {i18n.language === language.code && (
                            <CheckIcon
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: 18,
                                }}
                            />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default LanguageSwitcher
