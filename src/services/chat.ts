import pb from '@/lib/pocketbase/client'

export interface StreamChatHandlers {
  onChunk?: (deltaText: string, accumulatedText: string) => void
  onCitations?: (items: unknown[]) => void
  onError?: (message: string) => void
  signal?: AbortSignal
}

export interface StreamChatResult {
  content: string
  conversationId: string
  messageId: string
}

export async function streamChat(
  message: string,
  conversationId: string | null,
  handlers: StreamChatHandlers = {},
): Promise<StreamChatResult> {
  const res = await fetch(`${import.meta.env.VITE_POCKETBASE_URL}/backend/v1/ask-stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, conversation_id: conversationId }),
    signal: handlers.signal,
  })

  const { streamAgentChat, type AgentCitation } = await import('@/lib/skipAi')

  const result = await streamAgentChat(res, {
    onChunk: handlers.onChunk,
    onCitations: handlers.onCitations as (items: AgentCitation[]) => void,
    onError: handlers.onError,
    signal: handlers.signal,
  })

  return {
    content: result.content,
    conversationId: res.headers.get('X-Conversation-Id') ?? result.conversation_id,
    messageId: result.message_id,
  }
}
