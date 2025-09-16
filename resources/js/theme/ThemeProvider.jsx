import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme, lightTheme } from './index'
import { themeModeUtils } from './themeUtils'

// 创建主题上下文
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
})

// 自定义 Hook 用于使用主题
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// 主题提供者组件
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(themeModeUtils.getInitialThemeMode)

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev
      // 保存到 localStorage
      themeModeUtils.saveThemeMode(newMode ? 'dark' : 'light')
      return newMode
    })
  }

  const currentTheme = isDarkMode ? theme : lightTheme

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
