routerAdd('POST', '/backend/v1/ask-stream', (e) => {
  try {
    const body = e.requestInfo().body || {}
    const message = (body.message || '').trim()
    if (!message) return e.badRequestError('message is required')

    let userId = null
    try {
      const user = $app.findAuthRecordByEmail('_pb_users_auth_', 'visitante@app.local')
      userId = user.id
    } catch (err) {
      $app.logger().error('service user not found', 'error', String(err))
      return e.json(503, { error: 'Chat service unavailable' })
    }

    const conversationId = body.conversation_id || null

    const conv = $ai.agent('maccheroni-bot').getOrCreateConversation({
      user_id: userId,
      id: conversationId,
    })

    const iter = $ai.agent('maccheroni-bot').chat({
      user_id: userId,
      conversation_id: conv.id,
      message: message,
      stream: true,
    })

    e.response.header().set('Content-Type', 'text/event-stream')
    e.response.header().set('Cache-Control', 'no-cache')
    e.response.header().set('X-Conversation-Id', conv.id)
    $response.stream(e, iter)
  } catch (err) {
    if (err instanceof SkipAiConfigError) {
      return e.json(503, { error: 'AI temporarily unavailable' })
    }
    if (err instanceof SkipAiAgentsError) {
      const status = err.status || 500
      return e.json(status, { error: status >= 500 ? 'agent request failed' : err.message })
    }
    if (err instanceof SkipAiError) {
      const status = err.status || 502
      return e.json(status, { error: status >= 500 ? 'AI temporarily unavailable' : err.message })
    }
    $app.logger().error('ask-stream unexpected error', 'error', String(err))
    return e.json(500, { error: 'unexpected error' })
  }
})
