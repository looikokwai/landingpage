import { alpha } from '@mui/material/styles'

// 主题模式工具函数
export const themeModeUtils = {
  // 获取当前主题模式
  getCurrentThemeMode: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedMode = window.localStorage.getItem('themeMode');
      if (storedMode) {
        return storedMode;
      }
    }
    // 默认使用浅色主题
    return 'light';
  },

  // 保存主题模式
  saveThemeMode: (mode) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('themeMode', mode);
    }
  },

  // 清除主题模式设置（恢复默认）
  clearThemeMode: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('themeMode');
    }
  },

  // 检查是否支持主题切换
  isThemeModeSupported: () => {
    return typeof window !== 'undefined' && window.localStorage;
  },

  // 获取初始主题模式（用于 useState 初始化）
  getInitialThemeMode: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedMode = window.localStorage.getItem('themeMode');
      if (storedMode) {
        return storedMode === 'dark';
      }
    }
    // 默认使用浅色主题
    return false;
  }
};

// 主题工具函数
export const themeUtils = {
  // 创建半透明颜色
  createAlphaColor: (color, alphaValue) => alpha(color, alphaValue),

  // 获取主题颜色
  getThemeColor: (theme, colorName, shade = 'main') => {
    return theme.palette[colorName]?.[shade] || theme.palette.primary.main
  },

  // 创建渐变背景
  createGradient: (color1, color2, direction = 'to right') => {
    return `linear-gradient(${direction}, ${color1}, ${color2})`
  },

  // 创建阴影
  createShadow: (theme, elevation = 1) => {
    const shadows = [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    ]
    return shadows[Math.min(elevation, shadows.length - 1)]
  },

  // 响应式断点
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },

  // 常用间距
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // 常用圆角
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
}

export default themeUtils
