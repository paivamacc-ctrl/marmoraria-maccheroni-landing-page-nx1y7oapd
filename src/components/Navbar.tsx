import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { LeadModal } from './LeadModal'
import { Button } from './ui/button'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-beige/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          <a
            href="#"
            className={`font-serif text-2xl font-semibold tracking-wide transition-colors ${
              isScrolled ? 'text-elegant' : 'text-white'
            }`}
          >
            Marmoraria Maccheroni
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium relative group transition-colors ${
                  isScrolled
                    ? 'text-elegant/80 hover:text-elegant'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold transition-all group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <LeadModal>
              <Button
                variant={isScrolled ? 'default' : 'outline'}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? 'bg-elegant text-white hover:bg-gold'
                    : 'bg-transparent border-white text-white hover:bg-white hover:text-elegant'
                }`}
              >
                Conversar com Especialista
              </Button>
            </LeadModal>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-elegant' : 'text-white'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-beige flex flex-col p-6 animate-in slide-in-from-right-full duration-300">
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif text-2xl text-elegant">Marmoraria Maccheroni</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-elegant" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-center flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-elegant hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="mt-auto pb-8">
            <LeadModal>
              <Button className="w-full bg-elegant text-white py-6 text-lg hover:bg-gold">
                Conversar com Especialista
              </Button>
            </LeadModal>
          </div>
        </div>
      )}
    </>
  )
}
