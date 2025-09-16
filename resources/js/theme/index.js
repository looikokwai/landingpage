import { createTheme } from '@mui/material/styles'

// 创建 MUI 主题配置 - 用户端主题
// Desktop View 颜色配置
export const desktopViewColors = {
  primary: {
    red: '#a90000',        // 主要红色
    darkRed: '#8b0000',    // 深红色
  },
  gold: {
    border: '#d8ac01',     // 金色边框
    bright: '#f5c600',     // 亮金色
  },
  background: {
    main: '#ffffff',       // 背景色
    dark: '#1a1a1a',       // 深色背景
  },
  text: {
    primary: '#000000',    // 主要文字色
    secondary: '#b0b0b0',  // 次要文字色
    white: '#ffffff',      // 白色文字
  },
  accent: {
    blue: '#4fc3f7',       // 蓝色强调色
  },
  gradient: {
    primary: 'linear-gradient(135deg, #ff5252, #d84315)',     // 主要渐变
    primaryHover: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', // 主要渐变悬停
  },
  border: {
    dark: '#333333',       // 深色边框
  },
  shadow: {
    light: '#00000026',    // 浅阴影
    medium: '#00000040',   // 中等阴影
  },
}

// 创建 MUI 主题配置
export const theme = createTheme({
  palette: {
    mode: 'dark', // 深色主题
    primary: {
      main: '#6366f1', // 紫色主色调
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // 绿色辅助色
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444', // 红色错误色
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b', // 橙色警告色
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6', // 蓝色信息色
      light: '#60a5fa',
      dark: '#2563eb',
    },
    success: {
      main: '#10b981', // 绿色成功色
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#0f172a', // 深色背景
      paper: '#1e293b',   // 卡片背景
    },
    text: {
      primary: '#f8fafc',   // 主要文字
      secondary: '#cbd5e1', // 次要文字
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none', // 移除大写转换
    },
  },
  shape: {
    borderRadius: 8, // 统一圆角
  },
  spacing: 8, // 统一间距单位
  components: {
    // 全局组件样式覆盖
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e293b',
          borderRight: '1px solid #334155',
        },
      },
    },
  },
})

// 浅色主题变体（可选）
export const lightTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'light',
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
})

export default theme
