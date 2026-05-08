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
import { createLead } from '@/services/leads'
import { extractFieldErrors, type FieldErrors } from '@/lib/pocketbase/errors'
import { Loader2 } from 'lucide-react'

interface LeadModalProps {
  children: React.ReactNode
}

export function LeadModal({ children }: LeadModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)

    let formatted = v
    if (v.length > 2 && v.length <= 6) {
      formatted = `(${v.slice(0, 2)}) ${v.slice(2)}`
    } else if (v.length > 6 && v.length <= 10) {
      formatted = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`
    } else if (v.length > 10) {
      formatted = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
    }
    setPhone(formatted)
  }

  const getWhatsAppUrl = () => {
    const message = `Olá! Meu nome é ${name}, acabei de ver o site da Marmoraria Maccheroni e gostaria de falar com um especialista sobre um projeto.`
    return `https://wa.me/5516999999999?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      await createLead({ name, email, phone })
      setIsSubmitting(false)
      setIsSuccess(true)

      // Auto-redirect to WhatsApp after a brief delay to show the success message
      setTimeout(() => {
        window.open(getWhatsAppUrl(), '_blank')
        setIsOpen(false)
        resetForm()
      }, 2000)
    } catch (err) {
      setErrors(extractFieldErrors(err))
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setName('')
    setEmail('')
    setPhone('')
    setErrors({})
  }

  const handleWhatsApp = () => {
    window.open(getWhatsAppUrl(), '_blank')
    setIsOpen(false)
    resetForm()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          setTimeout(resetForm, 500)
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-beige border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-elegant">
            {isSuccess ? 'Solicitação Recebida!' : 'Fale com um Especialista'}
          </DialogTitle>
          <DialogDescription className="text-grey">
            {isSuccess
              ? 'Nossa equipe recebeu seus dados. Você será redirecionado para o WhatsApp em instantes...'
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white border-grey/20 focus-visible:ring-gold"
                placeholder="Ex: João Silva"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-elegant">
                E-mail Profissional
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-grey/20 focus-visible:ring-gold"
                placeholder="joao@arquitetura.com"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-elegant">
                WhatsApp
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required
                className="bg-white border-grey/20 focus-visible:ring-gold"
                placeholder="(16) 99999-9999"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <Button
              type="submit"
              className="w-full bg-elegant text-white hover:bg-gold transition-colors duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Solicitar Consultoria'
              )}
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
