import { useState } from 'react'
import { activeCase } from '../../cases/active'
import { caseImage } from '../../cases/images'
import {
  evidences, comparisons, criteria, intro,
  type EvTruth, type CmpTruth,
} from '../../cases/case_03/evidence'
import { routes } from '../../cases/case_03/map'
import { endings } from '../../cases/case_03/endings'
import { timeline } from '../../cases/case_03/timeline'
import { InvestigationGraph } from '../../ui/InvestigationGraph'
import { CaseFiles } from '../../ui/CaseFiles'
import { ImageLightbox } from '../../ui/ImageLightbox'
import { BrandMark } from '../../ui/Brand'
import { BackButton } from '../../ui/BackButton'
import { categories } from '../../ui/categories'
import {
  IconFile, IconGraph, IconClock, IconAlert, IconCheck, IconMapPin, IconFolder,
  IconShield, IconImage, IconProjector, IconSearch, type Icon,
} from '../../ui/icons'
import { PalestraCase03 } from './PalestraCase03'
import '../../styles/analista.css'

type SectionKey =
  | 'resumo' | 'timeline' | 'grafo' | 'evidencias' | 'comparacoes'
  | 'percursos' | 'finais' | 'criterios' | 'materiais'

const SECTIONS: { key: SectionKey; label: string; Icon: Icon }[] = [
  { key: 'resumo', label: 'Resumo', Icon: IconShield },
  { key: 'timeline', label: 'Linha do tempo', Icon: IconClock },
  { key: 'grafo', label: 'Grafo de correlação', Icon: IconGraph },
  { key: 'evidencias', label: 'Gabarito — evidências', Icon: IconFile },
  { key: 'comparacoes', label: 'Gabarito — comparações', Icon: IconSearch },
  { key: 'percursos', label: 'Percursos (fase 5)', Icon: IconMapPin },
  { key: 'finais', label: 'Finais possíveis', Icon: IconFolder },
  { key: 'criterios', label: 'Critérios', Icon: IconCheck },
  { key: 'materiais', label: 'Materiais', Icon: IconImage },
]

const EV_LABEL: Record<EvTruth, string> = {
  confirmado: 'Confirmado', relato: 'Relato', hipotese: 'Hipótese', desconhecido: 'Desconhecido',
}
const CMP_LABEL: Record<CmpTruth, string> = {
  confirmada: 'Confirmada', acrescentada: 'Acrescentada', incerta: 'Incerta',
}

export function AnalistaCase03() {
  const [section, setSection] = useState<SectionKey>('resumo')
  const [showDocs, setShowDocs] = useState(false)
  const [presenting, setPresenting] = useState(false)
  const [zoom, setZoom] = useState<{ title: string; src: string; cap?: string } | null>(null)
  const clock = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="anl">
      <div className="anl-banner"><IconAlert size={14} /> SIMULAÇÃO EDUCATIVA — AICOI, pessoas e dados 100% fictícios. Este painel é o gabarito do caso. O caso é inconclusivo por projeto.</div>
      <div className="anl-top">
        <BackButton />
        <BrandMark size="sm" mode="Analista" />
        <span className="anl-title">painel-do-analista · CASE #{activeCase.number}</span>
        <button className="anl-project" onClick={() => setPresenting(true)}><IconProjector size={16} /> Projetar</button>
        <span className="anl-clock">{clock}</span>
      </div>

      {presenting && <PalestraCase03 onExit={() => setPresenting(false)} />}
      {showDocs && <CaseFiles unlockedAll onClose={() => setShowDocs(false)} />}
      {zoom && <ImageLightbox title={zoom.title} src={zoom.src} caption={zoom.cap} onClose={() => setZoom(null)} />}

      <div className="anl-body">
        <aside className="anl-side">
          {SECTIONS.map((s) => (
            <button key={s.key} className={'anl-navbtn' + (section === s.key ? ' active' : '')} onClick={() => setSection(s.key)}>
              <s.Icon size={16} /> {s.label}
            </button>
          ))}
        </aside>

        <main className="anl-main">
          {section === 'resumo' && <Resumo />}
          {section === 'timeline' && <Timeline />}
          {section === 'grafo' && <div className="anl-graph-wrap"><InvestigationGraph /></div>}
          {section === 'evidencias' && <Evidencias />}
          {section === 'comparacoes' && <Comparacoes />}
          {section === 'percursos' && <Percursos />}
          {section === 'finais' && <Finais />}
          {section === 'criterios' && <Criterios />}
          {section === 'materiais' && <Materiais onDocs={() => setShowDocs(true)} onZoom={setZoom} />}
        </main>
      </div>
    </div>
  )
}

function Resumo() {
  return (
    <div className="anl-sec">
      <h2>26 anos de silêncio — resumo</h2>
      <p className="anl-lead">{intro}</p>
      <div className="anl-cards">
        <div className="anl-card"><b>Quem</b><p>Marie J. E. Salles, francesa, desaparecida aos 5 anos no Castelo Real (Londres) em 23/04/2000. Mãe falecida em 1997; criada pelo pai, Paul.</p></div>
        <div className="anl-card"><b>O que o caso pede</b><p>Reconstruir a cronologia, separar fato/relato/hipótese e reconhecer limitações — <b>sem</b> inventar uma solução.</p></div>
        <div className="anl-card ok"><b>Verdade central</b><p>O destino de Marie <b>não foi confirmado</b>. O caso termina aberto; o que muda é a qualidade da investigação (Finais A–D).</p></div>
      </div>
      <div className="anl-note"><IconShield size={14} /> Lições: relato ≠ prova; semelhança ≠ identidade; projeção ≠ retrato; a certidão de óbito dos autos é da MÃE, não de Marie.</div>
    </div>
  )
}

function Timeline() {
  return (
    <div className="anl-sec">
      <h2>Linha do tempo</h2>
      <ol className="anl-tl">
        {timeline.map((e, i) => {
          const cat = categories[e.kind]
          return (
            <li key={i} className="anl-tl-item" style={{ ['--nc' as string]: cat.color }}>
              <span className="anl-tl-dot"><cat.Icon size={14} /></span>
              <div className="anl-tl-body">
                <span className="anl-tl-time">{e.time}</span>
                <b>{e.label}</b>
                <p>{e.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Evidencias() {
  return (
    <div className="anl-sec">
      <h2>Gabarito — quadro de evidências</h2>
      <p className="anl-tip">Classificação esperada. Elevar qualquer suspeita a “Confirmado” caracteriza conclusão precipitada (Final C).</p>
      <div className="anl-rows">
        {evidences.map((e) => (
          <div key={e.id} className={'anl-row truth-' + e.truth + (e.id === 'ev-obito-marie' ? ' flag' : '')}>
            <div className="anl-row-top"><b>{e.text}</b><span className="anl-badge">{EV_LABEL[e.truth]}{e.phase > 4 ? ` · fase ${e.phase}` : ''}</span></div>
            <p className="anl-rownote">{e.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Comparacoes() {
  return (
    <div className="anl-sec">
      <h2>Gabarito — depoimento × anotação complementar</h2>
      <div className="anl-rows">
        {comparisons.map((c) => (
          <div key={c.id} className="anl-row">
            <div className="anl-row-top"><b>{c.info}</b><span className="anl-badge">{CMP_LABEL[c.truth]}</span></div>
            <div className="anl-cmp"><span><em>Detalhe:</em> {c.detail}</span></div>
            <p className="anl-rownote">{c.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Percursos() {
  return (
    <div className="anl-sec">
      <h2>Percursos no castelo (Fase 5 · scaffolded)</h2>
      <p className="anl-tip">Nenhum percurso é “o correto”. O último ponto com respaldo documental é a loja (11h40) — não o portão leste.</p>
      <div className="anl-rows">
        {routes.map((r) => (
          <div key={r.id} className="anl-row">
            <div className="anl-row-top"><b>{r.label}</b><span className="anl-badge">{r.expected}</span></div>
            <p className="anl-rownote">{r.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Finais() {
  return (
    <div className="anl-sec">
      <h2>Os quatro finais</h2>
      <p className="anl-tip">Todos preservam a mesma verdade: o destino de Marie não foi confirmado. Muda a qualidade da investigação.</p>
      <div className="anl-rows">
        {(['A', 'B', 'D', 'C'] as const).map((id) => {
          const e = endings[id]
          return (
            <div key={id} className={'anl-row ' + (e.rejected ? 'truth-diverge' : 'truth-coincide')}>
              <div className="anl-row-top"><b>Final {e.id} — {e.title}</b><span className="anl-badge">{e.rejected ? 'Rejeitado' : 'Aceito'}</span></div>
              <p className="anl-rownote">{e.summary}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Criterios() {
  return (
    <div className="anl-sec">
      <h2>Critérios de avaliação</h2>
      <ul className="anl-crit">
        {criteria.map((c, i) => <li key={i}><IconCheck size={15} /> <span>{c}</span></li>)}
      </ul>
    </div>
  )
}

function Materiais({ onDocs, onZoom }: { onDocs: () => void; onZoom: (z: { title: string; src: string; cap?: string }) => void }) {
  const imgs = [
    { title: 'Última foto (1999)', key: 'ultima_foto', cap: 'Última fotografia conhecida de Marie.' },
    { title: 'Projeção 2026', key: 'progressao_idade', cap: 'Projeção de envelhecimento — estimativa, não retrato.' },
    { title: 'Marie e Paul', key: 'marie-e-papai', cap: 'Foto familiar anterior ao desaparecimento.' },
    { title: 'Coelho de pelúcia', key: 'coelho', cap: 'Identificador narrativo, não prova de identidade.' },
    { title: 'Caixa de leite · MISSING', key: 'caixaleite-missing', cap: 'Campanha de divulgação (fictícia).' },
    { title: 'Recorte de jornal', key: 'jornal-machete-missing', cap: '24/04/2000 — horário sem fonte independente.' },
  ].map((i) => ({ ...i, src: caseImage('case_03', i.key) })).filter((i) => i.src) as { title: string; key: string; cap: string; src: string }[]

  return (
    <div className="anl-sec">
      <h2>Materiais do caso</h2>
      <button className="anl-docsbtn" onClick={onDocs}><IconFile size={16} /> Abrir autos (Registro · Testemunho · Alerta · Óbito)</button>
      <h3>Fichário</h3>
      <div className="anl-gallery">
        {imgs.map((i) => (
          <button key={i.key} className="anl-thumb" onClick={() => onZoom({ title: i.title, src: i.src, cap: i.cap })}>
            <img src={i.src} alt={i.title} />
            <b>{i.title}</b>
          </button>
        ))}
      </div>
    </div>
  )
}
