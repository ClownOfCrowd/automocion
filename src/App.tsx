import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import CarDetailPage from './pages/CarDetailPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import RentalTermsPage from './pages/RentalTermsPage'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import { LoadingProvider } from './contexts/LoadingContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useLoadingManager } from './hooks/useLoadingManager'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      suspense: true,
    },
  },
})

const AnimatedRoutes = () => {
  const location = useLocation()
  const { isLoading } = useLoadingManager()
  
  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={
              <Suspense fallback={null}>
                <HomePage />
              </Suspense>
            } />
            <Route path="catalog/:id" element={
              <Suspense fallback={null}>
                <CarDetailPage />
              </Suspense>
            } />
            <Route path="contact" element={
              <Suspense fallback={null}>
                <ContactPage />
              </Suspense>
            } />
            <Route path="checkout" element={
              <Suspense fallback={null}>
                <CheckoutPage />
              </Suspense>
            } />
            <Route path="checkout/success" element={
              <Suspense fallback={null}>
                <CheckoutSuccessPage />
              </Suspense>
            } />
            <Route path="terms" element={
              <Suspense fallback={null}>
                <RentalTermsPage />
              </Suspense>
            } />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingProvider>
          <Router>
            <ScrollToTop />
            <AnimatedRoutes />
          </Router>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
