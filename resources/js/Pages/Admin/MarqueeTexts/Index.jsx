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
  CardContent
} from '@mui/material'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useState, useCallback } from 'react'

export default function Index({ marqueeTexts, filters }) {
  const { auth, permissions: userPermissions } = usePage().props
  const { t } = useTranslation()
  const theme = useTheme()
  const [search, setSearch] = useState(filters?.search || '')

  const hasPermission = permission => {
    if (!userPermissions || !Array.isArray(userPermissions)) {
      return false
    }
    return userPermissions.includes(permission)
  }

  const handleDelete = marqueeTextId => {
    if (confirm(t('common.delete_confirm'))) {
      router.delete(route('admin.marquee-texts.destroy', marqueeTextId))
    }
  }

  const debouncedSearch = useCallback(
    debounce(value => {
      router.get(
        route('admin.marquee-texts.index'),
        { search: value },
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        }
      )
    }, 500),
    []
  )

  const handleSearchChange = e => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
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
      <Head title={t('marquee_text.title')} />
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
                { label: t('marquee_text.title') },
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
                <TextFieldsIcon />
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
                  {t('marquee_text.title')}
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
                  {t('common.total_count', { count: marqueeTexts?.total || 0 })}
                </Typography>
              </Box>
            </Box>

            {hasPermission('marquee_texts.create') && (
              <Link href={route('admin.marquee-texts.create')}>
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
                  {t('marquee_text.create')}
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
                  placeholder={t('marquee_text.search_placeholder')}
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
                {search && (
                  <Chip
                    icon={<SearchIcon />}
                    label={`${t('common.search_results', { count: marqueeTexts?.data?.length || 0, query: search })}`}
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
                    <TableCell sx={{ fontWeight: 600 }}>{t('marquee_text.text_label')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('common.status')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('common.order')}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{t('common.created_at')}</TableCell>
                    {(hasPermission('marquee_texts.edit') || hasPermission('marquee_texts.delete')) && (
                      <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marqueeTexts.data.map(marqueeText => (
                    <TableRow
                      key={marqueeText.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            maxWidth: 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {marqueeText.text}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={marqueeText.is_active ? t('common.active') : t('common.inactive')}
                          size="small"
                          sx={{
                            backgroundColor: marqueeText.is_active
                              ? theme.palette.success.main + '20'
                              : theme.palette.grey[300],
                            color: marqueeText.is_active
                              ? theme.palette.success.main
                              : theme.palette.text.secondary,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {marqueeText.order}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {marqueeText.created_at}
                        </Typography>
                      </TableCell>
                      {(hasPermission('marquee_texts.edit') || hasPermission('marquee_texts.delete')) && (
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {hasPermission('marquee_texts.edit') && (
                              <Link href={route('admin.marquee-texts.edit', marqueeText.id)}>
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
                            {hasPermission('marquee_texts.delete') && (
                              <Button
                                variant='contained'
                                color="error"
                                size='small'
                                onClick={() => handleDelete(marqueeText.id)}
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
          {marqueeTexts.data.length === 0 && (
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
                  <TextFieldsIcon sx={{
                    fontSize: 48,
                    color: theme.palette.text.disabled
                  }} />
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                    {t('marquee_text.no_data')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {t('common.try_different_search')}
                  </Typography>
                </Box>
              </CardContent>
            </MuiCard>
          )}

          {/* Pagination */}
          {marqueeTexts.data.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination data={marqueeTexts} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}
