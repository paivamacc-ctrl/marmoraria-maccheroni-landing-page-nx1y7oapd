import { Cog, Handshake, ShieldCheck } from 'lucide-react'

export function DifferentialsSection() {
  const items = [
    {
      icon: <Cog className="w-8 h-8 text-gold" />,
      title: 'Tecnologia de Ponta',
      description:
        'Cortes precisos com maquinário CNC italiano de 5 eixos, garantindo acabamentos impecáveis e encaixes perfeitos em veios complexos.',
    },
    {
      icon: <Handshake className="w-8 h-8 text-gold" />,
      title: 'Parceria Estratégica',
      description:
        'Atuação consultiva junto a arquitetos. Do projeto à especificação técnica do material ideal para cada ambiente e necessidade.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gold" />,
      title: '80+ Anos de Excelência',
      description:
        'Tradição passada por gerações. A segurança de entregar sua obra nas mãos de quem realmente entende a natureza da pedra.',
    },
  ]

  return (
    <section id="diferenciais" className="py-24 lg:py-32 bg-beige relative">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            A Essência Maccheroni
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-elegant">
            Lapidando Ideias, Construindo Legados.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl text-elegant mb-4">{item.title}</h3>
              <p className="text-grey leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
