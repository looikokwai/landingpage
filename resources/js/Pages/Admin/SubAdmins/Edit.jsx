import { Head, useForm } from '@inertiajs/react'
import { Button, Card, Breadcrumb, Input } from '../../../Components/UI'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Divider,
  Paper
} from '@mui/material'
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';

export default function Edit({ subAdmin }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, put, processing, errors } = useForm({
    name: subAdmin.name || '',
    username: subAdmin.username || '',
    email: subAdmin.email || '',
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    put(route('admin.sub-admins.update', subAdmin.id))
  }

  return (
    <>
      <Head title={`${t('subadmin.edit_title')} - ${subAdmin.name}`} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="md">
          {/* 面包屑导航 */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumb
              items={[
                {
                  label: t('nav.dashboard'),
                  href: route('admin.dashboard'),
                },
                {
                  label: t('subadmin.title'),
                  href: route('admin.sub-admins.index'),
                },
                { label: `${t('subadmin.edit_title')} - ${subAdmin.name}` },
              ]}
            />
          </Box>

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
              <EditIcon />
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
                {t('subadmin.edit_title')} - {subAdmin.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 0.5
                }}
              >
                {t('subadmin.edit_description')}
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <Input
                    label={t('common.name')}
                    id='name'
                    type='text'
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                    required
                    placeholder={t('common.name')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Input
                    label={t('common.username')}
                    id='username'
                    type='text'
                    value={data.username}
                    onChange={e => setData('username', e.target.value)}
                    error={errors.username}
                    required
                    placeholder={t('common.username')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Input
                    label={t('common.email')}
                    id='email'
                    type='email'
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                    required
                    placeholder='subadmin@example.com'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Input
                    label={t('subadmin.password_optional')}
                    id='password'
                    type='password'
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder='留空则不修改密码'
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Input
                    label={t('common.password_confirmation')}
                    id='password_confirmation'
                    type='password'
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    placeholder='确认新密码'
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* 按钮区域 */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2
              }}>
                <Button
                  type='button'
                  variant='outlined'
                  onClick={() => window.history.back()}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: theme.palette.primary.main + '10',
                    }
                  }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  loading={processing}
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
                  {processing ? t('common.saving') : t('common.save')}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  )
}
