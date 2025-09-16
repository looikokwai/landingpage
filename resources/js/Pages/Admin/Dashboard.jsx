import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '../../Components/UI'
import { Box, Container, Typography, useTheme, Grid, Avatar, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Dashboard() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <>
            <Head title={t('dashboard.title')} />
            <Box sx={{ py: 4 }}>
                <Container maxWidth="xl">
                    {/* 页面标题和操作区域 */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        {/* 左侧：标题 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                p: 1.5,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                color: theme.palette.primary.contrastText,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <DashboardIcon />
                            </Box>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {t('dashboard.title')}
                            </Typography>
                        </Box>


                        {/* 右侧：用户信息和操作 */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            flexWrap: 'wrap'
                        }}>
                            <Chip
                                icon={<PersonIcon />}
                                label="管理员"
                                variant="outlined"
                                sx={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    '& .MuiChip-icon': {
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            />
                            <Button
                                onClick={() => router.get(route('admin.profile.show'))}
                                startIcon={<SettingsIcon />}
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.dark,
                                        backgroundColor: theme.palette.primary.main + '10',
                                        transform: 'translateY(-1px)',
                                        boxShadow: `0 2px 8px ${theme.palette.primary.main}30`,
                                    },
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                {t('dashboard.profile')}
                            </Button>
                        </Box>
                    </Box>

                    {/* Welcome Message */}
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Card
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 3,
                                    boxShadow: `0 4px 20px ${theme.palette.primary.main}10`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: 4,
                                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    }
                                }}
                            >
                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2
                                    }}>
                                        <DashboardIcon sx={{
                                            fontSize: 40,
                                            color: theme.palette.primary.main
                                        }} />
                                    </Box>
                                </Box>

                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                        color: theme.palette.text.primary
                                    }}
                                >
                                    欢迎使用管理后台
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        maxWidth: 600,
                                        mx: 'auto',
                                        lineHeight: 1.6
                                    }}
                                >
                                    这里将显示系统概览和重要信息。您可以在这里管理用户、权限、角色等系统功能。
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
