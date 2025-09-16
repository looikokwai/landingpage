import { Head, Link, useForm } from '@inertiajs/react'
import { Button, Card, Input, Checkbox, Breadcrumb } from '../../../Components/UI'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Divider,
  Paper,
  FormControlLabel,
  Checkbox as MuiCheckbox
} from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Create({ permissions }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    permissions: [],
  })

  const handleSubmit = e => {
    e.preventDefault()
    post(route('admin.roles.store'))
  }

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setData('permissions', [...data.permissions, permissionId])
    } else {
      setData('permissions', data.permissions.filter(id => id !== permissionId))
    }
  }

  const handleSelectAll = () => {
    if (data.permissions.length === permissions.length) {
      setData('permissions', [])
    } else {
      setData('permissions', permissions.map(p => p.id))
    }
  }

  return (
    <>
      <Head title={t('role.create')} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {/* 面包屑导航 */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumb
              items={[
                { label: t('nav.dashboard'), href: route('admin.dashboard') },
                { label: t('role.list'), href: route('admin.roles.index') },
                { label: t('role.create') }
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
              <ShieldIcon />
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
                {t('role.create')}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 0.5
                }}
              >
                {t('role.create_description')}
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
                  <Input
                    label={t('role.name')}
                    id='name'
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                    required
                    placeholder='admin'
                  />
                </Grid>

                <Grid size={12}>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t('role.permissions')}
                    </Typography>
                    <Button
                      type='button'
                      variant='outlined'
                      size='small'
                      onClick={handleSelectAll}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.dark,
                          backgroundColor: theme.palette.primary.main + '10',
                        }
                      }}
                    >
                      {data.permissions.length === permissions.length ? t('common.deselect_all') : t('common.select_all')}
                    </Button>
                  </Box>

                  <Grid container spacing={2}>
                    {permissions.map(permission => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={permission.id}>
                        <FormControlLabel
                          control={
                            <MuiCheckbox
                              checked={data.permissions.includes(permission.id)}
                              onChange={e => handlePermissionChange(permission.id, e.target.checked)}
                              sx={{
                                color: theme.palette.primary.main,
                                '&.Mui-checked': {
                                  color: theme.palette.primary.main,
                                }
                              }}
                            />
                          }
                          label={
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                              {permission.name}
                            </Typography>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
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
                <Link href={route('admin.roles.index')}>
                  <Button
                    variant='outlined'
                    startIcon={<ArrowBackIcon />}
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
                  variant='contained'
                  loading={processing}
                  disabled={processing}
                  startIcon={<SaveIcon />}
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
                  {processing ? t('common.saving') : t('common.create')}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  )
}
