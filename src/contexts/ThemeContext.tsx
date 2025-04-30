import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' // Теперь у нас только темная тема

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void // Оставляем для обратной совместимости, но функция ничего не будет делать
  setTheme: (theme: Theme) => void // Оставляем для обратной совместимости
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Теперь всегда используется темная тема
  const [theme] = useState<Theme>('dark')

  // Применяем тему к документу при инициализации
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.add('dark')
    
    // Сохраняем настройку в localStorage для совместимости
    localStorage.setItem('theme', 'dark')
  }, [])

  // Оставляем пустые функции для обратной совместимости
  const toggleTheme = () => {
    // Ничего не делает, так как у нас только темная тема
    console.log('Theme toggling is disabled, only dark theme is available')
  }

  const setTheme = () => {
    // Ничего не делает, так как у нас только темная тема
    console.log('Setting theme is disabled, only dark theme is available')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 