import { Head, useForm, Link, router } from '@inertiajs/react'
import { Input, Select, Button, Card, Breadcrumb, FileInput } from '../../../Components/UI'
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
import AssignmentIcon from '@mui/icons-material/Assignment'
import EditIcon from '@mui/icons-material/Edit'

export default function Edit({ task, statusOptions }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, put, processing, errors } = useForm({
    name: task.name,
    description: task.description,
    photo: null,
    is_active: task.is_active.toString(),
    unit_price: task.unit_price,
    unit: task.unit,
  })

  const submit = e => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('_method', 'put'); // Inertia/Laravel method spoofing
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('is_active', data.is_active);
    formData.append('unit_price', data.unit_price);
    formData.append('unit', data.unit);

    // 只有当data.photo是一个File对象时才添加它
    if (data.photo instanceof File) {
      formData.append('photo', data.photo);
    }

    router.post(route('admin.special-tasks.update', task.id), formData, {
      preserveScroll: true,
      onError: (errors) => {
        console.error('SpecialTasks Edit.jsx - Submission errors:', errors);
      },
      onSuccess: () => {
        console.log('SpecialTasks Edit.jsx - Update successful');
      }
    });
  }

  const statusOptionsList = statusOptions.map(option => ({
    value: option.value.toString(),
    label: t(`common.status_options.${option.label}`),
  }))

  return (
    <>
      <Head title={`${t('special_task.edit')} - ${task.name}`} />
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
                  label: t('special_task.title'),
                  href: route('admin.special-tasks.index'),
                },
                { label: `${t('special_task.edit')} - ${task.name}` },
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
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
              color: theme.palette.secondary.contrastText,
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
                  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('special_task.edit')} - {task.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 0.5
                }}
              >
                {t('special_task.edit_description')}
              </Typography>
            </Box>
          </Box>

          {/* 表单卡片 */}
          <Paper sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: `0 4px 20px ${theme.palette.secondary.main}10`,
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
                  {t('special_task.basic_info')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('special_task.name')}
                      id='name'
                      type='text'
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      error={errors.name}
                      required
                      placeholder={t('special_task.name_placeholder')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Select
                      label={t('special_task.status')}
                      id='is_active'
                      value={data.is_active}
                      onChange={e => setData('is_active', e.target.value)}
                      options={statusOptionsList}
                      error={errors.is_active}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Input
                      label={t('special_task.description')}
                      id='description'
                      type='text'
                      value={data.description}
                      onChange={e => setData('description', e.target.value)}
                      error={errors.description}
                      placeholder={t('special_task.description_placeholder')}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* 价格信息 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{
                  mb: 3,
                  color: theme.palette.text.primary,
                  fontWeight: 600
                }}>
                  {t('special_task.price_info')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('special_task.unit')}
                      id='unit'
                      type='number'
                      value={data.unit}
                      onChange={e => setData('unit', parseInt(e.target.value) || 1)}
                      error={errors.unit}
                      required
                      placeholder="1"
                      min="1"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('special_task.unit_price')}
                      id='unit_price'
                      type='number'
                      value={data.unit_price}
                      onChange={e => setData('unit_price', parseFloat(e.target.value) || 0)}
                      error={errors.unit_price}
                      required
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.success.main + '10',
                      border: `1px solid ${theme.palette.success.main}30`
                    }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                        {t('special_task.total_price_calculation')}
                      </Typography>
                      <Typography variant="h6" sx={{
                        color: theme.palette.success.main,
                        fontWeight: 600,
                        fontFamily: 'monospace'
                      }}>
                        {(data.unit * data.unit_price).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* 图片上传 */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{
                  mb: 3,
                  color: theme.palette.text.primary,
                  fontWeight: 600
                }}>
                  {t('special_task.photo_info')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    {task.photo && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                          {t('special_task.current_photo')}
                        </Typography>
                        <Box
                          component="img"
                          src={`/storage/${task.photo}`}
                          alt={task.name}
                          sx={{
                            maxWidth: 200,
                            maxHeight: 200,
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`
                          }}
                        />
                      </Box>
                    )}
                    <FileInput
                      label={t('special_task.photo_new')}
                      value={data.photo}
                      onChange={file => setData('photo', file)}
                      error={errors.photo}
                      accept="image/*"
                      helperText={t('special_task.photo_helper')}
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
                <Link href={route('admin.special-tasks.index')}>
                  <Button
                    variant='outlined'
                    sx={{
                      borderColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.main,
                      '&:hover': {
                        borderColor: theme.palette.secondary.dark,
                        backgroundColor: theme.palette.secondary.main + '10',
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
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${theme.palette.secondary.main}40`,
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    px: 4,
                    py: 1.5
                  }}
                >
                  {t('common.update')}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  )
}
