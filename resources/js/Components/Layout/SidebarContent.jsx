import React, { useState, useMemo } from 'react'
import { Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
    useTheme,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    Chip,
    Fade,
    Paper
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LanguageSwitcher from '../LanguageSwitcher'
import IconMapper from './IconMapper'
import { useTheme as useCustomTheme } from '../../theme/ThemeProvider'

const SidebarContent = ({ menu, openMenus, onToggleMenu, isCurrentPage }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { isDarkMode, toggleTheme } = useCustomTheme()
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    // 搜索功能
    const filteredMenu = useMemo(() => {
        if (!searchQuery.trim()) return menu

        const filtered = {}
        Object.entries(menu).forEach(([key, item]) => {
            const itemName = t(item.name).toLowerCase()
            const searchLower = searchQuery.toLowerCase()

            if (itemName.includes(searchLower)) {
                filtered[key] = item
            } else if (item.children) {
                const filteredChildren = item.children.filter(child =>
                    t(child.name).toLowerCase().includes(searchLower)
                )
                if (filteredChildren.length > 0) {
                    filtered[key] = {
                        ...item,
                        children: filteredChildren
                    }
                }
            }
        })
        return filtered
    }, [menu, searchQuery, t])

    // 清除搜索
    const handleClearSearch = () => {
        setSearchQuery('')
        setIsSearchFocused(false)
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
        }}>
            {/* 标题区域 */}
            <Box sx={{
                p: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.primary.dark}20 100%)`
            }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center'
                    }}
                >
                    {t('nav.title')}
                </Typography>
            </Box>

            {/* 搜索区域 */}
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder={t('nav.search_placeholder', '搜索菜单...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{
                                        color: isSearchFocused ? theme.palette.primary.main : theme.palette.text.secondary,
                                        transition: 'color 0.2s ease'
                                    }}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={handleClearSearch}
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        '&:hover': { color: theme.palette.error.main }
                                    }}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 2,
                            backgroundColor: theme.palette.background.default,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                            '&.Mui-focused': {
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                            }
                        }
                    }}
                />
                {searchQuery && (
                    <Fade in={true}>
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                            <Chip
                                label={`找到 ${Object.keys(filteredMenu).length} 个结果`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </Box>
                    </Fade>
                )}
            </Box>

            {/* 导航菜单 */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', py: 1 }}>
                <Box sx={{ px: 1.5 }}>
                    {Object.entries(filteredMenu).map(([key, item]) => (
                        <Box key={key} sx={{ mb: 1 }}>
                            {item.children ? (
                                <>
                                    {/* 主菜单项 */}
                                    <Tooltip title={t(item.name)} placement="right" arrow>
                                        <Box
                                            onClick={() => onToggleMenu(key)}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                py: 1.5,
                                                px: 2,
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                background: openMenus[key]
                                                    ? `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.dark}15)`
                                                    : 'transparent',
                                                border: openMenus[key]
                                                    ? `1px solid ${theme.palette.primary.main}30`
                                                    : '1px solid transparent',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.action.hover,
                                                    transform: 'translateX(4px)',
                                                    boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
                                                },
                                            }}
                                        >
                                            <Box sx={{
                                                minWidth: 44,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Box sx={{
                                                    p: 1,
                                                    borderRadius: 1.5,
                                                    background: openMenus[key]
                                                        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                                                        : theme.palette.action.hover,
                                                    transition: 'all 0.3s ease',
                                                    '& .MuiSvgIcon-root': {
                                                        color: openMenus[key]
                                                            ? theme.palette.primary.contrastText
                                                            : theme.palette.text.primary
                                                    }
                                                }}>
                                                    <IconMapper iconName={item.icon} />
                                                </Box>
                                            </Box>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    flexGrow: 1,
                                                    fontWeight: openMenus[key] ? 600 : 500,
                                                    color: openMenus[key] ? theme.palette.primary.main : theme.palette.text.primary,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {t(item.name)}
                                            </Typography>
                                            <Box sx={{
                                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transform: openMenus[key] ? 'rotate(180deg)' : 'rotate(0deg)',
                                                color: openMenus[key] ? theme.palette.primary.main : theme.palette.text.secondary,
                                                ml: 1
                                            }}>
                                                <ExpandMoreIcon />
                                            </Box>
                                        </Box>
                                    </Tooltip>

                                    {/* 子菜单项 */}
                                    <Collapse in={openMenus[key]} timeout="auto" unmountOnExit>
                                        <Box sx={{
                                            mt: 1,
                                            ml: 3,
                                            mr: 1
                                        }}>
                                            {item.children.map((child, index) => (
                                                <Tooltip key={`${key}-${index}`} title={t(child.name)} placement="right" arrow>
                                                    <Box
                                                        component={Link}
                                                        href={route(child.route)}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            py: 1,
                                                            px: 2,
                                                            mb: 0.5,
                                                            borderRadius: 1.5,
                                                            textDecoration: 'none',
                                                            borderLeft: isCurrentPage(child.route)
                                                                ? `3px solid ${theme.palette.primary.main}`
                                                                : '3px solid transparent',
                                                            backgroundColor: isCurrentPage(child.route)
                                                                ? `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.dark}15)`
                                                                : 'transparent',
                                                            color: isCurrentPage(child.route)
                                                                ? theme.palette.primary.main
                                                                : theme.palette.text.primary,
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                backgroundColor: isCurrentPage(child.route)
                                                                    ? `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.primary.dark}25)`
                                                                    : theme.palette.action.hover,
                                                                transform: 'translateX(2px)',
                                                            }
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: isCurrentPage(child.route) ? 600 : 500,
                                                                fontSize: '0.875rem',
                                                                lineHeight: 1.4,
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                maxWidth: '100%',
                                                            }}
                                                        >
                                                            {t(child.name)}
                                                        </Typography>
                                                    </Box>
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    </Collapse>
                                </>
                            ) : (
                                /* 单层菜单项 */
                                <Tooltip title={t(item.name)} placement="right" arrow>
                                    <Box
                                        component={Link}
                                        href={route(item.route)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            py: 1.5,
                                            px: 2,
                                            borderRadius: 2,
                                            textDecoration: 'none',
                                            background: isCurrentPage(item.route)
                                                ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                                                : 'transparent',
                                            color: isCurrentPage(item.route)
                                                ? theme.palette.primary.contrastText
                                                : theme.palette.text.primary,
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                backgroundColor: isCurrentPage(item.route)
                                                    ? `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                                                    : theme.palette.action.hover,
                                                transform: 'translateX(4px)',
                                                boxShadow: isCurrentPage(item.route)
                                                    ? `0 6px 20px ${theme.palette.primary.main}40`
                                                    : `0 4px 12px ${theme.palette.primary.main}20`,
                                            },
                                        }}
                                    >
                                        <Box sx={{
                                            minWidth: 44,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 1.5,
                                                background: isCurrentPage(item.route)
                                                    ? 'rgba(255, 255, 255, 0.2)'
                                                    : theme.palette.action.hover,
                                                transition: 'all 0.3s ease'
                                            }}>
                                                <IconMapper iconName={item.icon} />
                                            </Box>
                                        </Box>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                flexGrow: 1,
                                                fontWeight: isCurrentPage(item.route) ? 600 : 500,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {t(item.name)}
                                        </Typography>
                                    </Box>
                                </Tooltip>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider sx={{ mx: 2 }} />

            {/* 底部区域 */}
            <Box sx={{ p: 2, background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.default})` }}>
                <LanguageSwitcher as='div' />

                {/* 主题切换按钮 */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} placement="right" arrow>
                        <IconButton
                            onClick={toggleTheme}
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                                color: theme.palette.primary.main,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>

                <Tooltip title={t('nav.logout')} placement="right" arrow>
                    <Box
                        component="button"
                        type="button"
                        onClick={() => router.post(route('admin.logout'))}
                        sx={{
                            mt: 2,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 1.5,
                            px: 2,
                            borderRadius: 2,
                            border: 'none',
                            cursor: 'pointer',
                            background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                            color: theme.palette.error.contrastText,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`,
                                transform: 'translateX(4px)',
                                boxShadow: `0 6px 20px ${theme.palette.error.main}40`,
                            },
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                textAlign: 'center',
                            }}
                        >
                            {t('nav.logout')}
                        </Typography>
                    </Box>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default React.memo(SidebarContent)
