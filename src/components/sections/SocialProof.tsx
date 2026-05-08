export function SocialProofSection() {
  const stats = [
    { value: '1000+', label: 'Projetos Entregues' },
    { value: '30+', label: 'Escritórios Parceiros' },
    { value: '80+', label: 'Anos de História' },
    { value: '150km', label: 'Raio de Atendimento' },
  ]

  const logos = [
    'Bild',
    'Hurben',
    'Construtora Stéfani Nogueira',
    'Sig Bergamin',
    'Triplex Arquitetura',
  ]

  return (
    <section className="bg-grey py-24 overflow-hidden text-white relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://img.usecurling.com/p/1000/500?q=marble%20texture&color=gray')] bg-cover mix-blend-overlay" />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-light tracking-wide opacity-80 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden border-t border-white/10 pt-12 z-10">
        <div className="flex w-[200%] animate-marquee">
          <div className="flex w-1/2 justify-around items-center px-4">
            {logos.map((logo, i) => (
              <span
                key={i}
                className="font-serif text-xl md:text-2xl opacity-50 whitespace-nowrap mx-8"
              >
                {logo}
              </span>
            ))}
          </div>
          <div className="flex w-1/2 justify-around items-center px-4">
            {logos.map((logo, i) => (
              <span
                key={`copy-${i}`}
                className="font-serif text-xl md:text-2xl opacity-50 whitespace-nowrap mx-8"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
