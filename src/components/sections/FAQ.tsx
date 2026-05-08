import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LeadModal } from '../LeadModal'
import { Button } from '../ui/button'

export function FAQSection() {
  const faqs = [
    {
      q: 'Qual a diferença entre Mármore, Granito e Quartzo?',
      a: 'O Mármore é uma rocha calcária, mais porosa e elegante, ideal para áreas internas e banheiros. O Granito é altamente resistente e durável, perfeito para cozinhas e áreas externas. O Quartzo é uma superfície industrializada não porosa, oferecendo cores uniformes e alta resistência a manchas.',
    },
    {
      q: 'Vocês atendem a região?',
      a: 'Sim. Nossa logística nos permite atender obras em um raio de até 150km de nossa sede.',
    },
    {
      q: 'Qual o prazo médio de execução?',
      a: 'O prazo varia de acordo com a complexidade do projeto. Em média, após a medição final na obra (gabarito), solicitamos de 15 a 25 dias úteis para corte e acabamento.',
    },
    {
      q: 'Como funciona a manutenção das pedras?',
      a: 'Fornecemos um manual completo de cuidados na entrega. Em geral, recomendamos limpeza diária apenas com pano úmido e detergente neutro. Materiais naturais podem exigir impermeabilização periódica.',
    },
  ]

  return (
    <section id="faq" className="py-24 bg-beige">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-elegant mb-4">Dúvidas Frequentes</h2>
          <p className="text-grey">
            Esclareça os principais pontos sobre nossos materiais e processos.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full bg-white rounded-xl p-6 shadow-sm border border-border"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-medium text-elegant hover:text-gold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-grey leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center bg-white p-8 rounded-xl border border-border">
          <h3 className="font-serif text-xl text-elegant mb-2">Ainda tem dúvidas?</h3>
          <p className="text-grey text-sm mb-6">
            Nossa equipe de especialistas está pronta para analisar seu projeto.
          </p>
          <LeadModal>
            <Button className="bg-elegant text-white hover:bg-gold transition-colors">
              Solicitar Contato
            </Button>
          </LeadModal>
        </div>
      </div>
    </section>
  )
}
