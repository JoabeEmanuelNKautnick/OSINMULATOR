import { useEffect, useRef, useState } from 'react'

export interface Line {
  text: string
  cls?: 'cmd' | 'ok' | 'warn' | 'dim'
}

// Terminal que revela linhas uma a uma.
export function Terminal({ lines, prompt = 'root@kali:~#' }: { lines: Line[]; prompt?: string }) {
  const [shown, setShown] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shown >= lines.length) return
    const t = setTimeout(() => setShown((s) => s + 1), lines[shown]?.cls === 'cmd' ? 260 : 130)
    return () => clearTimeout(t)
  }, [shown, lines])

  useEffect(() => { setShown(0) }, [lines])

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight })
  }, [shown])

  return (
    <div className="term" ref={boxRef}>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} className={'term-line ' + (l.cls ?? '')}>
          {l.cls === 'cmd' && <span className="term-prompt">{prompt} </span>}
          {l.text}
        </div>
      ))}
      <div className="term-line">
        <span className="term-prompt">{prompt} </span>
        <span className="term-cursor">▋</span>
      </div>
    </div>
  )
}
