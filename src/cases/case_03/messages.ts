// Canal seguro do CASE_03 — Departamento de Identificação do AICOI. Os contatos dão
// contexto e liberam pistas por progresso. Reforçam a regra central: relato ≠ prova,
// semelhança ≠ identidade. Nada aqui entrega a "solução" (o caso é inconclusivo).

export interface AicoiMessage {
  from: 'contato' | 'voce'
  text: string
  time?: string
  /** Basename de uma imagem do caso (ex.: 'coelho' → imgs/case_03/coelho.jpg). */
  image?: string
  imageCaption?: string
  /** Se definido, só aparece depois de a fase indicada acontecer. */
  unlockAfter?: 'linha' | 'analise'
}

export interface AicoiContact {
  id: string
  name: string
  role: string
  messages: AicoiMessage[]
}

export const contacts: AicoiContact[] = [
  {
    id: 'ident',
    name: 'Dep. de Identificação',
    role: 'Coordenação do caso',
    messages: [
      { from: 'contato', time: '09:02', text: 'Bom dia, investigador. Reabrimos o caso Marie Salles (Y-9862/2000-FICT-R1), 26 anos depois. Comece pelos autos e remonte a cronologia da manhã de 23/04/2000.' },
      { from: 'contato', time: '09:03', text: 'Regra central: você pode descobrir fatos sobre o desaparecimento sem descobrir o que aconteceu com Marie depois dele. Não invente uma solução.' },
      { from: 'voce', time: '09:04', text: 'Entendido. Vou montar a linha do tempo e marcar as inconsistências.' },
      { from: 'contato', time: '09:05', text: 'Atenção a um detalhe nos autos: há uma certidão de óbito. Leia com cuidado antes de concluir qualquer coisa.' },
      { from: 'contato', time: '09:20', unlockAfter: 'linha', text: 'Boa — janela 11h45–11h50 registrada. Lembre: é uma referência inicial, não prova de que ela sumiu exatamente nesse intervalo.' },
    ],
  },
  {
    id: 'arquivo',
    name: 'Arquivo Histórico',
    role: 'Documentos e imprensa',
    messages: [
      {
        from: 'contato', time: '09:08',
        text: 'Puxei o recorte de jornal de 24/04/2000. Veja: "pouco antes do meio-dia". Não cita a testemunha nem a origem do horário.',
        image: 'jornal-machete-missing',
        imageCaption: 'Recorte de jornal · 24/04/2000 — o horário "pouco antes do meio-dia" não tem fonte independente.',
      },
      {
        from: 'contato', time: '09:10',
        text: 'E a caixa de leite da campanha MISSING da época. É material de divulgação — não é prova de paradeiro.',
        image: 'caixaleite-missing',
        imageCaption: 'Caixa de leite · campanha MISSING (fictícia) — divulgação, não evidência de localização.',
      },
      { from: 'contato', time: '09:12', unlockAfter: 'analise', text: 'Localizei a anotação complementar da testemunha. Ela acrescenta um casal idoso por perto e fotos analógicas a revelar — mas diz que NÃO viu com quem a menina foi.' },
    ],
  },
  {
    id: 'consular',
    name: 'Enlace Consular',
    role: 'Montbleu / registros familiares',
    messages: [
      { from: 'contato', time: '09:15', text: 'Confirmo os dados civis: nascimento 12/10/1994 em Montbleu; mãe Amélie faleceu em 1997 (câncer). A certidão de óbito é da MÃE — não de Marie.' },
      {
        from: 'contato', time: '09:16',
        text: 'Tenho uma foto familiar anterior ao desaparecimento: Marie com o pai, carregando o coelho de pelúcia.',
        image: 'marie-e-papai',
        imageCaption: 'Foto familiar (anterior a 2000) — Marie e Paul; o coelho branco com manchas castanhas.',
      },
      {
        from: 'contato', time: '09:17', unlockAfter: 'analise',
        text: 'O coelho é um identificador forte, mas cuidado: ele ajuda a reconhecer, não a provar identidade.',
        image: 'coelho',
        imageCaption: 'Coelho de pelúcia branco com manchas castanhas — identificador narrativo, não prova.',
      },
    ],
  },
]
