import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense } from 'react'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import CarDetailPage from './pages/CarDetailPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import RentalTermsPage from './pages/RentalTermsPage'
import CatalogPage from './pages/CatalogPage'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import { LoadingProvider } from './contexts/LoadingContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useLoadingManager } from './hooks/useLoadingManager'
import BookingNotifications from './components/BookingNotifications'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'

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
            <Route path="catalog" element={
              <Suspense fallback={null}>
                <CatalogPage />
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
            <Route path="privacy" element={
              <Suspense fallback={null}>
                <PrivacyPage />
              </Suspense>
            } />
            <Route path="blog" element={
              <Suspense fallback={null}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="blog/:postId" element={
              <Suspense fallback={null}>
                <BlogPostPage />
              </Suspense>
            } />
            <Route path="news" element={
              <Suspense fallback={null}>
                <NewsPage />
              </Suspense>
            } />
            <Route path="news/:articleId" element={
              <Suspense fallback={null}>
                <NewsArticlePage />
              </Suspense>
            } />
          </Route>
        </Routes>
      </AnimatePresence>
      <BookingNotifications />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <Router>
          <ScrollToTop />
          <AnimatedRoutes />
        </Router>
      </LoadingProvider>
    </ThemeProvider>
  )
}

export default App
