// Dados do "construtor de conclusão" do CASE_02 (tipos locais ao caso).
// Fonte: ideia-case02.md §5 (denúncia) e §6 (procurado) + os documentos em ./pdf.
// Nada aqui descreve pessoa real — é cenário fictício do simulador.

export type AttrTruth = 'coincide' | 'diverge' | 'sem-dados'

export interface AttributeRow {
  id: string
  label: string
  fromDenuncia: string   // o que a denúncia anônima diz ("—" quando não informa)
  fromProcurado: string  // o que os documentos formais dizem ("—" quando não consta)
  truth: AttrTruth
  note: string           // feedback didático mostrado no recap
}

export type EvTruth = 'fato' | 'relato' | 'hipotese'

export interface EvidenceItem {
  id: string
  text: string
  source: 'denuncia' | 'red-wanted' | 'mandado'
  truth: EvTruth
  note: string
}

export interface CaptureJustification {
  id: string
  label: string
  correct: boolean
  feedback: string
}

export const intro =
  'Uma denúncia anônima aponta um homem, em Napoli, parecido com um procurado internacional ' +
  'da AICOI. Cruze a denúncia com os documentos formais, separe o que é fato do que é relato, ' +
  'localize o suspeito a tempo — e lembre: semelhança não é identificação.'

// Correlação Denúncia × Procurado. Repare que a maior parte não "coincide":
// a denúncia, sozinha, dá uma correlação fraca (é esse o ponto educativo).
export const attributes: AttributeRow[] = [
  {
    id: 'tatuagens',
    label: 'Tatuagens',
    fromDenuncia: 'Braço direito coberto por tatuagens',
    fromProcurado: 'Tatuagens (sinal particular)',
    truth: 'coincide',
    note: 'Ambas as fontes citam tatuagens — correlação real, mas tatuagem não é única.',
  },
  {
    id: 'cicatriz',
    label: 'Cicatriz facial',
    fromDenuncia: 'Cicatrizes no rosto',
    fromProcurado: 'Cicatriz facial (sinal particular)',
    truth: 'coincide',
    note: 'Cicatriz facial aparece nas duas fontes — reforça, mas não identifica sozinha.',
  },
  {
    id: 'nacionalidade',
    label: 'Nacionalidade',
    fromDenuncia: '—',
    fromProcurado: 'Russa',
    truth: 'sem-dados',
    note: 'A denúncia não informa nacionalidade; não dá para correlacionar o que não foi relatado.',
  },
  {
    id: 'nascimento',
    label: 'Nascimento',
    fromDenuncia: '—',
    fromProcurado: '27 de fevereiro (ano desconhecido)',
    truth: 'sem-dados',
    note: 'Sem data na denúncia — atributo não comparável.',
  },
  {
    id: 'nome',
    label: 'Nome / pseudônimo',
    fromDenuncia: 'Testemunha não sabia o nome',
    fromProcurado: 'Mirosvalikov · pseudônimo Baravsholov',
    truth: 'sem-dados',
    note: 'A testemunha não soube o nome; a identidade vem dos documentos, não da denúncia.',
  },
  {
    id: 'altura',
    label: 'Altura',
    fromDenuncia: 'Muito alto (≈ 1,90 m ou mais)',
    fromProcurado: '—',
    truth: 'sem-dados',
    note: 'A altura só aparece no relato; os documentos não trazem esse dado para comparar.',
  },
  {
    id: 'veiculo',
    label: 'Veículo',
    fromDenuncia: 'SUV preto Mercedes-AMG G63',
    fromProcurado: '—',
    truth: 'sem-dados',
    note: 'O SUV é só do relato — não correlaciona identidade, mas é uma boa pista de localização.',
  },
]

export const evidences: EvidenceItem[] = [
  {
    id: 'ev-nacionalidade',
    text: 'O procurado é de nacionalidade russa.',
    source: 'red-wanted',
    truth: 'fato',
    note: 'Consta nos documentos formais (Red Wanted / mandado).',
  },
  {
    id: 'ev-pseudonimo',
    text: 'O procurado responde pelo pseudônimo "Baravsholov".',
    source: 'red-wanted',
    truth: 'fato',
    note: 'Dado documentado na difusão da AICOI.',
  },
  {
    id: 'ev-paises',
    text: 'O procurado é buscado por sete países.',
    source: 'mandado',
    truth: 'fato',
    note: 'Lista formal no mandado/Red Wanted (EUA, Rússia, França, Alemanha, Polônia, Austrália, Suécia).',
  },
  {
    id: 'ev-horarios',
    text: 'O homem visitava a Pasticceria todos os dias às 07h45 e às 14h20.',
    source: 'denuncia',
    truth: 'relato',
    note: 'A visita de 03/10 (~14h20) é corroborada pela CAM 04 (14:27), mas a recorrência diária (07h45 e os demais dias) segue sendo relato não verificado.',
  },
  {
    id: 'ev-suv',
    text: 'O homem entrou no banco traseiro de um SUV preto.',
    source: 'denuncia',
    truth: 'relato',
    note: 'Relato anônimo — útil como pista, mas não verificado.',
  },
  {
    id: 'ev-crianca',
    text: 'O homem cometeu um crime ao se aproximar da criança.',
    source: 'denuncia',
    truth: 'hipotese',
    note: 'O relato descreve um gesto (acariciar a cabeça); isso NÃO comprova crime. Tratar como hipótese.',
  },
  {
    id: 'ev-identidade',
    text: 'O homem avistado é, com certeza, o procurado Mirosvalikov.',
    source: 'denuncia',
    truth: 'hipotese',
    note: 'Semelhança facial + reconhecimento por caixa de leite/TV não confirmam identidade. É hipótese.',
  },
]

// Justificativa exigida ao emitir a ordem de captura (preserva o ponto educativo).
export const captureJustifications: CaptureJustification[] = [
  {
    id: 'plausivel',
    label: 'Correspondência plausível; identidade a confirmar, mas o lead da localização atual é sólido o bastante para interceptar e verificar.',
    correct: true,
    feedback: 'Correto: age-se sobre uma correspondência plausível + localização corroborada, sem afirmar identidade como certa.',
  },
  {
    id: 'overclaim',
    label: 'Identidade 100% confirmada apenas pela denúncia anônima e pela semelhança facial.',
    correct: false,
    feedback: 'Exagero: denúncia anônima e semelhança não confirmam identidade. Reveja a justificativa.',
  },
  {
    id: 'underclaim',
    label: 'Não há correlação suficiente; melhor não agir e arquivar.',
    correct: false,
    feedback: 'Cauteloso demais: há correlação plausível e um lead de localização atual — não agir deixaria o suspeito escapar.',
  },
]

// Critérios de avaliação (ideia-case02.md §9), usados no recap do resultado.
export const criteria: string[] = [
  'Consultou os documentos essenciais (denúncia, Red Wanted, mandado).',
  'Identificou o nome parcial e o pseudônimo nos documentos.',
  'Correlacionou mais de uma característica, sem depender só da aparência.',
  'Reconheceu que a denúncia é anônima e não confirmada.',
  'Não tratou a interação com a criança como prova de crime.',
  'Separou fatos documentados, relatos e hipóteses.',
  'Entregou uma conclusão coerente com as evidências.',
]
