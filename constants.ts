import { Project } from './types';

export const PROJECTS_DARK: Project[] = [
  {
    id: 'd-01',
    title: 'MARIANA & PEDRO',
    category: 'Casamento Clássico',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    description: 'A emoção dos votos no altar da Catedral, seguido de uma festa inesquecível no Villa Ventura.'
  },
  {
    id: 'd-02',
    title: '15 ANOS: VALENTINA',
    category: 'Debutante de Luxo',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1740&auto=format&fit=crop',
    description: 'Uma noite de gala com valsa, luzes e glamour para celebrar a transição de uma fase.'
  },
  {
    id: 'd-03',
    title: 'COURO & ARTE',
    category: 'Institucional',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop',
    description: 'A tradição do calçado de Franca mostrada através de uma lente cinematográfica e moderna.'
  },
  {
    id: 'd-04',
    title: 'FORMATURA MEDICINA',
    category: 'Baile de Gala',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
    description: 'A celebração de uma conquista épica com energia contagiante e produção impecável.'
  }
];

export const PROJECTS_LIGHT: Project[] = [
  {
    id: 'l-01',
    title: 'FAZENDA SANTA RITA',
    category: 'Casamento no Campo',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop',
    description: 'O "Sim" dito sob a luz do pôr do sol, cercado pela natureza exuberante do interior.'
  },
  {
    id: 'l-02',
    title: 'PRÉ-WEDDING CANASTRA',
    category: 'Ensaio Externo',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1929&auto=format&fit=crop',
    description: 'Uma viagem romântica pelas paisagens naturais, capturando a conexão pura do casal.'
  },
  {
    id: 'l-03',
    title: 'BATIZADO DO MIGUEL',
    category: 'Família',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=2043&auto=format&fit=crop',
    description: 'Detalhes sagrados e sorrisos espontâneos em uma manhã iluminada de domingo.'
  },
  {
    id: 'l-04',
    title: 'COLEÇÃO VERÃO',
    category: 'Fashion Film',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1595066928639-651c6b1b4614?q=80&w=1974&auto=format&fit=crop',
    description: 'Editorial de moda dinâmica para lançamento de marca local, com estética solar e vibrante.'
  }
];

export const SYSTEM_INSTRUCTION = `
Você é AURA, a produtora executiva inteligente da JORGE FILMES.
Seu objetivo é qualificar leads e fechar reuniões. Você não está aqui para bater papo furado, mas para planejar produções cinematográficas de alto nível.

**Sua Personalidade:**
- Assertiva e confiante. Você sabe que o serviço é premium.
- Direta, mas elegante. Não use rodeios.
- Profissional e executiva.

**Instruções de Conversa:**
1. Comece perguntando o nome e vá direto ao ponto: que tipo de produção o cliente deseja (Casamento, 15 Anos, Institucional).
2. Pergunte a data de forma assertiva ("Vamos criar um filme. Qual é a data?").
3. Quando tiver Nome, Tipo de Evento e Data, encerre a conversa e direcione para o WhatsApp.

**Comando Especial:**
Quando o usuário fornecer os detalhes finais, você DEVE responder com este formato EXATO no final da mensagem:
[LINK_WHATSAPP: Resumo do evento aqui]

Exemplo:
"Perfeito, João. Já visualizei o projeto. Clique abaixo para falar com o Jorge."
[LINK_WHATSAPP: Olá Jorge, sou a AURA. Conversei com João sobre um Casamento para 12/12/2025.]

**Informações Chave:**
- Atuamos em Franca-SP e região.
- Especialidades: Casamentos, 15 Anos, Institucionais.
- Diferenciais: Cinema puro, sensibilidade, edição de alto nível.
`;