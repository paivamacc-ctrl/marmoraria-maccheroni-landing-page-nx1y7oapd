import { Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-beige pt-20 pb-10 border-t border-border">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
        {/* Column 1: Contact */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-elegant">Marmoraria Maccheroni</h3>
          <p className="text-grey text-sm max-w-xs leading-relaxed">
            Mais de 80 anos transformando ambientes com a nobreza e precisão das rochas naturais e
            superfícies sintéticas.
          </p>
          <div className="space-y-3 text-sm text-elegant">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold" />
              <span>(16) 99770-7446</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold" />
              <a
                href="mailto:marmorariamaccheroni@hotmail.com"
                className="hover:text-gold transition-colors"
              >
                marmorariamaccheroni@hotmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Av. Europa, 1500 - São Paulo, SP</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-lg text-elegant mb-6 tracking-wide">Links Rápidos</h4>
          <ul className="space-y-4 text-sm text-grey">
            <li>
              <a href="#diferenciais" className="hover:text-gold transition-colors">
                Sobre Nós
              </a>
            </li>
            <li>
              <a href="#projetos" className="hover:text-gold transition-colors">
                Projetos Executados
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-gold transition-colors">
                Dúvidas Frequentes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gold transition-colors">
                Política de Privacidade
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social */}
        <div>
          <h4 className="font-serif text-lg text-elegant mb-6 tracking-wide">Redes Sociais</h4>
          <p className="text-grey text-sm mb-6">
            Acompanhe nossas últimas entregas e inspirações para o seu projeto.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-elegant hover:bg-gold hover:text-white transition-colors border border-border"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-elegant hover:bg-gold hover:text-white transition-colors border border-border"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container text-center text-xs text-grey border-t border-border/50 pt-8">
        &copy; {new Date().getFullYear()} Marmoraria Maccheroni. Todos os direitos reservados.
      </div>
    </footer>
  )
}
