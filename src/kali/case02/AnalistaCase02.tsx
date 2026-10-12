import { useState } from 'react'
import { activeCase } from '../../cases/active'
import { caseImage } from '../../cases/images'
import {
  attributes, evidences, captureJustifications, criteria, intro,
  type AttrTruth, type EvTruth,
} from '../../cases/case_02/conclusion'
import { spots } from '../../cases/case_02/map'
import { timeline } from '../../cases/case_02/timeline'
import { InvestigationGraph } from '../../ui/InvestigationGraph'
import { CaseFiles } from '../../ui/CaseFiles'
import { ImageLightbox } from '../../ui/ImageLightbox'
import { BrandMark } from '../../ui/Brand'
import { BackButton } from '../../ui/BackButton'
import { categories } from '../../ui/categories'
import {
  IconFile, IconGraph, IconClock, IconAlert, IconCheck, IconMapPin, IconTarget,
  IconShield, IconImage, IconProjector, IconSearch, type Icon,
} from '../../ui/icons'
import { PalestraCase02 } from './PalestraCase02'
import '../../styles/analista.css'

type SectionKey =
  | 'resumo' | 'timeline' | 'grafo' | 'atributos' | 'evidencias'
  | 'local' | 'captura' | 'criterios' | 'materiais'

const SECTIONS: { key: SectionKey; label: string; Icon: Icon }[] = [
  { key: 'resumo', label: 'Resumo', Icon: IconShield },
  { key: 'timeline', label: 'Linha do tempo', Icon: IconClock },
  { key: 'grafo', label: 'Grafo de correlação', Icon: IconGraph },
  { key: 'atributos', label: 'Gabarito — correlação', Icon: IconSearch },
  { key: 'evidencias', label: 'Gabarito — evidências', Icon: IconFile },
  { key: 'local', label: 'Localização', Icon: IconMapPin },
  { key: 'captura', label: 'Ordem de captura', Icon: IconTarget },
  { key: 'criterios', label: 'Critérios', Icon: IconCheck },
  { key: 'materiais', label: 'Materiais', Icon: IconImage },
]

const ATTR_LABEL: Record<AttrTruth, string> = { coincide: 'Coincide', diverge: 'Diverge', 'sem-dados': 'Sem dados' }
const EV_LABEL: Record<EvTruth, string> = { fato: 'Fato', relato: 'Relato', hipotese: 'Hipótese' }

export function AnalistaCase02() {
  const [section, setSection] = useState<SectionKey>('resumo')
  const [showDocs, setShowDocs] = useState(false)
  const [presenting, setPresenting] = useState(false)
  const [zoom, setZoom] = useState<{ title: string; src: string; cap?: string } | null>(null)
  const clock = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="anl">
      <div className="anl-banner"><IconAlert size={14} /> SIMULAÇÃO EDUCATIVA — AICOI, pessoas e dados 100% fictícios. Este painel é o gabarito do caso.</div>
      <div className="anl-top">
        <BackButton />
        <BrandMark size="sm" mode="Analista" />
        <span className="anl-title">painel-do-analista · CASE #{activeCase.number}</span>
        <button className="anl-project" onClick={() => setPresenting(true)}><IconProjector size={16} /> Projetar</button>
        <span className="anl-clock">{clock}</span>
      </div>

      {presenting && <PalestraCase02 onExit={() => setPresenting(false)} />}
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
          {section === 'atributos' && <Atributos />}
          {section === 'evidencias' && <Evidencias />}
          {section === 'local' && <Local />}
          {section === 'captura' && <Captura />}
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
      <h2>Operação Baravsholov — resumo</h2>
      <p className="anl-lead">{intro}</p>
      <div className="anl-cards">
        <div className="anl-card"><b>Quem</b><p>Mirosvalikov, pseudônimo "Baravsholov" — procurado internacional (russo), sinais particulares: cicatriz facial e tatuagens no braço direito.</p></div>
        <div className="anl-card"><b>O que o caso pede</b><p>Correlacionar denúncia × documentos, separar fato/relato/hipótese e localizar o suspeito a tempo (janela de ~3 min) para capturá-lo.</p></div>
        <div className="anl-card ok"><b>Veredito-modelo</b><p>Correspondência <b>plausível</b> + localização atual corroborada (Caffè del Porto) → captura para verificação/extradição. Identidade pela denúncia anônima, sozinha, <b>não</b> se confirma.</p></div>
      </div>
      <div className="anl-note"><IconShield size={14} /> Lições: denúncia anônima é pista, não prova; semelhança não é identificação; o gesto com a criança não comprova crime.</div>
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

function Atributos() {
  return (
    <div className="anl-sec">
      <h2>Gabarito — correlação (Denúncia × Procurado)</h2>
      <p className="anl-tip">A denúncia, sozinha, só coincide nos sinais físicos. O resto é "sem dados" — semelhança não identifica.</p>
      <div className="anl-rows">
        {attributes.map((a) => (
          <div key={a.id} className={'anl-row truth-' + a.truth}>
            <div className="anl-row-top"><b>{a.label}</b><span className="anl-badge">{ATTR_LABEL[a.truth]}</span></div>
            <div className="anl-cmp"><span><em>Denúncia:</em> {a.fromDenuncia}</span><span><em>Procurado:</em> {a.fromProcurado}</span></div>
            <p className="anl-rownote">{a.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Evidencias() {
  return (
    <div className="anl-sec">
      <h2>Gabarito — classificação de evidências</h2>
      <div className="anl-rows">
        {evidences.map((e) => (
          <div key={e.id} className={'anl-row truth-' + e.truth + (e.id === 'ev-crianca' ? ' flag' : '')}>
            <div className="anl-row-top"><b>{e.text}</b><span className="anl-badge">{EV_LABEL[e.truth]}</span></div>
            <p className="anl-rownote">{e.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Local() {
  const correct = spots.find((s) => s.correct)!
  const decoys = spots.filter((s) => !s.correct)
  return (
    <div className="anl-sec">
      <h2>Localização atual</h2>
      <div className="anl-local ok">
        <div className="anl-local-top"><IconCheck size={16} /> <b>{correct.label}</b><span>{correct.sub}</span></div>
        <p>{correct.feedback}</p>
      </div>
      <h3>Por que os outros pontos erram</h3>
      <div className="anl-rows">
        {decoys.map((d) => (
          <div key={d.id} className="anl-row truth-diverge">
            <div className="anl-row-top"><b>{d.label}</b><span className="anl-badge">{d.sub}</span></div>
            <p className="anl-rownote">{d.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Captura() {
  return (
    <div className="anl-sec">
      <h2>Ordem de captura</h2>
      <p className="anl-tip">Ao acertar o local, abre a janela de ~3 min. Justificativa errada custa −30s; são 2 tentativas de despacho antes de o alvo fugir.</p>
      <div className="anl-rows">
        {captureJustifications.map((j) => (
          <div key={j.id} className={'anl-row ' + (j.correct ? 'truth-coincide' : 'truth-diverge')}>
            <div className="anl-row-top"><b>{j.label}</b><span className="anl-badge">{j.correct ? 'Correta' : 'Incorreta'}</span></div>
            <p className="anl-rownote">{j.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Criterios() {
  return (
    <div className="anl-sec">
      <h2>Critérios de avaliação</h2>
      <ul className="anl-crit">
        {criteria.map((c, i) => (
          <li key={i}><IconCheck size={15} /> <span>{c}</span></li>
        ))}
      </ul>
    </div>
  )
}

function Materiais({ onDocs, onZoom }: { onDocs: () => void; onZoom: (z: { title: string; src: string; cap?: string }) => void }) {
  const imgs = [
    { title: 'Foto do rosto', key: 'ultima_foto', cap: 'Imagem anexada ao caso.' },
    { title: 'Retrato falado', key: 'retrato_falado', cap: 'Difundido em canal de notícias — fonte indireta.' },
    { title: 'CCTV — Recon (LOCALIZADO)', key: 'Napoli CCTV_ Recon Mirosvalikov', cap: 'CAM 04 · Via Leonardo DaVinci · 03/10 14:27 — match facial.' },
    { title: 'CCTV — G63 na Pasticceria', key: 'Napoli CCTV_ G-Class Outside Pasticceria', cap: 'CAM 04 · Pasticceria Buona Luce · 03/10 14:27.' },
  ].map((i) => ({ ...i, src: caseImage('case_02', i.key) })).filter((i) => i.src) as { title: string; key: string; cap: string; src: string }[]

  return (
    <div className="anl-sec">
      <h2>Materiais do caso</h2>
      <button className="anl-docsbtn" onClick={onDocs}><IconFile size={16} /> Abrir autos do caso (Denúncia · Red Wanted · Mandado)</button>
      <h3>Fichário / CCTV</h3>
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
