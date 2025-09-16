import { useForm, Head } from '@inertiajs/react'
import { Input, Button, Checkbox, Card } from '../../Components/UI'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography, FormControlLabel, Checkbox as MuiCheckbox, useTheme } from '@mui/material'

export default function Login() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { data, setData, post, processing, errors } = useForm({
    login: '',
    password: '',
    remember: false,
  })

  function submit(e) {
    e.preventDefault()
    post(route('admin.login'))
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}10 100%)`,
        px: 2
      }}
    >
      <Head title={t('auth.login')} />
      <Container maxWidth="sm">
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <Card
            title={t('auth.login')}
            sx={{
              boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Input
                  label={t('auth.username_or_email')}
                  id='login'
                  type='text'
                  value={data.login}
                  onChange={e => setData('login', e.target.value)}
                  error={errors.login}
                  required
                  placeholder={t('auth.username_or_email_placeholder')}
                />
              </Box>

              <Box>
                <Input
                  label={t('auth.password')}
                  id='password'
                  type='password'
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  error={errors.password}
                  required
                />
              </Box>

              <Box sx={{ pt: 1 }}>
                <FormControlLabel
                  control={
                    <MuiCheckbox
                      checked={data.remember}
                      onChange={e => setData('remember', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {t('auth.remember')}
                    </Typography>
                  }
                />
              </Box>

              <Button
                type='submit'
                loading={processing}
                variant='contained'
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {t('auth.login_button')}
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
