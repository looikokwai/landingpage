import { Head, Link, usePage, router } from '@inertiajs/react'
import { Button, Card, Input, Breadcrumb, Pagination } from '../../../Components/UI'
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
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Grid,
  Card as MuiCard,
  CardContent,
  Divider
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useState, useCallback } from 'react'

export default function Index({ tasks, filters, statusOptions }) {
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

  const handleDelete = taskId => {
    if (confirm(t('task.delete_confirm'))) {
      router.delete(route('admin.tasks.destroy', taskId), {
        onSuccess: () => {
          // Flash message now handled globally by app.jsx
        },
        onError: errors => {
          console.error('Error deleting task:', errors)
          // Flash message now handled globally by app.jsx
        },
      })
    }
  }

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce(value => {
      router.get(
        route('admin.tasks.index'),
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

  // 获取状态颜色
  const getStatusColor = (isActive) => {
    return isActive ? theme.palette.success.main : theme.palette.error.main
  }

  return (
    <>
      <Head title={t('task.title')} />
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
                { label: t('task.title') },
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
                <AssignmentIcon />
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
                  {t('task.title')}
                  <Tooltip title="最新到最旧排序">
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
                  {t('task.total_count', {
                    count: tasks?.total || 0,
                  })}
                </Typography>
              </Box>
            </Box>

            {/* 右侧：创建按钮 */}
            {hasPermission('tasks.create') && (
              <Link href={route('admin.tasks.create')}>
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
                  {t('task.create')}
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
                  placeholder={t('task.search_placeholder')}
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
                    label={`${t('task.search_results')}: "${search}" - ${tasks?.data?.length || 0} ${t('task.found')}`}
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
                        {t('task.photo')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('task.name')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('task.description')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('task.status')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('task.unit')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('task.unit_price')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ fontSize: 16 }} />
                        {t('task.total_price')}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {t('common.created_at')}
                      </Box>
                    </TableCell>
                    {(hasPermission('tasks.edit') || hasPermission('tasks.delete')) && (
                      <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {t('common.actions')}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.data.map(task => (
                    <TableRow
                      key={task.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          fontFamily: 'monospace'
                        }}>
                          #{task.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {task.photo ? (
                          <Box
                            component="img"
                            src={`/storage/${task.photo}`}
                            alt={task.name}
                            sx={{
                              width: 100,
                              borderRadius: 1,
                              objectFit: 'cover',
                              border: `1px solid ${theme.palette.divider}`
                            }}
                          />
                        ) : (
                          <Avatar sx={{
                            bgcolor: theme.palette.grey[300],
                            width: 50,
                            height: 50
                          }}>
                            <AssignmentIcon sx={{ color: theme.palette.grey[600] }} />
                          </Avatar>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {task.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{
                          color: theme.palette.text.secondary,
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {task.description || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(`common.status_options.${task.is_active ? 'active' : 'inactive'}`)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(task.is_active) + '20',
                            color: getStatusColor(task.is_active),
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {task.unit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{
                          color: theme.palette.text.secondary,
                          fontFamily: 'monospace'
                        }}>
                          {parseFloat(task.unit_price).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{
                          color: theme.palette.success.main,
                          fontWeight: 600,
                          fontFamily: 'monospace'
                        }}>
                          {parseFloat(task.total_price).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {new Date(task.created_at).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      {(hasPermission('tasks.edit') || hasPermission('tasks.delete')) && (
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {hasPermission('tasks.edit') && (
                              <Link href={route('admin.tasks.edit', task.id)}>
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
                            {hasPermission('tasks.delete') && (
                              <Button
                                variant='contained'
                                color="error"
                                size='small'
                                onClick={() => handleDelete(task.id)}
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
          {tasks.data.length === 0 && (
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
                  <AssignmentIcon sx={{
                    fontSize: 48,
                    color: theme.palette.text.disabled
                  }} />
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                    {t('task.no_tasks_found')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {t('task.try_different_search')}
                  </Typography>
                </Box>
              </CardContent>
            </MuiCard>
          )}

          {/* 分页组件 */}
          {tasks.data.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Pagination data={tasks} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}
