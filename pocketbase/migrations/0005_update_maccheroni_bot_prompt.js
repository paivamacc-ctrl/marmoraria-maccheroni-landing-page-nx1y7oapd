migrate(
  (app) => {
    $ai.agents.define(app, {
      slug: 'maccheroni-bot',
      name: 'Assistente Maccheroni',
      description:
        'Especialista em marmore e granito com 30 anos de experiencia, atuando em um ciclo continuo de valor: informar, avaliar, sugerir solucoes e melhorar continuamente.',
      systemPrompt: `Voce e o Assistente Maccheroni, especialista em pedras naturais e sinteticas com 30 anos de experiencia em marmoraria. Seu tom de voz e educado, tecnico, confiante e sempre disposto a resolver as duvidas do usuario com entusiasmo e simpatia. Voce opera em um CICLO CONTINUO DE VALOR:

1. INFORMAR: Explique caracteristicas tecnicas, diferencas entre materiais, aplicacoes, propriedades fisicas (dureza, porosidade, resistencia) e estetica de cada tipo de pedra.

2. AVALIAR: Entenda a necessidade do cliente e analise qual pedra melhor se adapta ao projeto dele, considerando ambiente, uso, orcamento (sem citar valores) e expectativa estetica.

3. SUGERIR: Indique opcoes e alternativas para qualquer duvida ou problema apresentado pelo cliente. Sempre ofereca mais de uma solucao quando possivel, explicando pros e contras de cada uma.

4. MELHORAR CONTINUAMENTE: Reconheca quando uma pergunta esta alem do seu conhecimento e direcione honestamente o cliente a um especialista humano. Nunca invente informacoes.

REGRAS OBRIGATORIAS:

1. ESCOPO: Responda sobre pedras naturais (marmore, granito, quartzito, pedras exoticas) e sinteticas (quartzo, superficies engineered). Inclui caracteristicas, tipos, diferencas, aplicacoes, manutencao, cuidados, recomendacoes de uso, estetica, medicoes, calculos de m2 e nocoes de desenho tecnico.

2. FORA DO ESCOPO: Se a pergunta for fora do negocio de pedras, redirecione educadamente. Exemplo: "Essa pergunta foge da minha area de especializacao em pedras, mas se voce quiser falar sobre como pedras podem ser usadas em projetos de arquitetura, design ou reforma, ficarei feliz em ajudar!"

3. SEM PRECOS: Nunca fornece precos, orcamentos ou cotacoes. Direcione para o WhatsApp: "Para informacoes sobre valores, recomendo falar com nosso consultor pelo WhatsApp para um orcamento personalizado."

4. AREA DE ATENDIMENTO: Atendemos em um raio de aproximadamente 200 km de Jaboticabal.

5. PRAZO DE ENTREGA: O prazo medio e de aproximadamente 10 a 30 dias uteis, dependendo da complexidade e quantidade de pecas do projeto.

6. RESPOSTAS CURTAS E CONCRETAS: Responda de forma direta e objetiva. Seja conciso, mas garanta que a resposta seja completa e util.

7. SEM ALUCINACAO: Se nao souber a resposta, admita explicitamente. Exemplo: "Nao tenho certeza sobre isso, prefiro nao arriscar uma resposta incorreta. Recomendo consultar nosso especialista pelo WhatsApp para uma informacao precisa."

8. FONTES CONFIANCEIS: Baseie suas respostas em conhecimento tecnico consagrado sobre marmore, granito, quartzito e quartzo. Priorize informacoes tecnicas verificaveis.

9. MEDICOES E CALCULOS DE m2: Quando solicitado, guie o cliente nas medicoes e calcule ou explique calculos de metros quadrados. Use as formulas de referencia: area retangular (largura x altura), area circular (pi x raio ao quadrado), area triangular (base x altura / 2), areas irregulares (decomposicao em formas simples). Explique conversoes de unidades quando necessario.

10. DESENHO TECNICO: Quando solicitado, explique nocoes de desenho tecnico aplicado a marmoraria: conceitos de prancha (board), escala (scale) e cotas (dimensions). Ajude o cliente a entender como as medidas sao representadas tecnicamente.

11. CAPTURA DE LEADS: Quando o cliente demonstrar interesse em um orcamento e fornecer dados de contato voluntariamente, registre um lead (nome, email, telefone, mensagem). Nunca invente dados de contato — registre apenas o que o cliente fornecer explicitamente.

Sempre responda em portugues brasileiro de forma clara, tecnica e amigavel.`,
      tier: 'fast',
      tools: [
        {
          collection: 'leads',
          perms: { create: true, read: true, list: true },
          actAs: 'admin',
        },
      ],
      memory: [
        {
          type: 'text',
          payload: {
            text: 'Marmoraria Maccheroni - Empresa especializada em pedras naturais e sinteticas com 30 anos de experiencia. Produtos: marmore, granito, quartzito, quartzo, pedras exoticas. Aplicacoes: bancadas, pias, escadas, revestimentos, lareiras, fachadas, pisos. Area de atendimento: ate 200 km de Jaboticabal. Prazo de entrega: 10 a 30 dias uteis. Nao fornecer precos - direcionar para WhatsApp.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'PEDRAS NATURAIS - CARACTERISTICAS TECNICAS:\n\nMARMORE: Rocha metamorfica. Dureza Mohs 3-4. Porosidade media-alta. Ideal para bancadas, revestimentos, lareiras. Pode manchar com acidos e vinagre. Necessita selagem periodica. Variedades: Carrara, Calacatta, Crema Marfil, Travertino. Estetica elegante e classica.\n\nGRANITO: Rocha ignea. Dureza Mohs 6-7. Baixa porosidade. Ideal para bancadas de cozinha, pisos, fachadas externas. Alta resistencia a riscos e calor. Variedades: Preto Sao Gabriel, Verde Ubatuba, Vermelho Brasilia, Branco Itaunas. Muito duravel.\n\nQUARTZITO: Rocha metamorfica. Dureza Mohs 7. Baixissima porosidade. Ideal para bancadas, areas externas, churrasqueiras. Resistente a altas temperaturas e manchas. Variedades: Dolomitas, Mont Blanc, Taj Mahal, White Macaubas. Estetica similar ao marmore com durabilidade do granito.\n\nPEDRAS EXOTICAS: Inclui onix, ardosia, basalto, calcario. Cada uma com propriedades especificas. Onix: translucido, decorativo. Ardosia: fina, para revestimento. Basalto: volcanico, alta resistencia. Calcario: poroso, para areas internas de baixo transito.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'PEDRAS SINTETICAS - CARACTERISTICAS TECNICAS:\n\nQUARTZO ENGINEERED: Composto de 90-95% quartz natural e 5-10% resinas e pigmentos. Dureza Mohs 7. Nao poroso - nao necessita selagem. Resistente a manchas e riscos. Nao resistente a altas temperaturas (pode amarelar). Ideal para bancadas de cozinha e banheiro. Marcas: Silestone, Caesarstone, Compac. Vantagens: uniformidade de cor, baixa manutencao, alta durabilidade. Limitacoes: nao recomendado para areas externas (resina pode descolorar com UV).\n\nSUPERFICIES ENGINEERED (Sinterizadas): Compostos por minerais prensados a altas temperaturas (ex: Neolith, Dekton). Resistente a calor, riscos, manchas e UV. Pode ser usado em areas externas. Mais caro que quartzo engineered. Indestrutivel em condicoes normais de uso.\n\nDIFERENCA PRINCIPAL NATURAL vs SINTETICA: Pedras naturais tem variacao de padrao (cada peca e unica) e podem necessitar selagem. Sinteticas tem padrao uniforme e nao necessitam selagem, mas podem ter limitacoes com calor extremo ou UV.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'MANUTENCAO E CONSERVACAO DE PEDRAS:\n\nSELAGEM: Pedras naturais porosas (marmore, granito, calcario) devem ser seladas a cada 6-12 meses. Use selante impregnante de qualidade. Teste de porosidade: pingue agua na superficie, se escurecer em 10-30 minutos, precisa de selagem.\n\nLIMPEZA DIARIA: Use agua morna e sabao neutro. Pano macio ou esponja. Evite produtos abrasivos. Para quartzo engineered, agua e sabao neutro sulficiente.\n\nPRODUTOS PROIBIDOS: Vinagre, limao, agentes acidos ou alcalinos fortes, produtos com amonia, alvejantes, esponjas de aco, produtos abrasivos em po. Acidos atacam marmore e calcario (causam etching - perda de polimento).\n\nPRODUTOS RECOMENDADOS: Detergente neutro de pH 7, produtos especificos para pedras naturais, selantes impregnantes, cera de carnauba para polimento ocasional.\n\nMANUTENCAO PREVENTIVA: Use protecao sob panelas quentes (mesmo em granito). Use bases de cortar (nao corte diretamente sobre a pedra). Limpe derramamentos imediatamente. Use feltro sob objetos pesados.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'PROBLEMAS COMUNS E SOLUCOES:\n\nMANCHAS: Identificar o tipo de mancha (oleo, organica, metalica, acida). Manchas de oleo: usar pasta de bicarbonato de sodio e agua, deixar 24h. Manchas organicas (cafe, vinho): peroxido de hidrogenio 12% com pasta de talco. Manchas metalicas (ferrugem): removedor de ferrugem especifico para pedras. Sempre testar em area discreta primeiro.\n\nRISCOS: Riscos superficiais em granito podem ser polidos com pasta de polimento. Em marmore, riscos podem ser removidos com polimento profissional. Quartzo engineered dificilmente risca (Mohs 7), mas se acontecer requer profissional.\n\nRACHADURAS: Rachaduras em pedras naturais podem ser reparadas com resina epoxi colorida para combinar com a pedra. Rachaduras estruturais requerem avaliacao profissional e possivel substituicao.\n\nPERDA DE BRILHO: Repolimento com discos diamantados de granulacao progressiva (50, 100, 200, 400, 800, 1500, 3000) e finalizacao com pasta de polimento. Para marmore, usar oxalato de aluminio. Recomendado contratar profissional.\n\nETCHING (MARMORE): Marcas opacas causadas por acidos. Polimento local com pasta de polimento para marmore pode resolver casos leves. Casos graves requerem repolimento profissional.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'CRITERIOS DE SELECAO POR AMBIENTE:\n\nCOZINHA (BANCADAS): Melhores opcoes: Granito (resistencia e durabilidade), Quartzo engineered (nao poroso, higienico), Quartzito (resistencia e estetica). Marmore nao recomendado para cozinha (mancha com acidos e etching). Considerar resistencia a calor, manchas e riscos.\n\nBANHEIRO (BANCADAS E REVESTIMENTOS): Marmore (estetica e baixo risco de acidos), Quartzo (higienico e nao poroso), Granito (duravel). Evitar pedras muito porosas. Importante: resistencia a umidade e produtos de higiene pessoal.\n\nEXTERIOR (FACHADAS, AREAS EXTERNAS): Granito (alta resistencia a UV e intemperie), Quartzito (resistente e estetico), Pedras sinterizadas (Dekton/Neolith). Evitar marmore em exteriores (desgaste com chuva acida e UV). Evitar quartzo engineered (resina descolora com UV).\n\nPISOS: Granito (alto transito), Marmore (transito medio, interno), Ardosia (rustico), Quartzo engineered (nao recomendado para piso em grandes areas). Considerar resistencia ao desgaste, coeficiente de atrito (antiderrapante).\n\nPAREDES E REVESTIMENTOS: Marmore (estetica), Travertino (rustico), Onix (decorativo com iluminacao). Considerar peso e sistema de fixacao adequado.\n\nLAREIRAS: Granito e quartzito (resistencia ao calor). Marmore pode ser usado no entorno mas nao em contato direto com fogo. Pedras sinterizadas sao ideais.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'TENDENCIAS E COMBINACOES ESTETICAS:\n\nTENDENCIAS ATUAIS: Superficies em tons neutros (brancos, cinzas, beges) com veios marcantes. Marmores tipo Calacatta e Carrara continuam em alta. Quartzitos exoticos (Taj Mahal, Mont Blanc) ganham espaco. Pedras com acabamento leather (couro) em bancadas. Combinacao de pedras com madeira e metal.\n\nCOMBINACOES: Cozinhas: bancada branca com ilha em pedra escura. Banheiros: marmore com veios suaves para elegancia. Exteriores: granito com textura natural. Mistas: usar a mesma pedra em bancada e splashback para visual continuo.\n\nACABAMENTOS: Polido (brilho classico), Fosco/Honned (matte contemporaneo), Leather/Couro (textura sutil, antiderrapante), Apicoado (textura pontilhada), Flameado (rustico, para exteriores). Cada acabamento muda a percepcao de cor e manutencao.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'MEDICOES E CALCULOS DE METROS QUADRADOS (m2):\n\nFORMULAS BASICAS:\n- AREA RETANGULAR: largura (m) x altura (m) = area em m2. Ex: 2,5m x 3,0m = 7,5 m2.\n- AREA QUADRADA: lado (m) x lado (m) = area em m2. Ex: 3m x 3m = 9 m2.\n- AREA CIRCULAR: pi (3,14159) x raio (m) x raio (m) = area em m2. Ex: raio 1,5m -> 3,14159 x 1,5 x 1,5 = 7,07 m2.\n- AREA TRIANGULAR: (base (m) x altura (m)) / 2 = area em m2. Ex: base 2m, altura 3m -> (2 x 3) / 2 = 3 m2.\n\nAREAS IRREGULARES: Decompor a area em formas simples (retangulos, triangulos, circulos), calcular cada uma separadamente e somar. Para areas muito irregulares, dividir em uma grade de quadrados pequenos e estimar a cobertura. Alternativa: usar a formula do poligono ( metodo de Gauss/shoelace) para vertices conhecidos.\n\nCONVERSOES DE UNIDADES:\n- 1 metro (m) = 100 centimetros (cm)\n- 1 m2 = 10.000 cm2\n- 1 m2 = 1.000.000 mm2\n- 1 pe tabuado (ft2) = 0,0929 m2 (aproximadamente)\n- 1 m2 = 10,764 ft2\n- 1 centimetro = 0,01 metro\n\nCALCULO PARA COMPRAS: Sempre adicionar 10-15% de quebra/perda ao total calculado. Ex: 7,5 m2 -> comprar 8,6 m2 a 9 m2 (com margem).\n\nMEDICAO DE BANCADAS: Medir comprimento x profundidade. Para ilhas, medir toda a area da superficie. Considerar recortes para pia e cooktop (geralmente nao descontados pois exigem mais trabalho de recorte). Para bordas (frontao), medir o comprimento da borda x largura do frontao.\n\nMEDICAO DE PISOS: Medir largura x comprimento de cada comodo. Descontar areas fixas (colunas, areas internas de armarios embutidos). Somar todas as areas. Adicionar 10% de quebra.',
          },
        },
        {
          type: 'text',
          payload: {
            text: 'NOCOES DE DESENHO TECNICO APLICADO A MARMORARIA:\n\nPRANCHA (BOARD): A prancha e a superficie de trabalho do desenho tecnico. Em marmoraria, representa o formato e dimensoes da peca a ser cortada. Tamanhos padrao de pranchas: A0 (841x1189mm), A1 (594x841mm), A2 (420x594mm), A3 (297x420mm). As pecas de pedra sao desenhadas em escala nestas pranchas para visualizar dimensoes e encaixes.\n\nESCALA (SCALE): A escala e a proporcao entre o desenho e o objeto real. Em marmoraria, escalas comuns: 1:1 (tamanho real, para pecas pequenas), 1:5 (1cm no desenho = 5cm real), 1:10 (1cm no desenho = 10cm real), 1:20 (para plantas de ambientes), 1:50 (para projetos completos). Exemplo: uma bancada de 3m desenhada em escala 1:10 ocupa 30cm na prancha.\n\nCOTAS (DIMENSIONS): Cotas sao as indicacoes de medida no desenho tecnico. Incluem: linha de cota (linha paralela a medida), linha de extensao (perpendicular, delimita a medida), setas ou tracinhos nas extremidades, e o valor numerico da medida. Em marmoraria, cotas indicam: largura, profundidade, espessura (geralmente 2cm ou 3cm), raios de curvatura, posicao de recortes (pia, cooktop, tomadas).\n\nCONVENCOES: Espessura padrao de bancadas: 2cm (economico) ou 3cm (premium). Frontao/borda: 2-4cm de altura tipicamente. Angulos: indicados em graus. Recortes: marcados com linhas tracejadas. Areas de reforco: indicadas com hachura.\n\nLEITURA DE PROJETO: Sempre verificar escala, cotas totais, cotas parciais, posicao de recortes, tipo de borda, acabamento e orientacao (veios). Confirmar se o desenho reflete exatamente o que o cliente deseja antes do corte.',
          },
        },
      ],
    })
  },
  (app) => {
    try {
      $ai.agents.define(app, {
        slug: 'maccheroni-bot',
        name: 'Assistente Maccheroni',
        description:
          'Assistente virtual da Marmoraria Maccheroni especializado em pedras naturais e sinteticas.',
        systemPrompt: `Voce e o Assistente Maccheroni, assistente virtual da Marmoraria Maccheroni. Seu tom de voz e educado, suave, popular e sempre disposto a resolver as duvidas do usuario com entusiasmo e simpatia.

REGRAS OBRIGATORIAS:

1. ESCOPO ESTRITO: Responda apenas perguntas sobre pedras naturais e sinteticas (marmore, granito, quartzito, quartzo, etc.). Isso inclui caracteristicas, tipos, diferencas, aplicacoes, manutencao, cuidados, recomendacoes de uso e estetica.

2. FORA DO ESCOPO: Se a pergunta for fora do negocio de pedras, redirecione educadamente e sugira que o usuario reformule a pergunta para temas relacionados como construcao, arquitetura, design, reformas, etc.

3. SEM PRECOS: Nunca fornece precos, orcamentos ou cotacoes. Direcione para o WhatsApp.

4. AREA DE ATENDIMENTO: Ate 200 km de Jaboticabal.

5. PRAZO DE ENTREGA: 10 a 30 dias uteis.

6. RESPOSTAS CURTAS E CONCRETAS: Seja direto e objetivo.

7. SEM ALUCINACAO: Admita quando nao sabe.

8. FONTES CONFIANCEIS: Baseie-se em referencias seguras sobre pedras naturais.

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
    } catch (_) {}
  },
)
