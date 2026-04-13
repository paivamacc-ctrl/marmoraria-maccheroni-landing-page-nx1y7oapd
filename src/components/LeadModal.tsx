import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LeadModalProps {
  children: React.ReactNode
}

export function LeadModal({ children }: LeadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista.',
      '_blank',
    )
    setIsOpen(false)
    setTimeout(() => setIsSuccess(false), 500)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) setTimeout(() => setIsSuccess(false), 500)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-beige border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-elegant">
            {isSuccess ? 'Solicitação Recebida' : 'Fale com um Especialista'}
          </DialogTitle>
          <DialogDescription className="text-grey">
            {isSuccess
              ? 'Nossa equipe de consultores recebeu seus dados. Para um atendimento imediato, clique no botão abaixo.'
              : 'Preencha seus dados para receber uma consultoria personalizada para o seu projeto.'}
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-elegant">
                Nome Completo
              </Label>
              <Input
                id="name"
                required
                className="bg-white border-grey/20 focus-visible:ring-gold"
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-elegant">
                E-mail Profissional
              </Label>
              <Input
                id="email"
                type="email"
                required
                className="bg-white border-grey/20 focus-visible:ring-gold"
                placeholder="joao@arquitetura.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-elegant">
                WhatsApp
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                className="bg-white border-grey/20 focus-visible:ring-gold"
                placeholder="(11) 99999-9999"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-elegant text-white hover:bg-gold transition-colors duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Consultoria'}
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              Abrir WhatsApp Agora
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
