import { Head, useForm, Link } from '@inertiajs/react'
import { Input, Select, Button, Card, Breadcrumb } from '../../../Components/UI'
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
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export default function Create({ roles }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'admin', // Default role
  })

  const submit = e => {
    e.preventDefault()
    post(route('admin.admins.store'), {
      onSuccess: () => reset('password', 'password_confirmation'),
    })
  }

  const roleOptions = roles
    .filter(role => role.name !== 'dev')
    .map(role => ({
      value: role.name,
      label: t(`role.${role.name}`),
    }))

  return (
    <>
      <Head title={t('admin.create')} />
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
                  label: t('admin.title'),
                  href: route('admin.admins.index'),
                },
                { label: t('admin.create') },
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
              <PersonAddIcon />
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
              {t('admin.create')}
            </Typography>
          </Box>

          {/* 表单卡片 */}
          <Paper sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: `0 4px 20px ${theme.palette.primary.main}10`,
            border: `1px solid ${theme.palette.divider}`,
          }}>
            <form onSubmit={submit}>
              {/* 基本信息 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{
                  mb: 3,
                  color: theme.palette.text.primary,
                  fontWeight: 600
                }}>
                  {t('admin.basic_info')}
                </Typography>
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
                    <Select
                      label={t('common.role')}
                      id='role'
                      value={data.role}
                      onChange={e => setData('role', e.target.value)}
                      options={roleOptions}
                      error={errors.role}
                      required
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
                      placeholder='admin@example.com'
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* 密码信息 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{
                  mb: 3,
                  color: theme.palette.text.primary,
                  fontWeight: 600
                }}>
                  {t('admin.password_info')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('common.password')}
                      id='password'
                      type='password'
                      value={data.password}
                      onChange={e => setData('password', e.target.value)}
                      error={errors.password}
                      required
                      placeholder={t('common.password')}
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
                      required
                      placeholder={t('common.password_confirmation')}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* 按钮区域 */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2
              }}>
                <Link href={route('admin.admins.index')}>
                  <Button
                    variant='outlined'
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        backgroundColor: theme.palette.primary.main + '10',
                      }
                    }}
                  >
                    {t('common.back_to_list')}
                  </Button>
                </Link>
                <Button
                  type='submit'
                  loading={processing}
                  variant='contained'
                  size="large"
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
                  {t('admin.create')}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  )
}
