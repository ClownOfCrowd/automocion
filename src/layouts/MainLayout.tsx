import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-premium-black text-premium-black dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default MainLayout 