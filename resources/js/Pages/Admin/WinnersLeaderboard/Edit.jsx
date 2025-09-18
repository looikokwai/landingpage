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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

export default function Edit({ winner, categories }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, put, processing, errors } = useForm({
    game_name: winner.game_name || '',
    player_name: winner.player_name || '',
    bet_amount: winner.bet_amount || '',
    multiplier: winner.multiplier || '',
    winning_amount: winner.winning_amount || '',
    category: winner.category || 'latest_winner',
    background_color: winner.background_color || '#f5f5f5',
    is_active: winner.is_active ? 'true' : 'false',
    order: winner.order || 0
  })

  const submit = e => {
    e.preventDefault()
    put(route('admin.winners-leaderboard.update', winner.id))
  }

  const categoryOptions = Object.entries(categories).map(([value, label]) => ({
    value,
    label: t(`winner.category_options.${label.toLowerCase().replace(' ', '_')}`)
  }))

  return (
    <>
      <Head title={t('winner.edit')} />
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
                  label: t('winner.title'),
                  href: route('admin.winners-leaderboard.index'),
                },
                { label: t('winner.edit') },
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
              <EmojiEventsIcon />
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
              {t('winner.edit')}
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
                  {t('winner.form_title')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('winner.game_name')}
                      id='game_name'
                      type='text'
                      value={data.game_name}
                      onChange={e => setData('game_name', e.target.value)}
                      error={errors.game_name}
                      required
                      placeholder={t('winner.game_name')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('winner.player_name')}
                      id='player_name'
                      type='text'
                      value={data.player_name}
                      onChange={e => setData('player_name', e.target.value)}
                      error={errors.player_name}
                      required
                      placeholder={t('winner.player_name')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('winner.bet_amount')}
                      id='bet_amount'
                      type='number'
                      step='0.01'
                      value={data.bet_amount}
                      onChange={e => setData('bet_amount', e.target.value)}
                      error={errors.bet_amount}
                      required
                      placeholder="0.00"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('winner.multiplier')}
                      id='multiplier'
                      type='text'
                      value={data.multiplier}
                      onChange={e => setData('multiplier', e.target.value)}
                      error={errors.multiplier}
                      required
                      placeholder="e.g., 100x"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('winner.winning_amount')}
                      id='winning_amount'
                      type='number'
                      step='0.01'
                      value={data.winning_amount}
                      onChange={e => setData('winning_amount', e.target.value)}
                      error={errors.winning_amount}
                      required
                      placeholder="0.00"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Select
                      label={t('winner.category')}
                      id='category'
                      value={data.category}
                      onChange={e => setData('category', e.target.value)}
                      options={categoryOptions}
                      error={errors.category}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('winner.background_color')}
                      id='background_color'
                      type='color'
                      value={data.background_color}
                      onChange={e => setData('background_color', e.target.value)}
                      error={errors.background_color}
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
                  <Grid size={{ xs: 12 }}>
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
                <Link href={route('admin.winners-leaderboard.index')}>
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
