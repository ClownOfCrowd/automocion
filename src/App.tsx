import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
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
import { HelmetProvider } from 'react-helmet-async'

// Конфигурация маршрутов - вместо повторения одинаковых маршрутов для каждого языка
const routes = [
  { path: "/", element: <HomePage /> },
  { path: "catalog", element: <CatalogPage /> },
  { path: "catalog/:id", element: <CarDetailPage /> },
  { path: "contact", element: <ContactPage /> },
  { path: "checkout", element: <CheckoutPage /> },
  { path: "checkout/success", element: <CheckoutSuccessPage /> },
  { path: "terms", element: <RentalTermsPage /> },
  { path: "privacy", element: <PrivacyPage /> },
  { path: "blog", element: <BlogPage /> },
  { path: "blog/:postId", element: <BlogPostPage /> },
  { path: "news", element: <NewsPage /> },
  { path: "news/:articleId", element: <NewsArticlePage /> }
];

// Языковые префиксы, для которых будут созданы дублирующие маршруты
const languagePrefixes = ["", "en", "fr", "de", "ru"];

const AnimatedRoutes = () => {
  const location = useLocation()
  const { isLoading } = useLoadingManager()
  
  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Генерируем маршруты для всех языковых версий */}
          {languagePrefixes.map(prefix => (
            <Route 
              key={prefix}
              path={prefix ? `/${prefix}` : "/"} 
              element={<MainLayout />}
            >
              {prefix === "" ? (
                // Для корневого пути "/" нужен маршрут index
                <Route 
                  index 
                  element={
                    <Suspense fallback={null}>
                      <HomePage />
                    </Suspense>
                  } 
                />
              ) : (
                // Для языковых маршрутов вида "/en" нужен маршрут index
                <Route 
                  index
                  element={
                    <Suspense fallback={null}>
                      <HomePage />
                    </Suspense>
                  } 
                />
              )}
              
              {/* Добавляем все остальные маршруты для текущего префикса */}
              {routes.filter(route => route.path !== "/").map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={null}>
                      {route.element}
                    </Suspense>
                  }
                />
              ))}
            </Route>
          ))}
        </Routes>
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LoadingProvider>
          <Router>
            <ScrollToTop />
            <BookingNotifications />
            <AnimatedRoutes />
          </Router>
        </LoadingProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
