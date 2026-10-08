import backUrl from '../../imgs/botao_voltar.png'

/** Volta à tela inicial (seletor de modos), removendo a query da URL. */
export function BackButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={'back-home' + (className ? ' ' + className : '')}
      onClick={() => { window.location.href = window.location.pathname }}
      title="Voltar ao início"
      aria-label="Voltar ao início"
    >
      <img src={backUrl} alt="Voltar" />
    </button>
  )
}
