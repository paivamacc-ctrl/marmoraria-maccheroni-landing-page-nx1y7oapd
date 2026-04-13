import { MessageSquare, FileText, Wrench } from 'lucide-react'

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: <MessageSquare className="w-6 h-6 text-elegant" />,
      title: 'Tire suas Dúvidas',
      desc: 'Use nosso chat inteligente ou WhatsApp para perguntas rápidas sobre materiais e prazos.',
    },
    {
      num: '02',
      icon: <FileText className="w-6 h-6 text-elegant" />,
      title: 'Envie o Projeto',
      desc: 'Compartilhe as plantas e referências. Nossa equipe técnica fará a leitura completa das especificações.',
    },
    {
      num: '03',
      icon: <Wrench className="w-6 h-6 text-elegant" />,
      title: 'Consultoria e Execução',
      desc: 'Apresentamos a viabilidade, sugerimos as melhores pedras e agendamos a medição final.',
    },
  ]

  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Processo Maccheroni
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-elegant">
            Do Conceito à Realidade, Sem Complicações.
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-white p-6 rounded-xl relative group"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-6xl text-beige font-bold select-none transition-transform group-hover:-translate-y-2">
                  {step.num}
                </div>
                <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center mb-6 shadow-sm border border-white">
                  {step.icon}
                </div>
                <h3 className="font-serif text-xl text-elegant mb-3">{step.title}</h3>
                <p className="text-grey text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
