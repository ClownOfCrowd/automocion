import { useEffect, useRef } from 'react'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useLoading } from '../contexts/LoadingContext'
import { useLocation } from 'react-router-dom'

interface UseLoadingManagerOptions {
  minimumLoadingTime?: number // Минимальное время показа загрузочного экрана
  delayTime?: number // Задержка перед показом загрузочного экрана
  complexPaths?: string[] // Пути, требующие загрузочного экрана
}

export const useLoadingManager = (options: UseLoadingManagerOptions = {}) => {
  const {
    minimumLoadingTime = 700,
    delayTime = 500, // Увеличиваем задержку
    complexPaths = ['/catalog'] // Пути со сложной загрузкой
  } = options

  const { showLoading, hideLoading } = useLoading()
  const location = useLocation()
  
  // Получаем количество активных запросов
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  // Refs для отслеживания состояния
  const loadingTimeoutRef = useRef<NodeJS.Timeout>()
  const startTimeRef = useRef<number>(0)
  const initialLoadRef = useRef<boolean>(true)
  const lastPathRef = useRef<string>('')
  
  useEffect(() => {
    const isComplexPath = complexPaths.some(path => location.pathname.startsWith(path))
    const isPathChanged = lastPathRef.current !== location.pathname
    lastPathRef.current = location.pathname

    // Показываем загрузку только при первом входе на сложные страницы
    if (isComplexPath && isPathChanged && initialLoadRef.current) {
      startTimeRef.current = Date.now()
      showLoading()
      initialLoadRef.current = false
      return
    }

    const isLoading = isFetching > 0 || isMutating > 0

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current)
    }

    if (isLoading && isComplexPath) {
      loadingTimeoutRef.current = setTimeout(() => {
        // Показываем загрузку только если запрос все еще активен
        if (isFetching > 0 || isMutating > 0) {
          startTimeRef.current = Date.now()
          showLoading()
        }
      }, delayTime)
    } else {
      const elapsedTime = Date.now() - startTimeRef.current
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime)

      setTimeout(() => {
        hideLoading()
      }, remainingTime)
    }

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [
    isFetching,
    isMutating,
    location.pathname,
    showLoading,
    hideLoading,
    minimumLoadingTime,
    delayTime,
    complexPaths
  ])

  // Функция для ручного управления загрузкой
  const withLoading = async <T,>(promise: Promise<T>, force: boolean = false): Promise<T> => {
    if (!force) {
      return promise
    }

    const startTime = Date.now()
    showLoading()

    try {
      const result = await promise
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime)
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime))
      }
      
      return result
    } finally {
      hideLoading()
    }
  }

  return {
    showLoading,
    hideLoading,
    withLoading
  }
} 