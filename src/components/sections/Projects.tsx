import { LeadModal } from '../LeadModal'
import { Button } from '../ui/button'

const projects = [
  {
    id: 1,
    title: 'Cozinha Moderna',
    material: 'Quartzo Branco / Preto Absoluto',
    img: 'https://img.usecurling.com/p/600/800?q=white%20quartz%20kitchen',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    title: 'Banheiro Luxo',
    material: 'Mármore Calacata',
    img: 'https://img.usecurling.com/p/600/400?q=luxury%20marble%20bathroom',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    title: 'Fachada Corporativa',
    material: 'Granito Verde Ubatuba',
    img: 'https://img.usecurling.com/p/600/400?q=corporate%20granite%20facade',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    title: 'Bancada Gourmet',
    material: 'Quartzo Cinza',
    img: 'https://img.usecurling.com/p/600/400?q=grey%20quartz%20countertop',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 5,
    title: 'Parede de Destaque',
    material: 'Mármore Carrara',
    img: 'https://img.usecurling.com/p/600/800?q=carrara%20marble%20wall',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 6,
    title: 'Piso Premium',
    material: 'Preto Absoluto Polido',
    img: 'https://img.usecurling.com/p/600/400?q=black%20polished%20floor',
    span: 'md:col-span-2 md:row-span-1',
  },
]

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-24 lg:py-32 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              Portfólio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-elegant">Projetos Executados</h2>
          </div>
          <LeadModal>
            <Button
              variant="outline"
              className="border-elegant text-elegant hover:bg-elegant hover:text-white"
            >
              Iniciar Meu Projeto
            </Button>
          </LeadModal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative group overflow-hidden bg-beige rounded-lg ${project.span}`}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <h3 className="text-white font-serif text-xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.title}
                </h3>
                <p className="text-gold text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.material}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
