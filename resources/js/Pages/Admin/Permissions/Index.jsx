import { Head, Link, usePage, router } from '@inertiajs/react'
import { Button, Card, Breadcrumb, Input, Pagination } from '../../../Components/UI'
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
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Card as MuiCard,
  CardContent,
  Divider
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyIcon from '@mui/icons-material/VpnKey';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useState, useCallback } from 'react'

export default function Index({ permissionList, filters }) {
  const { auth, permissions: userPermissions } = usePage().props
  const { t } = useTranslation()
  const theme = useTheme()
  const [search, setSearch] = useState(filters?.search || '')

  // 检查权限的辅助函数
  const hasPermission = permission => {
    if (!userPermissions || !Array.isArray(userPermissions)) {
      return false
    }
    return userPermissions.includes(permission)
  }

  const handleDelete = id => {
    if (confirm(t('permission.delete_confirm'))) {
      router.delete(route('admin.permissions.destroy', id))
    }
  }

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce(value => {
      router.get(
        route('admin.permissions.index'),
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

  // 处理搜索输入
  const handleSearchChange = e => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  // 防抖函数
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
      <Head title={t('permission.title')} />
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          {/* 面包屑导航 */}
          <Box sx={{ mb: 4 }}>
            <Breadcrumb
              items={[
                {
                  label: t('nav.dashboard'),
                  href: route('admin.dashboard'),
                },
                { label: t('permission.title') },
              ]}
            />
          </Box>

          {/* 页面标题和统计信息 */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
            {/* 左侧：标题和统计 */}
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
                <KeyIcon />
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
                  {t('permission.title')}
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
                  {t('permission.total_count', { count: permissionList?.total || 0 })}
                </Typography>
              </Box>
            </Box>

            {/* 右侧：创建按钮 */}
            {hasPermission('permissions.create') && (
              <Link href={route('admin.permissions.create')}>
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
                  {t('permission.create')}
                </Button>
              </Link>
            )}
          </Box>

          {/* 搜索区域 */}
          <MuiCard sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <TextField
                  placeholder={t('permission.search_placeholder')}
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
                    label={`${t('permission.search_results')}: "${search}" - ${permissionList?.data?.length || 0} ${t('permission.found')}`}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
            </CardContent>
          </MuiCard>

          {/* 数据表格 */}
          <MuiCard>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('common.id')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('permission.name')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('permission.guard')}
                      </Box>
                    </TableCell>
                    {(hasPermission('permissions.edit') || hasPermission('permissions.delete')) && (
                      <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {t('common.actions')}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissionList.data.map(permission => (
                    <TableRow
                      key={permission.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {permission.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {permission.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={permission.guard_name}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.primary.main + '20',
                            color: theme.palette.primary.main,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      {(hasPermission('permissions.edit') || hasPermission('permissions.delete')) && (
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {hasPermission('permissions.edit') && (
                              <Link href={route('admin.permissions.edit', permission.id)}>
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
                            {hasPermission('permissions.delete') && (
                              <Button
                                variant='contained'
                                color="error"
                                size='small'
                                onClick={() => handleDelete(permission.id)}
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

          {/* 空状态 */}
          {permissionList.data.length === 0 && (
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
                  <KeyIcon sx={{
                    fontSize: 48,
                    color: theme.palette.text.disabled
                  }} />
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                    {t('permission.no_permissions_found')}
                  </Typography>
                </Box>
              </CardContent>
            </MuiCard>
          )}

          {/* 分页组件 */}
          {permissionList.data.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination data={permissionList} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}
