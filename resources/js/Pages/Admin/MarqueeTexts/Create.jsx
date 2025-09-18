import { Head, useForm, Link } from '@inertiajs/react'
import { Input, Select, Button, Breadcrumb } from '../../../Components/UI'
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
import TextFieldsIcon from '@mui/icons-material/TextFields'

export default function Create() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, post, processing, errors, reset } = useForm({
    text: '',
    is_active: 'true',
    order: 0
  })

  const submit = e => {
    e.preventDefault()
    post(route('admin.marquee-texts.store'), {
      onSuccess: () => reset(),
    })
  }

  return (
    <>
      <Head title={t('marquee_text.create')} />
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
                  label: t('marquee_text.title'),
                  href: route('admin.marquee-texts.index'),
                },
                { label: t('marquee_text.create') },
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
              <TextFieldsIcon />
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
              {t('marquee_text.create')}
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
                  {t('marquee_text.form_title')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <Input
                      label={t('marquee_text.text_label')}
                      id='text'
                      type='text'
                      value={data.text}
                      onChange={e => setData('text', e.target.value)}
                      error={errors.text}
                      required
                      placeholder={t('marquee_text.text_placeholder')}
                      multiline
                      rows={4}
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
                <Link href={route('admin.marquee-texts.index')}>
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
                  {t('marquee_text.create')}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  )
}
