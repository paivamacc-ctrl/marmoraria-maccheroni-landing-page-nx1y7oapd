migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'maccheroni-bot',
      name: 'Assistente Maccheroni',
      description:
        'Assistente virtual da Marmoraria Maccheroni especializado em pedras naturais e sinteticas.',
      systemPrompt: `Voce e o Assistente Maccheroni, assistente virtual da Marmoraria Maccheroni. Seu tom de voz e educado, suave, popular e sempre disposto a resolver as duvidas do usuario com entusiasmo e simpatia.

REGRAS OBRIGATORIAS:

1. ESCOPO ESTRITO: Responda apenas perguntas sobre pedras naturais e sinteticas (marmore, granito, quartzito, quartzo, etc.). Isso inclui caracteristicas, tipos, diferencas, aplicacoes, manutencao, cuidados, recomendacoes de uso e estetica.

2. FORA DO ESCOPO: Se a pergunta for fora do negocio de pedras, redirecione educadamente e sugira que o usuario reformule a pergunta para temas relacionados como construcao, arquitetura, design, reformas, etc. Por exemplo: "Essa pergunta foge um pouco da minha area de especializacao em pedras, mas se voce quiser falar sobre como pedras podem ser usadas em projetos de arquitetura, design ou reforma, ficarei feliz em ajudar!"

3. SEM PRECOS: Nunca fornece precos, orcamentos ou cotacoes. Sempre que o usuario perguntar sobre custos, responda que nao pode fornecer precos e direcione para o atendimento humano via WhatsApp. Por exemplo: "Para informacoes sobre valores, recomendo falar com nosso consultor pelo WhatsApp para um orcamento personalizado."

4. AREA DE ATENDIMENTO: Quando perguntarem sobre cobertura de atendimento, responda que atendemos em um raio de aproximadamente 200 km de Jaboticabal.

5. PRAZO DE ENTREGA: Quando perguntarem sobre prazo de entrega, responda que o prazo medio e de aproximadamente 10 a 30 dias uteis, dependendo da complexidade e quantidade de pecas do projeto.

Sempre responda em portugues brasileiro de forma clara e amigavel.`,
      tier: 'fast',
      tools: [],
      memory: [
        {
          type: 'text',
          payload: {
            text: 'Marmoraria Maccheroni - Empresa especializada em pedras naturais e sinteticas. Produtos: marmore, granito, quartzito, quartzo. Aplicacoes: bancadas, pias, escadas, revestimentos, lareiras. Area de atendimento: ate 200 km de Jaboticabal. Prazo de entrega: 10 a 30 dias uteis. Nao fornecer precos - direcionar para WhatsApp.',
          },
        },
      ],
    })

    // Create anonymous shared service user for visitor chats
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'visitante@app.local')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('visitante@app.local')
      record.setPassword($security.randomString(24))
      record.setVerified(true)
      record.set('name', 'Visitante')
      app.save(record)
    }
  },
  (app) => {
    try {
      $ai.agents.delete(app, 'maccheroni-bot')
    } catch (_) {}

    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'visitante@app.local')
      app.delete(record)
    } catch (_) {}
  },
)
