import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FloatingChat } from './FloatingChat'

export default function Layout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <FloatingChat />
    </main>
  )
}
