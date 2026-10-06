import { persona, photoDetails, runs } from '../../data/persona'
import { missions } from '../../data/missions'
import { RouteMap } from '../../apps/RouteMap'

// Painéis visuais dos ataques simulados. Tudo fictício / demonstrativo.

export function DossierPanel() {
  return (
    <div className="kpanel">
      <h3>Dossiê reconstruído</h3>
      <table className="ktable">
        <tbody>
          {missions.map((m) => (
            <tr key={m.id}>
              <td>{m.clueLabel}</td>
              <td>{m.clueValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="kcaption">Reunido só com publicações públicas.</p>
    </div>
  )
}

export function WordlistPanel() {
  const words = [
    'thor', 'Thor', 'thor2007', 'Thor2007', 'thor1403', 'Thor@2007',
    'thor2007!', 'liathor', 'thor07', 'ThorSerrana',
  ]
  return (
    <div className="kpanel">
      <h3>wordlist gerada a partir do dossiê</h3>
      <div className="kwords">
        {words.map((w) => (
          <span key={w} className={w === photoDetails.password ? 'kword hit' : 'kword'}>{w}</span>
        ))}
      </div>
      <div className="klogin">
        <div className="klogin-box">
          <b>GameChat · login</b>
          <div className="kfield">usuário: <code>{persona.gamechat.nick}</code></div>
          <div className="kfield">senha: <code className="hit">{photoDetails.password}</code></div>
          <div className="kresult">✓ acesso concedido (simulação)</div>
        </div>
      </div>
      <p className="kcaption">Senha previsível = pet + ano de nascimento. Por isso 2FA e senha única importam.</p>
    </div>
  )
}

export function RecoveryPanel() {
  const qs = [
    { q: 'Nome do seu primeiro pet?', a: photoDetails.pet },
    { q: 'Nome de solteira da sua mãe?', a: photoDetails.mother },
    { q: 'Sua data de nascimento?', a: photoDetails.birthday },
  ]
  return (
    <div className="kpanel">
      <h3>recuperação de conta · perguntas de segurança</h3>
      {qs.map((x) => (
        <div key={x.q} className="krecov">
          <span>{x.q}</span>
          <code className="hit">{x.a}</code>
        </div>
      ))}
      <div className="kresult">✓ todas respondidas com dados públicos (simulação)</div>
      <p className="kcaption">Perguntas de segurança são fracas porque as respostas estão nas redes.</p>
    </div>
  )
}

export function PhishingPanel() {
  return (
    <div className="kpanel">
      <h3>engenharia social · mensagem fabricada</h3>
      <div className="kchat">
        <div className="kchat-head">para: {photoDetails.mother} (mãe)</div>
        <div className="kbubble">
          Mãe, troquei de número! Esse é o novo. Meu celular quebrou aqui no trabalho
          na {photoDetails.employer} 😣
        </div>
        <div className="kbubble">
          Preciso de uma transferência rápida, depois te explico. Não conta pra vó Rosa
          pra ela não se preocupar 🙏
        </div>
      </div>
      <p className="kcaption">
        Detalhes reais (trabalho, nome da avó) tornam a fraude convincente. Combine um código
        de segurança com a família e confirme por ligação.
      </p>
    </div>
  )
}

export function RiskMapPanel() {
  const loop = runs.find((r) => r.route === 'loop')!
  return (
    <div className="kpanel">
      <h3>correlação de localização e rotina</h3>
      <div className="kmap">
        <RouteMap run={loop} />
      </div>
      <ul className="krisk">
        <li>🏠 Casa: {photoDetails.street}, {photoDetails.houseNumber}</li>
        <li>💼 Trabalho: {photoDetails.employer}</li>
        <li>🏃 Rotina: Ter/Qui 06:10 (saída de casa)</li>
        <li>✈️ Casa vazia: 20 a 27/12</li>
      </ul>
      <p className="kcaption">
        Rotina fixa + endereço + período de viagem é informação sensível. Esconda o início do
        trajeto e nunca anuncie viagens antecipadamente.
      </p>
    </div>
  )
}
