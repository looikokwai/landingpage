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
  IconButton,
  Card as MuiCard,
  CardContent
} from '@mui/material'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState, useEffect } from 'react'

export default function Edit({ gameSection, sectionTypes }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const [games, setGames] = useState([])

  const { data, setData, processing, errors } = useForm({
    _method: 'put',
    section_name: gameSection.section_name || '',
    section_type: gameSection.section_type || 'popular_games',
    is_active: gameSection.is_active ? 'true' : 'false',
    order: gameSection.order || 0,
  })

  useEffect(() => {
    if (gameSection.games_data && gameSection.games_data.length > 0) {
      setGames(gameSection.games_data.map(game => ({
        image: game.image || null,
        name: game.name || '',
        provider: game.provider || '',
        rtp: game.rtp || '',
        status: game.status || 'none'
      })))
    } else {
      setGames([{ image: null, name: '', provider: '', rtp: '', status: 'none' }])
    }
  }, [gameSection.games_data])

  const addGame = () => {
    setGames([...games, { image: null, name: '', provider: '', rtp: '', status: 'none' }])
  }

  const removeGame = (index) => {
    if (games.length > 1) {
      const newGames = games.filter((_, i) => i !== index)
      setGames(newGames)
    }
  }

  const updateGame = (index, field, value) => {
    const newGames = [...games]
    newGames[index][field] = value
    setGames(newGames)
  }

  const submit = e => {
    e.preventDefault()
    const formData = {
      ...data,
      games_data: games,
    }

    router.post(route('admin.game-sections.update', gameSection.id), formData, {
      forceFormData: true,
    })
  }

  const sectionTypeOptions = Object.entries(sectionTypes).map(([value, label]) => ({
    value,
    label: t(`game_sections.section_types.${value}`)
  }))

  return (
    <>
      <Head title={t('game_sections.edit')} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {/* Breadcrumb */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumb
              items={[
                {
                  label: t('nav.dashboard'),
                  href: route('admin.dashboard'),
                },
                {
                  label: t('game_sections.title'),
                  href: route('admin.game-sections.index'),
                },
                { label: t('game_sections.edit') },
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
              <SportsEsportsIcon />
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
              {t('game_sections.edit')}
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
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  {t('game_sections.basic_info')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Input
                      label={t('game_sections.section_name')}
                      id='section_name'
                      type='text'
                      value={data.section_name}
                      onChange={e => setData('section_name', e.target.value)}
                      error={errors.section_name}
                      required
                      placeholder={t('game_sections.name_placeholder')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Select
                      label={t('game_sections.section_type')}
                      id='section_type'
                      value={data.section_type}
                      onChange={e => setData('section_type', e.target.value)}
                      options={sectionTypeOptions}
                      error={errors.section_type}
                      required
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

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('game_sections.games_list')}
                  </Typography>
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addGame}
                  >
                    {t('game_sections.add_game')}
                  </Button>
                </Box>

                {games.map((game, index) => (
                  <MuiCard key={index} sx={{ mb: 3, border: `1px solid ${theme.palette.divider}` }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {t('game_sections.game')} {index + 1}
                        </Typography>
                        {games.length > 1 && (
                          <IconButton onClick={() => removeGame(index)} color="error" size="small">
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                          {game.image && typeof game.image === 'string' && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                                {t('game_sections.current_image')}
                              </Typography>
                              <Box
                                component="img"
                                src={game.image}
                                alt={game.name}
                                sx={{
                                  maxWidth: 200,
                                  maxHeight: 200,
                                  borderRadius: 2,
                                  border: `1px solid ${theme.palette.divider}`,
                                  objectFit: 'cover'
                                }}
                              />
                            </Box>
                          )}
                          <FileInput
                            label={t('game_sections.game_image')}
                            value={game.image instanceof File ? game.image : null}
                            onChange={file => updateGame(index, 'image', file)}
                            error={errors[`games_data.${index}.image`]}
                            accept="image/*"
                            helperText={t('game_sections.image_replace_helper')}
                          />
                          {game.image instanceof File && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                                {t('game_sections.new_selected_image')}
                              </Typography>
                              <Box
                                component="img"
                                src={URL.createObjectURL(game.image)}
                                alt="Preview"
                                sx={{
                                  maxWidth: 200,
                                  maxHeight: 200,
                                  borderRadius: 2,
                                  border: `1px solid ${theme.palette.divider}`,
                                  objectFit: 'cover'
                                }}
                              />
                            </Box>
                          )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Input
                            label={t('game_sections.game_name')}
                            id={`game_${index}_name`}
                            type='text'
                            value={game.name}
                            onChange={e => updateGame(index, 'name', e.target.value)}
                            error={errors[`games_data.${index}.name`]}
                            required
                            placeholder={t('game_sections.game_name_placeholder')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Input
                            label={t('game_sections.provider')}
                            id={`game_${index}_provider`}
                            type='text'
                            value={game.provider}
                            onChange={e => updateGame(index, 'provider', e.target.value)}
                            error={errors[`games_data.${index}.provider`]}
                            required
                            placeholder={t('game_sections.provider_placeholder')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Input
                            label={t('game_sections.rtp')}
                            id={`game_${index}_rtp`}
                            type='text'
                            value={game.rtp}
                            onChange={e => updateGame(index, 'rtp', e.target.value)}
                            error={errors[`games_data.${index}.rtp`]}
                            required
                            placeholder={t('game_sections.rtp_placeholder')}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Select
                            label={t('game_sections.game_status')}
                            id={`game_${index}_status`}
                            value={game.status}
                            onChange={e => updateGame(index, 'status', e.target.value)}
                            options={[
                              { value: 'none', label: t('game_sections.game_status_options.none') },
                              { value: 'hot', label: t('game_sections.game_status_options.hot') },
                              { value: 'new', label: t('game_sections.game_status_options.new') }
                            ]}
                            error={errors[`games_data.${index}.status`]}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </MuiCard>
                ))}
              </Box>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
                <Link href={route('admin.game-sections.index')}>
                  <Button variant='outlined'>
                    {t('common.back_to_list')}
                  </Button>
                </Link>
                <Button type='submit' loading={processing} variant='contained' size="large">
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
