import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { usePage } from '@inertiajs/react'
import { Toaster } from 'react-hot-toast'
import { Box, Drawer, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material'
import MobileHeader from '../Components/Layout/MobileHeader'
import SidebarContent from '../Components/Layout/SidebarContent'
import FlashMessages from '../Components/Layout/FlashMessages'


export default function AdminLayout({ children }) {
    const { component, menu } = usePage().props
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [openMenus, setOpenMenus] = useState({})
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    // 使用 useCallback 优化函数性能
    const isCurrentPage = useCallback((routeName) => {
        return route().current(routeName)
    }, [])

    const toggleMenu = useCallback((menuKey) => {
        setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }))
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setMobileMenuOpen(prev => !prev)
    }, [])

    // 使用 useMemo 优化菜单状态计算
    const menuState = useMemo(() => {
        const newOpenMenus = {}
        for (const key in menu) {
            if (menu[key].children) {
                for (const child of menu[key].children) {
                    if (isCurrentPage(child.route)) {
                        newOpenMenus[key] = true
                        break
                    }
                }
            }
        }
        return newOpenMenus
    }, [component, menu, isCurrentPage])

    // Effect to open parent menu of active child
    useEffect(() => {
        setOpenMenus(menuState)
    }, [menuState])

    // 键盘导航支持
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [mobileMenuOpen])

    return (
        <>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                {/* 移动端头部 */}
                {isMobile && (
                    <MobileHeader
                        mobileMenuOpen={mobileMenuOpen}
                        onToggleMenu={toggleMobileMenu}
                    />
                )}

                {/* 侧边栏 */}
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    open={isMobile ? mobileMenuOpen : true}
                    onClose={toggleMobileMenu}
                    sx={{
                        width: 320,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 320,
                            boxSizing: 'border-box',
                            borderRight: `1px solid ${theme.palette.divider}`,
                        },
                    }}
                >
                    <SidebarContent
                        menu={menu}
                        openMenus={openMenus}
                        onToggleMenu={toggleMenu}
                        isCurrentPage={isCurrentPage}
                    />
                </Drawer>

                {/* 主内容区域 */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - 256px)` },
                        ml: { sm: 0 },
                        mt: { xs: 8, sm: 0 }, // 移动端顶部间距
                        minWidth: 0, // 允许内容收缩
                        overflow: 'hidden', // 防止内容溢出
                    }}
                >
                    {children}
                </Box>
            </Box>

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        border: `1px solid ${theme.palette.divider}`,
                    },
                }}
            />
            <FlashMessages />
        </>
    )
}
