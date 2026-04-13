import { LeadModal } from '@/components/LeadModal'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://img.usecurling.com/p/1920/1080?q=luxury%20marble%20kitchen&dpr=2")',
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <div className="container relative z-20 text-center px-4 mt-20">
        <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-6 animate-fade-in-down">
          Tradição & Exclusividade
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium max-w-4xl mx-auto leading-tight mb-8 animate-fade-in-up">
          Materiais Premium para Projetos que Transcendem Padrões
        </h1>
        <p
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          80+ anos de tradição em mármores, granitos e quartzos. Consultoria completa e execução
          impecável para arquitetos que exigem excelência.
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <LeadModal>
            <Button
              size="lg"
              className="bg-gold text-white hover:bg-white hover:text-elegant text-base px-8 py-6 transition-all duration-300 transform hover:scale-105"
            >
              Conversar com Especialista
            </Button>
          </LeadModal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  )
}
