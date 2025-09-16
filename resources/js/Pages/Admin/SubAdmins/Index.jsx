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
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SortIcon from '@mui/icons-material/Sort';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useCallback } from 'react'

export default function Index({ subAdmins, filters }) {
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

  const handleDelete = subAdminId => {
    if (confirm(t('admin.delete_confirm'))) {
      router.delete(route('admin.sub-admins.destroy', subAdminId))
    }
  }

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce(value => {
      router.get(
        route('admin.sub-admins.index'),
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
      <Head title={t('subadmin.title')} />
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
                { label: t('subadmin.title') },
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
                <GroupIcon />
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
                  {t('subadmin.title')}
                  <SortIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
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
                  {t('subadmin.total_count', {
                    count: subAdmins?.total || 0,
                  })}
                </Typography>
              </Box>
            </Box>

            {/* 右侧：创建按钮 */}
            {hasPermission('subadmins.create') && (
              <Link href={route('admin.sub-admins.create')}>
                <Button
                  variant='contained'
                  startIcon={<PersonAddIcon />}
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
                  {t('subadmin.create')}
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
                  placeholder={t('subadmin.search_placeholder')}
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
                    label={`${t('subadmin.search_results')}: "${search}" - ${subAdmins?.data?.length || 0} ${t('subadmin.found')}`}
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
                        {t('common.name')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('common.username')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('common.email')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('common.role')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('subadmin.parent_admin')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('common.created_at')}
                      </Box>
                    </TableCell>
                    {(hasPermission('subadmins.edit') || hasPermission('subadmins.delete')) && (
                      <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary, textAlign: 'right' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                          {t('common.actions')}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subAdmins?.data?.map(subAdmin => (
                    <TableRow
                      key={subAdmin.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main + '20',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <GroupIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {subAdmin.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          fontFamily: 'monospace'
                        }}>
                          {subAdmin.username}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {subAdmin.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(`role.${subAdmin.role}`)}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.primary.main + '20',
                            color: theme.palette.primary.main,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {subAdmin.parent_admin ? subAdmin.parent_admin.name : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {new Date(subAdmin.created_at).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      {(hasPermission('subadmins.edit') || hasPermission('subadmins.delete')) && (
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {hasPermission('subadmins.edit') && (
                              <Link href={route('admin.sub-admins.edit', subAdmin.id)}>
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
                            {hasPermission('subadmins.delete') && (
                              <Button
                                variant='contained'
                                color="error"
                                size='small'
                                onClick={() => handleDelete(subAdmin.id)}
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
          {(!subAdmins || subAdmins.data.length === 0) && (
            <MuiCard sx={{ mt: 3 }}>
              <CardContent>
                <Box sx={{
                  textAlign: 'center',
                  py: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <GroupIcon sx={{
                    fontSize: 48,
                    color: theme.palette.text.disabled,
                    mb: 2
                  }} />
                  <Typography variant="h6" sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600
                  }}>
                    {t('subadmin.no_subadmins_found')}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: theme.palette.text.secondary,
                    mb: 3
                  }}>
                    {t('subadmin.try_different_search')}
                  </Typography>
                  {hasPermission('subadmins.create') && (
                    <Link href={route('admin.sub-admins.create')}>
                      <Button
                        variant='contained'
                        startIcon={<PersonAddIcon />}
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
                        {t('subadmin.create')}
                      </Button>
                    </Link>
                  )}
                </Box>
              </CardContent>
            </MuiCard>
          )}

          {/* 分页组件 */}
          {subAdmins && subAdmins.data.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination data={subAdmins} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}
