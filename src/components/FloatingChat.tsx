import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Message = { id: number; text: string; sender: 'bot' | 'user' }

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages([
          { id: 1, text: 'Olá! Sou o assistente virtual da Maccheroni.', sender: 'bot' },
        ])
        setIsTyping(false)

        setTimeout(() => {
          setIsTyping(true)
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: 2,
                text: 'Como posso ajudar com seu projeto de alto padrão hoje?',
                sender: 'bot',
              },
            ])
            setIsTyping(false)
          }, 1000)
        }, 800)
      }, 1000)
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleOptionClick = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'user' }])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: 'Excelente escolha. Para detalhes específicos, recomendo falar com nosso consultor.',
          sender: 'bot',
        },
      ])
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-elegant p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-serif text-sm">
                M
              </div>
              <div>
                <h4 className="font-medium text-sm">Assistente Maccheroni</h4>
                <p className="text-xs text-white/70">Online agora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto bg-beige/30 flex flex-col gap-3" ref={scrollRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-gold text-white rounded-tr-none'
                      : 'bg-white border border-border text-elegant rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border p-3 rounded-lg rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-border flex flex-col gap-2">
            {messages.length >= 2 &&
              messages[messages.length - 1].sender === 'bot' &&
              !isTyping && (
                <div className="flex flex-wrap gap-2 mb-2">
                  <button
                    onClick={() => handleOptionClick('Ver tipos de mármore')}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
                  >
                    Ver tipos de mármore
                  </button>
                  <button
                    onClick={() => handleOptionClick('Dúvida sobre manutenção')}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
                  >
                    Dúvida sobre manutenção
                  </button>
                </div>
              )}
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20um%20especialista."
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                'w-full bg-elegant hover:bg-gold text-white transition-colors',
              )}
            >
              Falar com Humano <Send className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-elevation transition-transform duration-300 hover:scale-110 ${
          isOpen ? 'bg-grey text-white rotate-90' : 'bg-gold text-white'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 -rotate-90 transition-transform" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}
