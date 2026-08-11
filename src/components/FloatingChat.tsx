import { useState, useEffect, useRef, useCallback } from 'react'
import { Bot, X, Send } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Message = { id: number; text: string; sender: 'bot' | 'user' }

const SUGGESTIONS = [
  'Qual a diferença entre mármore e granito?',
  'Quanto custa uma pia em mármore?',
  'Como cuidar de bancadas de quartzo?',
  'Qual o prazo de entrega?',
]

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: 'Olá! Sou o Assistente Maccheroni. Como posso ajudar com seu projeto em pedras hoje?',
          sender: 'bot',
        },
      ])
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return

      const userMsgId = Date.now()
      setMessages((prev) => [...prev, { id: userMsgId, text: trimmed, sender: 'user' }])
      setInputValue('')
      setIsTyping(true)

      const botMsgId = userMsgId + 1
      setMessages((prev) => [...prev, { id: botMsgId, text: '', sender: 'bot' }])

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const { streamChat } = await import('@/services/chat')
        const result = await streamChat(trimmed, conversationId, {
          onChunk: (_delta, accumulated) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: accumulated } : m)),
            )
          },
          signal: controller.signal,
        })
        if (result.conversationId) {
          setConversationId(result.conversationId)
        }
      } catch (err) {
        const isAbort = err instanceof DOMException && err.name === 'AbortError'
        if (!isAbort) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? {
                    ...m,
                    text: 'Desculpe, tive um problema técnico. Tente novamente ou fale com nosso consultor pelo WhatsApp.',
                  }
                : m,
            ),
          )
        }
      } finally {
        setIsTyping(false)
        abortRef.current = null
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    },
    [isTyping, conversationId],
  )

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleClose = () => {
    setIsOpen(false)
    if (abortRef.current) {
      abortRef.current.abort()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-elegant p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Assistente Maccheroni</h4>
                <p className="text-xs text-white/70">Online agora</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto bg-beige/30 flex flex-col gap-3" ref={scrollRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex', msg.sender === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap break-words',
                    msg.sender === 'user'
                      ? 'bg-gold text-white rounded-tr-none'
                      : 'bg-white border border-border text-elegant rounded-tl-none',
                  )}
                >
                  {msg.text ||
                    (msg.sender === 'bot' && isTyping ? (
                      <span className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce delay-100" />
                        <span className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce delay-200" />
                      </span>
                    ) : (
                      ''
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-border flex flex-col gap-2">
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 mb-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua pergunta..."
                disabled={isTyping}
                className="flex-1"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  buttonVariants(),
                  'bg-elegant hover:bg-gold text-white transition-colors px-3',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <a
              href="https://wa.me/5516997707446?text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20um%20especialista."
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-full border-elegant text-elegant hover:bg-elegant hover:text-white transition-colors text-sm',
              )}
            >
              Falar com Humano <Send className="w-3.5 h-3.5 ml-2" />
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-elevation transition-transform duration-300 hover:scale-110',
          isOpen ? 'bg-grey text-white rotate-90' : 'bg-gold text-white',
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 -rotate-90 transition-transform" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}
