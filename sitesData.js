//     {
//         name: '',
//         url: '',
//         description: '',
//         isNew:true,
//         tags: ['EM INGLÊS', 'REQUER CONTA'] (se precisar)
//  },

const sitesData = {
    destaques: [
        {
            name: 'Floor 796',
            url: 'https://floor796.com/',
            description: '<p>Floor 796 é um projeto feito por uma única pessoa que mostra um “andar” animado e interativo, cheio de personagens e referências da cultura pop.</p> Tem coisa de anime, games, filmes, séries e memes espalhados por todo lado. A ideia é explorar sem pressa, ir clicando, reconhecendo referências e encontrando vários easter eggs escondidos. É o tipo de site para curar o tédio.',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Zoomquilt',
            url: 'https://zoomquilt.org/',
            description: '<p>zoomquilt.org é um projeto de arte digital interativa que exibe uma imagem que parece ter um zoom infinito em um cenário surreal, você fica entrando cada vez mais fundo em ilustrações conectadas sem parar. É hipnótico de olhar e ótimo pra ficar viajando na arte, o projeto possui uma sequência que pode ser acessada por esse site.</p> <p>(É graças a esse site que eu criei o interesse em descobrir e pesquisar por sites interessantes e desconhecidos na internet, basicamente é graças a ele que esse site aqui existe)</p>',
        },
        {
            name: 'Adrift',
            url: 'https://adrift.site/',
            description: '<p>Esse é um site com uma proposta na minha opnião muito interessante, servir como um espaço virtual para você &quot;soltar&quot; pensamentos e dúvidas anônimas em forma de pequenos barquinhos de papel que navegam pela página, visitantes podem ver e clicar nesses barquinhos para ler mensagens anônimas deixadas por outras pessoas.</p>',
            tags: ['EM INGLÊS, use google tradutor na página'],
        }
    ],

    cursos: [
        {
            name: 'Moodle IFRS',
            url: 'https://moodle.ifrs.edu.br/',
            description: 'O Moodle do IFRS é um lugar cheio de cursos gratuitos e práticos, com foco em aprender algo novo mesmo devendo experiência prévia, a maioria é básica ou intermediária, dá certificado e pode ser feita no seu ritmo.',
        },
        {
            name: 'Class Central',
            url: 'https://www.classcentral.com/',
            description: '<p>Class Central funciona com um agregador e motor de busca de cusos online, contendo materiais voltados a educação à distância de diversas plataformas e universidades do mundo todo.</p>',
            tags: ['EM INGLÊS'],
        },
    ],

    aprendizado_programacao: [
        {
            name: 'Coddy Tech',
            url: 'https://coddy.tech/',
            description: '<p>Coddy.tech é uma plataforma online para aprender programação de maneira prática e gamificada, tipo aulas interativas, desafios curtos pra você pegar o jeito de várias linguagens (Python, JavaScript, C++, HTML, etc.) sem teoria chata.</p> O conteúdo é bom pra quem está <strong>começando</strong> ou quer praticar, tem coisa gratuita mas algumas partes são pagas, e a experiência lembra apps tipo Duolingo de código.',
        },
        {
            name: 'Exercism',
            url: 'https://exercism.org/',
            description: '<p>Exercism é uma plataforma gratuita da prática de programação com centenas de exercícios em dezenas de linguagens e feedback de mentores reais.</p>',
            tags: ['REQUER CONTA'],
        },
        {
            name: 'GeeksforGeeks',
            url: 'https://www.geeksforgeeks.org/',
            description: '<p>GeeksforGeeks. O site reúne milhares de artigos, tutoriais, exemplos de código e explicações sobre algoritmos, estruturas de dados, desenvolvimento web, inteligência artificial, bancos de dados e muito mais.</p><p>Além do conteúdo educativo, também possui exercícios, desafios de programação e materiais voltados para entrevistas técnicas. É um daqueles sites que praticamente todo programador acaba usando em algum momento da carreira.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
        {
            name: 'FreeCodeCamp',
            url: 'https://www.freecodecamp.org/',
            description: 'FreeCodeCamp é uma organização sem fins lucrativos e plataforma educativa voltada a quem quer aprender programação e desenvolvimento de software gratuitamente. Desde fundamentos de HTML, CSS e JS até temas mais avançados como back-end, APIs e ciência de dados, tudo de forma auto-guiada e sem custo.',
        },
        {
            name: 'RoadMap.sh',
            url: 'https://roadmap.sh/',
            description: '<p>Roadmap.sh é uma plataforma de aprendizado e orientação para desenvolvedores e pessoas na área de tecnologia, organizada em roadmaps estruturados em habilidades e tópicos que você pode seguir para aprender alguma tecnologia ou carreira específica, com links e recursos para cada etapa.</p> ',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Flexbox Froggy',
            url: 'https://flexboxfroggy.com/',
            description: '<p>Flexbox Froggy é um jogo educativo que ensina CSS Flexbox de forma prática e interativa. Você controla sapos em vitórias-régias e precisa usar propriedades de Flexbox para posicioná-los corretamente em cada fase.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
    ],

    gaming: [
        {
            name: 'itch.io',
            url: 'https://itch.io/',
            description: '<p>Uma plataforma de jogos indie onde criadores publicam seus próprios jogos.</p> Tem jogos gratuitos, pagos, projetos malucos que você não encontra em grandes plataformas.',
        },
        {
            name: 'Gamejolt',
            url: 'https://gamejolt.com/',
            description: '<p>gamejolt é uma plataforma/game hub indie onde você pode achar, jogar e baixar jogos feitos por desenvolvedores do mundo todo. Tem de jogos clássicos a projetos experimentais e um ambiente bem vivo pra quem ama jogos “fora do mainstream”.</p> <p>A ideia é parecida com o itch.io.</p>',
        },
        {
            name: 'Map Genie',
            url: 'https://mapgenie.io/',
            description: '<p>mapgenie.io é um site com mapas interativos e guias de jogos populares. Em vez de mapas estáticos, você vê mapas clicáveis com itens, quests, colecionáveis e rotas marcadas, bom para quem quer platinar aquele jogo que tem colecionáveis</p>',
            tags: ['EM INGLÊS'],
        },
    ],

    programacao_ferramentas: [
        {
            name: 'Reactbits',
            url: 'https://reactbits.dev/',
            description: '<p>Reactbits.dev é um repositório de componentes e ferramentas úteis pra React. Basicamente é mais um acervo organizado que pode lhe conceder boas ideias</p> <p>Caso você goste de programação e de React principalmente, vale a pena dar uma olhada</p>',
        },
        {
            name: 'Cursify',
            url: 'https://cursify.vercel.app/',
            description: '<p>Esse é um site que serve como biblioteca de animações de cursor open-source pra desenvolvedores Web.</p> Ele reúne vários efeitos de cursor que você pode copiar e colar em projetos feitos com React e Next.js usando Tailwind CSS e Framer Motion. ',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Devicon.dev',
            url: 'https://devicon.dev/',
            description: 'Devicon é uma biblioteca de ícones de tecnologia com logos de linguagens, frameworks, ferramentas e plataformas prontos para usar em sites ou projetos dev sem esforço :)',
        },
        {
            name: 'Ray.so',
            url: 'https://ray.so/',
            description: '<p>Ray.so é uma ferramenta direta para transformar trechos de código em imagens bem apresentadas, pensada especialmente para desenvolvedores que querem mostrar ou compartilhar código com estilo em blogs, redes sociais, portfólios ou documentação.</p><br> <p>No <strong>canto superior esquerdo</strong> existe um botão (Code Images), ao clicar nele você encontra outras ferramentas úteis</p>',
        },
        {
            name: 'CSS Grid Generator',
            url: 'https://cssgridgenerator.io/',
            description: 'Nesse site você vai encontrar uma ferramenta prática para criar layouts com CSS grid sem ter que escrever todo o código manualmente. Ela fornece uma interface onde você define a estrutura e recebe o CSS pronto para copiar e colar no seu projeto.',
        },
        {
            name: 'SVG Logos',
            url: 'https://svglogos.dev/',
            description: '<p>SVG Logos é uma biblioteca online que reúne milhares de logos de tecnologias, linguagens de programação, frameworks, empresas e ferramentas em formato SVG. Os arquivos podem ser baixados e utilizados facilmente em sites, documentações, portfólios e projetos pessoais.</p><p>O acervo é bem organizado e conta com um sistema de busca rápido, facilitando encontrar logos de tecnologias específicas sem precisar procurar em diversos lugares diferentes. É um recurso bastante útil para desenvolvedores, designers e pessoas que montam interfaces ou páginas relacionadas à tecnologia.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
    ],

    informativo: [
        {
            name: 'Histography',
            url: 'https://histography.io/',
            description: '<p>Histography é um projeto visual interativo que exibe toda a história da humanidade numa linha do tempo navegável, desde o Big Bang até os dias atuais. Os eventos são retirados da Wikipedia e apresentados como pontos no tempo, você pode filtrar por períodos, categorias (guerras, invenções, arte, ciência etc.) e explorar livremente.</p><p>É o tipo de site que você abre para dar uma olhada rápida e acaba ficando muito mais tempo do que planejou.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Future Timeline',
            url: 'https://www.futuretimeline.net/',
            description: '<p>Future Timeline é um projeto que tenta imaginar como será o futuro da humanidade com base em tendências tecnológicas, científicas, econômicas e sociais. O site organiza previsões em uma linha do tempo que vai desde os próximos anos até milhares e até milhões de anos no futuro.</p><p>Você encontra projeções sobre inteligência artificial, exploração espacial, medicina, mudanças climáticas, robótica, transumanismo e diversos outros temas. Mesmo quando as previsões são especulativas, o site é interessante para explorar cenários possíveis e descobrir ideias sobre como nosso mundo pode evoluir nas próximas décadas.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Wolframalpha',
            url: 'https://www.wolframalpha.com/',
            description: '<p>É uma ferramenta que responde diretamente a perguntas matemáticas, científicas e factuais, as respostas geralmente vêm com gráficos, tabelas, e resultados mais detalhados. </p><p>Funciona bem para ajudar com cálculos, análise de dados, física, química etc. Útil para estudar</p>',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Animagraffs',
            url: 'https://animagraffs.com/',
            description: '<p>Um site que transforma conceitos mais complexos em animações simples e visuais, o site oferece uma coletânea de videos animados para mostrar como algumas coisas funcionam.</p> Tem explicações animadas de ciência, tecnologia, economia, natureza e fenômenos do dia a dia. ',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Archive.org',
            url: 'https://archive.org/',
            description: 'Archive.org é uma biblioteca digital sem fins lucrativos, aqui rola uma preservação de versões arquivadas de páginas da web, áudios, livros, vídeos, softwares e muitas outras coisas para acesso público. É um dos maiores repositórios históricos de conteúdo digital já criados.',
        },
        {
            name: 'The Scale of the Universe 2',
            url: 'https://htwins.net/scale2/',
            description: '<p>The Scale of the Universe 2 é uma experiência interativa que permite navegar pela escala do universo usando uma barra de zoom. Você pode sair do tamanho de um ser humano até alcançar galáxias, aglomerados cósmicos e o universo observável, ou seguir na direção oposta até chegar em células, moléculas, átomos, partículas subatômicas e a escala de Planck.</p><p>Além de mostrar o tamanho relativo das coisas, o site fornece pequenas explicações sobre cada objeto encontrado no caminho. É um daqueles projetos simples que conseguem transmitir uma noção de escala que seria difícil entender apenas lendo números.</p>',
            isNew: true,
        },
    ],
    faca_voce_mesmo: [
        {
            name: 'Blueprint',
            url: 'https://www.blueprint.am/',
            description: '<p>Plataforma de IA voltada para projetos eletrônicos e hardware. Basta descrever uma ideia em texto para receber diagramas, lista de componentes, instruções de montagem e outros recursos que ajudam a tirar um projeto do papel mais rapidamente.</p><p>É especialmente interessante para makers, estudantes, entusiastas de Arduino e ESP32 e pessoas que querem prototipar dispositivos sem começar tudo do zero. <strong>Possui recursos gratuitos, mas algumas funcionalidades e limites de uso dependem de conta e planos pagos.</strong></p>',
            isNew: true,
            tags: ['EM INGLÊS', 'REQUER CONTA PARA DETERMINADO USO', 'REQUER ASSINATURA PARA DETERMINADO USO']
        },
        {
            name: 'Instructables',
            url: 'https://www.instructables.com/',
            description: '<p>Instructables é uma das maiores comunidades de projetos DIY (Faça Você Mesmo) da internet. O site reúne milhares de tutoriais passo a passo criados por usuários ensinando como construir, modificar, consertar ou criar praticamente qualquer coisa.</p><p>Você encontra projetos de eletrônica, Arduino, robótica, impressão 3D, marcenaria, decoração, culinária, programação e muito mais. É um ótimo lugar para encontrar inspiração, aprender habilidades novas e descobrir projetos para colocar a mão na massa.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Ifixit',
            url: 'https://pt.ifixit.com/',
            description: 'Ifixit é um site dedicado a conserto e reparo com um certo foco em eletrônicos e gadgets. O principal é ensinar e apoiar as pessoas a reparar seus próprios dispositivos e equipamentos em vez de descartá-los.',
        },
    ],
    mockup: [
        {
            name: 'GraphicsFamily',
            url: 'https://graphicsfamily.com/',
            description: '<p>Esse site reúne recursos gráficos gratuitos e pagos para designers e criadores de conteúdo.</p> Ícones, ilustrações, mockups, templates e elementos visuais que você pode usar em projetos, apresentações, sites e posts ',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Pixeden',
            url: 'https://www.pixeden.com/',
            description: 'Um site com mais alguns recursos visuais, mockups, ícones texturas e mais. Seja para web, apresentações ou arte gráfica, tem opções gratuitas e premium ',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Envato',
            url: 'https://elements.envato.com/',
            description: '<p>Envato é um catálogo enorme de recursos, cheio de templates, gráficos, fotos, vídeos, fontes, efeitos de som e mais, bom para design de video, web ou qualquer outro projeto, <strong> mas requer assinatura</strong> ',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Pacdora',
            url: 'https://www.pacdora.com/',
            description: 'Mais um site com mockups, deve ser necessario ter uma conta para baixar os modelos, mas não tenho certeza, fiquei com preguiça de ver...',
        },
    ],

    ciencias: [
        {
            name: 'Smart Servier Medical',
            url: 'https://smart.servier.com/',
            description: 'Esse é um banco online de ilustrações médicas, possui ilustrações de anatomia, patologias, biomoléculas e processos biológicos com imagens claras e fáceis de usar, sendo possível baixar essas imagens.',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Biodigital',
            url: 'https://human.biodigital.com',
            description: '<p>human.biodigital.com é um explorador 3D do corpo humano onde você pode ver ossos, músculos, órgãos, doenças e tratamentos em modelos interativos. Dá pra girar, ampliar, esconder partes e entender como tudo se conecta — bem útil pra quem curte anatomia ou quer visualizar o corpo de um jeito claro.</p>',
            tags: ['EM INGLÊS', 'REQUER CONTA'],
        },
        {
            name: 'AtomAnimation',
            url: 'https://atomanimation.com/',
            description: '<p>Atom Animation é um projeto online que exibe animações interativas de estruturas atômicas e fornece uma tabela periódica diretamente no navegador. Na página principal você vê um modelo de átomo tendo a possibilidade de ajustar Prótons, elétrons e nêutrons.</p>',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Explore',
            url: 'https://explore.org/livecams',
            description: '<p>Explore.org - Live Cams é um canal de transmissão ao vivo de câmeras instaladas em ambientes naturais e habitats de animais ao redor do mundo. Faz parte de uma plataforma com foco em natureza, vida selvagem e educação ambiental.</p>',
            tags: ['EM INGLÊS'],
        },
    ],

    design: [
        {
            name: 'Designspiration',
            url: 'https://www.designspiration.com/',
            description: 'Um lugar bom para encontrar referências criativas onde você pode navegar por imagens, ilustrações, tipografia, arte e layout.',
        },
        {
            name: 'River Max Bittker',
            url: 'https://river.maxbittker.com/',
            description: '<p>Esse site é um projeto web experimental, funciona como uma interface de exploração visual. A ideia por trás é permitir que você navegue rapidamente por conjuntos de imagens conectadas por similaridade usando machine learning para encontrar padrões.</p> <p>Creio que esse site ajuda para encontrar inspirações para quem curte design.</p>',
        },
        {
            name: 'Sweezy Cursors',
            url: 'https://sweezy-cursors.com/',
            description: 'Esse site possui uma lista enorme de cursores prontos para baixar no PC. Tem vários estilos, fácil de usar — um recurso bacana para personalizar a estética do seu ambiente de trabalho.',
        },
        {
            name: 'Brik',
            url: 'https://brik.space/',
            description: '<p>Ferramenta de IA para criar motion graphics, efeitos visuais, experiências interativas e elementos 3D a partir de prompts em linguagem natural. Em vez de gerar apenas uma imagem ou animação, a plataforma cria ferramentas reutilizáveis que podem ser ajustadas e remixadas conforme necessário.</p><p>É uma opção interessante para designers, criadores de conteúdo e profissionais de branding que querem produzir assets visuais sem programar. <strong>Permite exportar imagens, vídeos e elementos interativos, com recursos gratuitos e funcionalidades avançadas disponíveis mediante conta e planos pagos.</strong></p>',
            isNew: true,
            tags: ['EM INGLÊS', 'REQUER CONTA', 'REQUER ASSINATURA PARA DETERMINADO USO']
        },
    ],
    inteligencia_artificial: [
        {
            name: 'PromptHero',
            url: 'https://prompthero.com/',
            description: 'É uma plataforma focada em prompt engineering, ou seja, um repositório e motor de busca de prompts usados para gerar conteúdo com modelos de IA como Stable Diffusion, Midjourney e ChatGPT.',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Vectorizer.AI',
            url: 'https://pt.vectorizer.ai/',
            description: 'Ferramenta online que usa IA para transformar imagens rasterizadas (PNG, JPG) em vetores limpos e escaláveis automaticamente. <br><strong>Requer Assinatura</strong>',
        },
    ],
    gastronomia: [
        {
            name: 'TasteAtlas',
            url: 'https://www.tasteatlas.com/map?ref=main-menu',
            description: '<p>Esse site funciona como um mapa mundial de comidas e pratos tradicionais. Ele mostra pratos típicos, ingredientes e receitas de vários países, além do mapa, o site também fornece receitas entre outras coisas.</p> ',
            tags: ['EM INGLÊS'],
        },
    ],
    utilitarios_ferramentas: [
        {
            name: 'SEO Studio',
            url: 'https://seostudio.tools/pt',
            description: 'SEO Studio é uma plataforma online gratuita que reúne várias ferramentas digitais voltadas para ajudar quem cria conteúdo, administra sites ou quer mais praticidade com certas tarefas na internet. Em vez de ser um único serviço, ele funciona como um hub de utilitários fáceis de acessar direto no navegador, com foco em SEO, análise de sites, manipulação de texto e até tarefas de Youtube e programação',
        },
        {
            name: 'DelphiTools',
            url: 'https://tools.rmv.fyi/',
            description: '<p>DelphiTools é uma coleção de ferramentas online que funciona diretamente no navegador, sem exigir cadastro, login ou coleta de dados. O site reúne dezenas de utilitários para trabalhar com imagens, texto, cores, tipografia, arquivos, desenvolvimento e muito mais.</p><p>Entre os recursos disponíveis estão geradores de QR Code, removedor de fundo, conversores de imagem, editores de texto, calculadoras, ferramentas para SVG e diversos outros utilitários. É o tipo de site que vale a pena guardar nos favoritos porque sempre acaba sendo útil em algum momento.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Scanmalware',
            url: 'https://scanmalware.com/',
            description: '<p>Scanmalware é um serviço online que se apresenta como uma ferramenta gratuita para verificar URLs e sites em busca de malware ou outras possíveis ameaças de segurança</p> <p>Por opnião própria, o serviço é legal e já te bota uma noção sobre aquele link suspeito, mesmo assim, não fique 100% na onda desses sites</p>',
        },
        {
            name: 'Behind the Email',
            url: 'https://behindtheemail.com/',
            description: '<p>Ferramenta de OSINT que permite pesquisar um endereço de e-mail para encontrar informações públicas associadas, como histórico profissional, formação, perfis online e outros sinais de presença digital. Pode ser útil para pesquisa de leads, verificação de identidade e análise de contatos.</p><p>O foco está em reunir dados públicos de diferentes fontes em um único lugar, economizando tempo durante investigações e pesquisas. <strong>O serviço exige conta e trabalha com planos de assinatura para liberar o acesso completo aos resultados.</strong></p>',
            isNew: true,
            tags: ['EM INGLÊS', 'REQUER CONTA PARA DETERMINADO USO', 'REQUER ASSINATURA PARA DETERMINADO USO']
        },
        {
            name: 'Commontools',
            url: 'https://www.commontools.org/',
            description: '<p>Coleção com mais de 100 ferramentas online gratuitas para tarefas do dia a dia. Reúne utilitários para edição de texto, programação, conversão de arquivos, geração de gráficos, OCR, limpeza de dados, formatação de código e diversas outras funções em um só lugar.</p><p>É especialmente útil para estudantes, desenvolvedores, criadores de conteúdo e profissionais que precisam resolver pequenas tarefas rapidamente sem instalar programas. <strong>A maior parte das ferramentas pode ser usada diretamente no navegador, sem necessidade de cadastro.</strong></p>',
            isNew: true,
            tags: ['EM INGLÊS']
        },
    ],
    games_navegador: [
        {
            name: 'Quizzity',
            url: 'https://david-peter.de/quizzity/',
            description: '<p>Quizzity é um jogo de geografia onde você vê o nome de uma cidade e precisa clicar no mapa onde acha que ela está. Quanto mais próximo do local real, mais pontos você ganha, bom pra testar e treinar seu conhecimento de lugares do mundo.</p>',
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Lostgamer.io',
            url: 'https://lostgamer.io/',
            description: 'Lostgamer é um game online semelhante ao GeoGuessr porém tratando de mapas de videogames. Você cai num ponto aleatório de um mapa de jogo (como Elden Ring, GTA, Fortnite, Genshin Impact etc.) e tem que adivinhar onde está usando o visual ao redor, no momento em que estou documentando sobre, o jogo tem modo solo somente, com o modo  multiplayer em desenvolvimento.',
        },
        {
            name: 'Flagle.io',
            url: 'https://www.flagle.io/',
            description: 'Um jogo que te desafia diariamente para adivinhar a bandeira de um país, ao terminar você tem rodadas bônus, sendo, acertar a quantidade da população, moeda, território etc. um jogo interessante para quem curte geografia.',
        },
        {
            name: 'Flagle Game',
            url: 'https://flagle-game.com/',
            description: 'A ideia nesse aqui também é acertar bandeiras, a maneira que você faz isso é um pouco diferente, ainda sim divertida, tem um modo diário mas também possui um modo infinito',
        },
        {
            name: 'Contexto',
            url: 'https://contexto.me/pt/',
            description: 'Contexto é um jogo de adivinhação de palavras, você vai precisar descobrir uma palavra secreta dando palpites e pistas de "quente ou frio"',
        },
        {
            name: 'Conexo',
            url: 'https://conexo.ws',
            description: 'Conexo é um jogo de palavras onde você precisa formar 4 grupos de 4 palavras conectadas por um tema secreto. funciona como um desafio diário que testa seu raciocínio.',
        },
        {
            name: 'Rhythm Plus',
            url: 'https://rhythm-plus.com/',
            description: 'Esse aqui é um jogo de ritmo multiplayer onde você pode jogar e criar músicas/mapas com a comunidade. As notas descem na tela no ritmo da música e você tem que apertar as teclas certas no momento certo.',
        },
        {
            name: 'Color Method',
            url: 'https://color.method.ac/',
            description: 'Esse aqui é um pequeno jogo interativo voltado a percepção de cores, o site te coloca numa espécie de desafio onde você precisa acertar a cor de força precisa (ou quase), explorando conceitos como matiz, saturação e cores complementares.',
        },
        {
            name: 'Bird 1000',
            url: 'https://www.bird1000.com/',
            description: '<p>Bird1000 é um projeto que adapta um antigo conto armênio, Hazaran Blbul, em um jogo interativo, foca na busca por harmonia através da jornada do Príncipe Areg. Pressione a tecla de "espaço" para agir com o personagem.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },

    ],
    idiomas: [
        {
            name: 'LingoHut',
            url: 'https://www.lingohut.com/',
            description: '<p>LingoHut é um site de aprendizado de idiomas gratuito e sem cadastro, com lições curtas pra treinar vocabulário, frases e pronúncia em dezenas de línguas diferentes.</p> <p>A experiência é bem simples e direta: não precisa instalar nada nem fazer login. Basta selecionar a língua que quer estudar e começar a lição. Cada lição costuma focar em palavras e frases que você usaria no dia a dia, com explicações curtas e áudio pra ajudar na pronúncia.</p>',
        },
    ],
    diretorios_sites: [
        {
            name: 'Mr Free Tools',
            url: 'https://mrfreetools.com/',
            description: '<p>mrfreetools.com é um site de curadoria e busca de ferramentas gratuitas e recursos online que facilita encontrar soluções úteis sem precisar pagar ou se cadastrar. A ideia é reunir num só lugar softwares, apps, serviços e utilitários com versões gratuitas, organizados por categorias e com filtros pra ajudar a achar o que você precisa.</p><br> <strong> EM INGLÊS</strong>',
        },
    ],
    trabalho: [
        {
            name: 'Eureca',
            url: 'https://app.eureca.me/',
            description: '<p>Eureca é uma plataforma de vagas voltadas para <strong>estágio e trainee</strong>, oportunidades profissionais para ingressantes do mercado de trabalho. Você se cadastra e pode se inscrever em processos seletivos e acompanhar ativídades de capacitação.</p> <p>A ideia é oferecer um ambiente online onde candidatos conseguem se inscrever em oportunidades, construir perfil e acompanhar programas de desenvolvimento.</p> <br> ',
            tags: ['REQUER CONTA'],
        },
        {
            name: 'Sólides',
            url: 'https://vagas.solides.com.br/',
            description: '<p>Sólides Vagas é um portal de vagas da Sólides, aqui você encontra posições de trabalho anunciadas por empresas parceiras, possui oportunidades de emprego em diversas áreas e cidades do Brasil.</p> <p>Tem um certo foco em <strong>pequenas e médias empresas</strong></p> <br> <strong>REQUER CONTA</strong>',
        },
    ],
    aprendizado_avulsos: [
        {
            name: 'ShortcutFoo',
            url: 'https://www.shortcutfoo.com/',
            description: '<p>ShortcutFoo é uma plataforma gamificada para aprender e memorizar atalhos de teclado de diversas ferramentas como VSCode, Git, Vim, Excel e outras.</p><p>O sistema funciona como um treino repetitivo com feedback imediato — você pratica o atalho até internalizar, em vez de só decorar uma lista. Bom para quem quer ganhar velocidade no dia a dia de desenvolvimento.</p>',
            isNew: true,
            tags: ['EM INGLÊS', 'REQUER CONTA'],
        },
        {
            name: 'LunchBox Sessions',
            url: 'https://www.lunchboxsessions.com/',
            description: '<p>Plataforma de treinamento industrial focada em hidráulica, elétrica, instrumentação e automação. O conteúdo mistura aulas, vídeos 3D, exercícios e simulações interativas que permitem testar sistemas e componentes na prática.</p><p>O grande diferencial são as simulações de esquemas elétricos e hidráulicos em funcionamento, ajudando a entender diagnósticos, leitura de diagramas e resolução de falhas sem precisar de equipamentos físicos.</p><p>Possui alguns materiais gratuitos para experimentar, mas o acesso completo ao acervo exige assinatura. <strong>Vale especialmente para estudantes, técnicos, mecânicos e profissionais de manutenção industrial.</strong></p>',
            isNew: true,
            tags: ['EM INGLÊS', 'REQUER CONTA', 'REQUER ASSINATURA PARA USO COMPLETO']
        },
    ],
    automotivo: [
        {
            name: 'Auto Catalog Archive',
            url: 'https://autocatalogarchive.com/',
            description: '<p>Auto Catalog Archive é um site focado em catálogos de automóveis, o site reúne mais de 30 mil catálogos para visualização e download, os catálogos são originais usados pelas próprias montadoras (detalhes técnicos, estilos, equipamentos, versões etc.).</p><strong>EM INGLÊNS</strong>',
        },
        {
            name: 'Start My Car',
            url: 'https://www.startmycar.com/',
            description: '<p>É um site comunitário voltado a carros e veículos onde os usuários podem perguntar e compartilhar problemas, experiências e soluções relacionadas a manutenção, defeitos ou dúvidas técnicas de automóveis.</p> ',
            tags: ['EM INGLÊS'],
        },
    ],
    modelos_3d: [
        {
            name: 'Sketchfab',
            url: 'https://sketchfab.com/',
            description: '<p>Sketchfab é uma plataforma voltada para visualização, compartilhamento e descoberta de modelos 3D diretamente no navegador. O site permite explorar milhões de modelos interativos criados por artistas, desenvolvedores, empresas, museus e comunidades de todo o mundo.</p><p>Você encontra desde personagens, veículos e cenários de jogos até artefatos históricos, equipamentos industriais e reconstruções científicas. Um dos grandes diferenciais é poder girar, ampliar e inspecionar os modelos em tempo real sem precisar baixar nenhum software.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
    ],
    outros: [
        {
            name: 'MoeWalls',
            url: 'https://moewalls.com/',
            description: '<p>Esse site serve basicamente como um repositório de wallpapers, com foco em imagens animadas e também papéis de parede estáticos. Aqui existem bastantes wallpapers de anime, jogos e filmes.</p>',
        },
        {
            name: 'Lytube',
            url: 'https://www.lytube.com/?v=QNBO7wIU3yI',
            description: 'Lytube é site de terceiros de reprodução/vizualização de vídeos baseados em links do youtube, nele você consegue colocar um parâmetro de uma URL de alguma música no Youtube e aproveitar ele com sua letra original, funciona assim, vá em alguma música no youtube e procure no link dele o parâmetro depois do &quot;watch?v=&quot; e antes do &quot;&list=&quot;, copie e cole, dê play e aproveite a música, evite pegar músicas com videoclipe ou lyrics de canais não oficiais, caso não consiga dar play na música, atualize a página',
        },
        {
            name: 'CubisHeart',
            url: 'https://www.cubistheart.com/',
            description: 'Esse é um projeto artístico, cada página do site mostra um relógio diferente para cada dia, com um visual baseado em imagens coletadas da internet, é basicamente isso, vale a pena acessar o site, tenho certeza que você nunca viu tantas formas criativas de ver que horas são.',
        },
        {
            name: 'Pointer Pointer',
            url: 'https://pointerpointer.com/',
            description: 'É aquele tipo de site que cura seu tédio, basicamente, ao deixar o seu cursor do mouse em algum lugar da tela, você vai se deparar com uma foto de alguem apontando para seu cursor.',
        },
        {
            name: '10k Drum Machines',
            url: 'https://10kdrummachines.com/',
            description: '<p>10k Drum Machines é um acervo online dedicado a drum machines, aquelas máquinas usadas para criar batidas e ritmos eletrônicos. O site reúne modelos clássicos e modernos em uma interface simples onde você pode explorar informações, ouvir os sons característicos e conhecer equipamentos que marcaram a história da música eletrônica.</p><p>Mesmo para quem não produz música, é interessante navegar pelo catálogo e descobrir como diferentes baterias eletrônicas influenciaram gêneros musicais ao longo das décadas. É um daqueles sites de nicho que acaba sendo bem mais interessante do que parece à primeira vista.</p>',
            isNew: true,
            tags: ['EM INGLÊS'],
        },
        {
            name: 'Stereo Drift',
            url: 'https://stereodrift.github.io/',
            description: '<p>Stereo Drift é um projeto web experimental que transforma músicas em uma experiência visual interativa. Conforme a faixa toca, formas, partículas e efeitos animados reagem ao áudio em tempo real, criando uma espécie de visualizador musical psicodélico diretamente no navegador.</p><p>É o tipo de site que vale mais pela experiência do que pela utilidade. Basta dar play, aumentar o volume e observar como os elementos visuais acompanham o ritmo e as características da música, resultando em uma apresentação bastante hipnótica.</p>',
            isNew: true,
        },
    ],
};
