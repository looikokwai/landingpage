import { Head, Link, usePage, router } from '@inertiajs/react'
import { Button, Breadcrumb, Pagination } from '../../../Components/UI'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tooltip,
  TextField,
  InputAdornment,
  Card as MuiCard,
  CardContent,
  MenuItem
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useState, useCallback } from 'react'

export default function Index({ winners, filters, categories }) {
  const { auth, permissions: userPermissions } = usePage().props
  const { t } = useTranslation()
  const theme = useTheme()
  const [search, setSearch] = useState(filters?.search || '')
  const [categoryFilter, setCategoryFilter] = useState(filters?.category || '')

  const hasPermission = permission => {
    if (!userPermissions || !Array.isArray(userPermissions)) {
      return false
    }
    return userPermissions.includes(permission)
  }

  const handleDelete = winnerId => {
    if (confirm(t('common.delete_confirm'))) {
      router.delete(route('admin.winners-leaderboard.destroy', winnerId))
    }
  }

  const debouncedSearch = useCallback(
    debounce(value => {
      router.get(
        route('admin.winners-leaderboard.index'),
        { search: value, category: categoryFilter },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      )
    }, 500),
    [categoryFilter]
  )

  const handleSearchChange = e => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  const handleCategoryChange = e => {
    const value = e.target.value
    setCategoryFilter(value)
    router.get(
      route('admin.winners-leaderboard.index'),
      { search, category: value },
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      }
    )
  }

  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  return (
    <>
      <Head title={t('winner.title')} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          {/* Breadcrumb */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumb
              items={[
                {
                  label: t('nav.dashboard'),
                  href: route('admin.dashboard'),
                },
                { label: t('winner.title') },
              ]}
            />
          </Box>

          {/* Page Title and Stats */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
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
                <EmojiEventsIcon />
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {t('winner.title')}
                  <Tooltip title={t('common.sorted_by_latest')}>
                    <SortIcon sx={{ color: theme.palette.primary.main }} />
                  </Tooltip>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mt: 0.5
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  {t('common.total_count', { count: winners?.total || 0 })}
                </Typography>
              </Box>
            </Box>

            {hasPermission('winners_leaderboard.create') && (
              <Link href={route('admin.winners-leaderboard.create')}>
                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      transform: 'translateY(-1px)',
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {t('winner.create')}
                </Button>
              </Link>
            )}
          </Box>

          {/* Search Area */}
          <MuiCard sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <TextField
                  placeholder={t('winner.search_placeholder')}
                  value={search}
                  onChange={handleSearchChange}
                  size="small"
                  sx={{ minWidth: 300 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  select
                  label={t('winner.category_filter')}
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  size="small"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">{t('common.all_categories')}</MenuItem>
                  {Object.entries(categories).map(([key, label]) => (
                    <MenuItem key={key} value={key}>{t(`winner.category_options.${label.toLowerCase().replace(' ', '_')}`)}</MenuItem>
                  ))}
                </TextField>
                {(search || categoryFilter) && (
                  <Chip
                    icon={<SearchIcon />}
                    label={`${t('common.search_results', { count: winners?.data?.length || 0, query: search || categoryFilter })}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </CardContent>
          </MuiCard>

          {/* Data Table */}
          <MuiCard>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
                    <TableCell sx={{ fontWeight: 600 }}>{t('winner.game_name')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('winner.player_name')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('winner.bet_amount')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('winner.multiplier')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('winner.winning_amount')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('winner.category')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('common.status')}</TableCell>
                    {(hasPermission('winners_leaderboard.edit') || hasPermission('winners_leaderboard.delete')) && (
                      <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {winners.data.map(winner => (
                    <TableRow
                      key={winner.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {winner.game_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                          {winner.player_name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          RM {parseFloat(winner.bet_amount).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {winner.multiplier}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.success.main, fontWeight: 500 }}>
                          +RM {parseFloat(winner.winning_amount).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(`winner.category_options.${categories[winner.category]?.toLowerCase().replace(' ', '_')}`) || winner.category}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.primary.main + '20',
                            color: theme.palette.primary.main,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={winner.is_active ? t('common.active') : t('common.inactive')}
                          size="small"
                          sx={{
                            backgroundColor: winner.is_active
                              ? theme.palette.success.main + '20'
                              : theme.palette.grey[300],
                            color: winner.is_active
                              ? theme.palette.success.main
                              : theme.palette.text.secondary,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      {(hasPermission('winners_leaderboard.edit') || hasPermission('winners_leaderboard.delete')) && (
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {hasPermission('winners_leaderboard.edit') && (
                              <Link href={route('admin.winners-leaderboard.edit', winner.id)}>
                                <Button
                                  variant='outlined'
                                  size='small'
                                  startIcon={<EditIcon />}
                                  sx={{
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                      borderColor: theme.palette.primary.dark,
                                      backgroundColor: theme.palette.primary.main + '10',
                                    }
                                  }}
                                >
                                  {t('common.edit')}
                                </Button>
                              </Link>
                            )}
                            {hasPermission('winners_leaderboard.delete') && (
                              <Button
                                variant='contained'
                                color="error"
                                size='small'
                                onClick={() => handleDelete(winner.id)}
                                startIcon={<DeleteIcon />}
                                sx={{
                                  '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: `0 4px 12px ${theme.palette.error.main}40`,
                                  },
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                              >
                                {t('common.delete')}
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MuiCard>

          {/* Empty State */}
          {winners.data.length === 0 && (
            <MuiCard sx={{ mt: 3 }}>
              <CardContent>
                <Box sx={{
                  textAlign: 'center',
                  py: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <EmojiEventsIcon sx={{
                    fontSize: 48,
                    color: theme.palette.text.disabled
                  }} />
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                    {t('winner.no_data')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {t('common.try_different_search')}
                  </Typography>
                </Box>
              </CardContent>
            </MuiCard>
          )}

          {/* Pagination */}
          {winners.data.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination data={winners} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}
