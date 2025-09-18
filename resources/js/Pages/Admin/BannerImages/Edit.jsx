import { Head, useForm, Link, router } from '@inertiajs/react'
import { Input, Select, Button, Breadcrumb, FileInput } from '../../../Components/UI'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  useTheme,
  Grid,
  Divider,
  Paper,
  Avatar
} from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'

export default function Edit({ bannerImage }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, post, processing, errors } = useForm({
    title: bannerImage.title || '',
    image: null,
    link_url: bannerImage.link_url || '',
    is_active: bannerImage.is_active ? 'true' : 'false',
    order: bannerImage.order || 0,
    _method: 'put', // Method spoofing for Laravel
  })

  const submit = e => {
    e.preventDefault()
    // Use router.post with FormData to handle file uploads correctly
    router.post(route('admin.banner-images.update', bannerImage.id), data, {
      forceFormData: true, // Ensures data is sent as FormData
    })
  }

  return (
    <>
      <Head title={t('banner_image.edit')} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="md">
          {/* Breadcrumb */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumb
              items={[
                {
                  label: t('nav.dashboard'),
                  href: route('admin.dashboard'),
                },
                {
                  label: t('banner_image.title'),
                  href: route('admin.banner-images.index'),
                },
                { label: t('banner_image.edit') },
              ]}
            />
          </Box>

          {/* Page Title */}
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
              <ImageIcon />
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
              {t('banner_image.edit')}
            </Typography>
          </Box>

          {/* Form Card */}
          <Paper sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: `0 4px 20px ${theme.palette.primary.main}10`,
            border: `1px solid ${theme.palette.divider}`,
          }}>
            <form onSubmit={submit}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{
                  mb: 3,
                  color: theme.palette.text.primary,
                  fontWeight: 600
                }}>
                  {t('banner_image.form_title')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Input
                      label={t('banner_image.title_label')}
                      id='title'
                      type='text'
                      value={data.title}
                      onChange={e => setData('title', e.target.value)}
                      error={errors.title}
                      required
                      placeholder={t('banner_image.title_placeholder')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                        {t('banner_image.current_image')}
                      </Typography>
                      <Avatar
                        src={bannerImage.image_path ? `/storage/${bannerImage.image_path}` : ''}
                        variant="rounded"
                        sx={{
                          width: 200,
                          height: 100,
                          bgcolor: theme.palette.grey[200]
                        }}
                      >
                        <ImageIcon />
                      </Avatar>
                    </Box>
                    <FileInput
                      label={t('banner_image.new_image_label')}
                      id='image'
                      accept="image/*"
                      onChange={file => setData('image', file)}
                      error={errors.image}
                      helperText={t('banner_image.new_image_helper')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Input
                      label={t('banner_image.link_url_label')}
                      id='link_url'
                      type='url'
                      value={data.link_url}
                      onChange={e => setData('link_url', e.target.value)}
                      error={errors.link_url}
                      placeholder={t('banner_image.link_url_placeholder')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('common.order')}
                      id='order'
                      type='number'
                      value={data.order}
                      onChange={e => setData('order', parseInt(e.target.value) || 0)}
                      error={errors.order}
                      placeholder={t('common.order_placeholder')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Select
                      label={t('common.status')}
                      id='is_active'
                      value={data.is_active}
                      onChange={e => setData('is_active', e.target.value)}
                      options={[
                        { value: 'true', label: t('common.active') },
                        { value: 'false', label: t('common.inactive') }
                      ]}
                      error={errors.is_active}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Button Area */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2
              }}>
                <Link href={route('admin.banner-images.index')}>
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
