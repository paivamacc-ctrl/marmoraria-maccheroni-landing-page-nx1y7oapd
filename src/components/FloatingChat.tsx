import { useState, useEffect, useRef, useCallback } from 'react'
import { Bot, X, Send, Volume2, Square } from 'lucide-react'
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

const MESSAGE_FONT_SIZE = '1.05rem'
const HEADER_FONT_SIZE = '1.05rem'
const PLACEHOLDER_FONT_SIZE = '1.05rem'

function renderHighlightedText(text: string) {
  const parts = text.split(/(==[^=]+==)/g)
  return parts.map((part, i) => {
    if (part.startsWith('==') && part.endsWith('==') && part.length > 4) {
      const content = part.slice(2, -2)
      return (
        <mark
          key={i}
          className="bg-yellow-300 text-elegant px-1 rounded-sm font-semibold"
          style={{ backgroundColor: '#fffb00' }}
        >
          {content}
        </mark>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function selectPtBrFemaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null

  const ptBrVoices = voices.filter(
    (v) => v.lang.toLowerCase() === 'pt-br' || v.lang.toLowerCase() === 'pt_br',
  )
  if (ptBrVoices.length > 0) {
    const female = ptBrVoices.find((v) => /female|feminin|mulher|fem/i.test(v.name))
    if (female) return female
    return ptBrVoices[0]
  }

  const ptVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('pt'))
  if (ptVoices.length > 0) {
    const female = ptVoices.find((v) => /female|feminin|mulher|fem/i.test(v.name))
    if (female) return female
    return ptVoices[0]
  }

  const female = voices.find((v) => /female|feminin|mulher|fem/i.test(v.name))
  if (female) return female

  return voices[0]
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [readingMessageId, setReadingMessageId] = useState<number | null>(null)
  const [isReadingInput, setIsReadingInput] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

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

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const stopReading = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    currentUtteranceRef.current = null
    setReadingMessageId(null)
    setIsReadingInput(false)
  }, [])

  const toggleReadAloud = useCallback(
    (messageId: number, text: string) => {
      if (readingMessageId === messageId) {
        stopReading()
        return
      }

      if (typeof window === 'undefined' || !window.speechSynthesis) return

      window.speechSynthesis.cancel()

      const cleanText = text.replace(/==([^=]+)==/g, '$1')
      const utterance = new SpeechSynthesisUtterance(cleanText)
      const voices = window.speechSynthesis.getVoices()
      const selectedVoice = selectPtBrFemaleVoice(voices)
      if (selectedVoice) {
        utterance.voice = selectedVoice
        utterance.lang = selectedVoice.lang
      } else {
        utterance.lang = 'pt-BR'
      }
      utterance.rate = 1.15
      utterance.pitch = 1.0

      utterance.onend = () => {
        currentUtteranceRef.current = null
        setReadingMessageId(null)
      }
      utterance.onerror = () => {
        currentUtteranceRef.current = null
        setReadingMessageId(null)
      }

      currentUtteranceRef.current = utterance
      setReadingMessageId(messageId)
      window.speechSynthesis.speak(utterance)
    },
    [readingMessageId, stopReading],
  )

  const toggleReadInputAloud = useCallback(() => {
    const trimmed = inputValue.trim()
    if (!trimmed) return

    if (isReadingInput) {
      stopReading()
      return
    }

    if (typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(trimmed)
    const voices = window.speechSynthesis.getVoices()
    const selectedVoice = selectPtBrFemaleVoice(voices)
    if (selectedVoice) {
      utterance.voice = selectedVoice
      utterance.lang = selectedVoice.lang
    } else {
      utterance.lang = 'pt-BR'
    }
    utterance.rate = 1.15
    utterance.pitch = 1.0

    utterance.onend = () => {
      currentUtteranceRef.current = null
      setIsReadingInput(false)
    }
    utterance.onerror = () => {
      currentUtteranceRef.current = null
      setIsReadingInput(false)
    }

    currentUtteranceRef.current = utterance
    setIsReadingInput(true)
    window.speechSynthesis.speak(utterance)
  }, [inputValue, isReadingInput, stopReading])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return

      stopReading()

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
    [isTyping, conversationId, stopReading],
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
    stopReading()
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
                <h4 className="font-medium" style={{ fontSize: HEADER_FONT_SIZE }}>
                  Assistente Maccheroni
                </h4>
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
                    'max-w-[80%] p-3 rounded-lg whitespace-pre-wrap break-words leading-relaxed',
                    msg.sender === 'user'
                      ? 'bg-gold text-white rounded-tr-none'
                      : 'bg-white border border-border text-elegant rounded-tl-none',
                  )}
                  style={{ fontSize: MESSAGE_FONT_SIZE }}
                >
                  {msg.text ? (
                    msg.sender === 'bot' ? (
                      renderHighlightedText(msg.text)
                    ) : (
                      msg.text
                    )
                  ) : msg.sender === 'bot' && isTyping ? (
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 bg-grey rounded-full animate-bounce delay-200" />
                    </span>
                  ) : (
                    ''
                  )}
                  {msg.sender === 'bot' && msg.text && (
                    <button
                      onClick={() => toggleReadAloud(msg.id, msg.text)}
                      className="ml-2 inline-flex items-center justify-center align-middle p-1.5 rounded-md bg-gold/15 text-gold hover:bg-gold hover:text-white transition-colors shrink-0"
                      title={readingMessageId === msg.id ? 'Parar leitura' : 'Ouvir mensagem'}
                    >
                      {readingMessageId === msg.id ? (
                        <Square className="w-5 h-5 fill-current animate-pulse" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                  )}
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
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  disabled={isTyping}
                  className="flex-1 pr-10"
                  style={{ fontSize: PLACEHOLDER_FONT_SIZE }}
                />
                <button
                  type="button"
                  onClick={toggleReadInputAloud}
                  disabled={!inputValue.trim()}
                  className={cn(
                    'absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1.5 rounded-md transition-colors',
                    'disabled:opacity-30 disabled:cursor-not-allowed',
                    'bg-gold text-white hover:bg-gold/80',
                  )}
                  title={isReadingInput ? 'Parar leitura' : 'Ouvir pergunta'}
                >
                  {isReadingInput ? (
                    <Square className="w-4 h-4 fill-current animate-pulse" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
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
