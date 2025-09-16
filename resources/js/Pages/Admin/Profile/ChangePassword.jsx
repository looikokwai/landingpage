import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Card, Button, Input, Label } from '@/Components/UI';
import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Divider,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material'
import KeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export default function ChangePassword({ admin }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.profile.update-password'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const togglePasswordVisibility = (field) => {
        switch (field) {
            case 'current':
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case 'new':
                setShowNewPassword(!showNewPassword);
                break;
            case 'confirm':
                setShowConfirmPassword(!showConfirmPassword);
                break;
        }
    };

    return (
        <>
            <Head title={t('profile.title')} />
            <Box sx={{ py: 4 }}>
                <Container maxWidth="md">
                    {/* 页面标题 */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 4
                    }}>
                        <Box sx={{
                            p: 1.5,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            color: theme.palette.primary.contrastText,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <KeyIcon />
                        </Box>
                        <Box>
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
                                {t('profile.title')}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mt: 0.5
                                }}
                            >
                                {t('profile.subtitle')}
                            </Typography>
                        </Box>
                    </Box>

                    {/* 表单卡片 */}
                    <Paper sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: `0 4px 20px ${theme.palette.primary.main}10`,
                        border: `1px solid ${theme.palette.divider}`,
                    }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                        {t('profile.account_info')}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                                        {t('profile.account_info_desc')}
                                    </Typography>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Input
                                        label={t('profile.name')}
                                        id="name"
                                        type="text"
                                        value={admin.name}
                                        disabled
                                        sx={{ '& .MuiInputBase-input': { backgroundColor: theme.palette.action.disabledBackground } }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Input
                                        label={t('profile.email')}
                                        id="email"
                                        type="email"
                                        value={admin.email}
                                        disabled
                                        sx={{ '& .MuiInputBase-input': { backgroundColor: theme.palette.action.disabledBackground } }}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <Divider sx={{ my: 2 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                        {t('profile.change_password')}
                                    </Typography>
                                </Grid>

                                <Grid size={12}>
                                    <Input
                                        label={t('profile.current_password')}
                                        id="current_password"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        error={errors.current_password}
                                        placeholder={t('profile.current_password_placeholder')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => togglePasswordVisibility('current')}
                                                        edge="end"
                                                    >
                                                        {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <Input
                                        label={t('profile.new_password')}
                                        id="password"
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        error={errors.password}
                                        placeholder={t('profile.new_password_placeholder')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => togglePasswordVisibility('new')}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mt: 1, display: 'block' }}>
                                        {t('profile.password_min_length')}
                                    </Typography>
                                </Grid>

                                <Grid size={12}>
                                    <Input
                                        label={t('profile.confirm_new_password')}
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        error={errors.password_confirmation}
                                        placeholder={t('profile.confirm_new_password_placeholder')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => togglePasswordVisibility('confirm')}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <Divider sx={{ my: 4 }} />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 2
                                    }}>
                                        <Button
                                            type="button"
                                            variant="outlined"
                                            onClick={() => window.history.back()}
                                            disabled={processing}
                                            sx={{
                                                borderColor: theme.palette.primary.main,
                                                color: theme.palette.primary.main,
                                                '&:hover': {
                                                    borderColor: theme.palette.primary.dark,
                                                    backgroundColor: theme.palette.primary.main + '10',
                                                }
                                            }}
                                        >
                                            {t('common.back')}
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={processing}
                                            sx={{
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                '&:hover': {
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                                                },
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                px: 4,
                                                py: 1.5
                                            }}
                                        >
                                            {processing ? t('profile.updating') : t('profile.update_password')}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Box>
        </>
    );
}
