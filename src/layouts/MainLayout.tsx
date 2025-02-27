import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BookingNotifications from '../components/BookingNotifications'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <BookingNotifications />
    </div>
  )
}

export default MainLayout 