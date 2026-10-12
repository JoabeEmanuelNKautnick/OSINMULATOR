<div align="center">

<img src="imgs/logos/osinmulator_logo.png" alt="OSINMULATOR — Simulador de OSINT" width="660" />

### Observe · Correlacione · Investigue

**Uma experiência educativa que mostra, na prática, como posts comuns em redes sociais — somados — montam um dossiê perigoso sobre uma pessoa.**

<br>

![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-2B7FFF?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Licença](https://img.shields.io/badge/licença-educacional%20·%20não%20comercial-22C55E?style=for-the-badge)
![Dados](https://img.shields.io/badge/dados-100%25%20fictícios-EF4444?style=for-the-badge)

</div>

> [!WARNING]
> **Tudo aqui é ficção.** As personas (*Lia Andrade*; *Mirosvalikov/"Baravsholov"*), as cidades (*Vila Serrana*; *Napoli*), a agência *AICOI*, os apps, as fotos, as imagens de CCTV, os documentos (inquérito, laudos, denúncia, Red Wanted, mandado) e todos os dados são **100% fictícios** — inclusive os cenários de crime, criados apenas como contexto de investigação. Nenhuma ferramenta real de ataque é executada. O objetivo é **conscientização sobre privacidade e educação em OSINT/forense**, não ensinar a atacar ninguém.

---

## 💡 A ideia

Cada investigação é um **caso**, e cada caso pode ter uma natureza própria. O caso inicial — `case_01` — acompanha a apuração fictícia envolvendo **Lia Andrade**: o investigador lê os **autos oficiais** (inquérito e laudos), levanta tudo o que a vítima deixou exposto publicamente (**OSINT**) e, ao concluir, libera o **laudo pericial** final.

Já o `case_02` — **Operação Baravsholov** — é um caso **documental**: no "Portal AICOI" (fictício), o investigador cruza uma denúncia anônima com Red Wanted, mandado e imagens de CCTV para **localizar um procurado a tempo**. São dois formatos sobre a mesma base: **observar, correlacionar e concluir com evidências**.

No fim, fica claro o estrago que pistas soltas somadas podem causar — e, mais importante, **como cada pista poderia ter sido evitada**.

A estética fica no cruzamento de **CTF · investigação digital · threat intelligence · educação**: interface escura e técnica, com o smartphone colorido como contraste, e o neon usado como *recompensa visual* — nunca como decoração.

---

## 🧭 As três visões

A tela inicial tem um **seletor de casos** → depois você escolhe a visão. As três visões são independentes e compartilham **exatamente os mesmos dados**:

| Visão | Para quem | Onde | O que faz |
|-------|-----------|------|-----------|
| 🔍 **`?investigador`** | o público | celular | 3 apps fictícios, 9 missões, modo forense com pontuação/tempo, **autos do caso** e **dossiê final** com cards de evidência |
| 🖥️ **`?kali`** *(Analista)* | o palestrante | computador | terminal + inteligência: reconstrói o dossiê, 4 ataques simulados, **grafo**, **linha do tempo**, **autos do caso** e **Modo Palestra** |
| 🎯 **`?atc`** *(Atacante)* | atacante jogável | computador | **9 passos de ataque** em múltipla escolha, placar e tempo, e o relatório da invasão |

> 🎲 **Dinâmica sugerida:** o público joga de `?investigador` e um voluntário joga de `?atc` ao mesmo tempo — um descobre as pistas, o outro mostra o que um atacante faria com elas.

> ℹ️ **As visões variam por caso.** A tabela acima descreve o `case_01`. O `case_02` reimagina cada visão como um ambiente da AICOI (veja a seção [Casos](#️-casos)) e **bloqueia o Atacante** — é uma investigação documental, sem rota jogável de ataque.

---

## ✨ Destaques

- 🗂️ **Múltiplos casos** — seletor de casos na tela inicial; arquitetura plug-and-play para novos casos (`?case=…`).
- 📁 **Autos do caso** — documentos oficiais fictícios em **PDF** (inquérito + laudos). No Investigador, o **laudo pericial** só é liberado ao concluir a investigação (e o desbloqueio persiste).
- 📊 **Sistema de evidências** — cada pista vira um card com categoria, fonte, confiança e XP.
- 📽️ **Modo Palestra** — projeção em telão guiada pelas 9 missões (revelar pistas ao vivo, progresso e o reveal **`TARGET IDENTIFIED`**). Abre pelo botão **Projetar** no Analista; navega por setas/clicker.
- 🕸️ **Grafo de investigação** — pessoas, contas, locais, empresas e eventos conectados; clique num nó para isolar suas ligações.
- ⏱️ **Linha do tempo** — a ordem em que as pistas foram reunidas, ótima para o palestrante revisar o processo.
- 👆 **Pistas clicáveis** — nos apps, elementos como local, horário, parentesco e nick abrem um popover explicando *o que aquela informação entrega*.
- 🎨 **Identidade visual por tokens** — paleta oficial num só arquivo; ícones vetoriais próprios; marca **OSINMULATOR**.

---

## 📱 As 3 redes fictícias

| App | Inspiração | Revela |
|-----|-----------|--------|
| **Fotogram** | Instagram | posts, locais, comentários de família |
| **CorreApp** | Strava | corridas com mapa, horários e rota (início/fim = casa) |
| **GameChat** | Discord | perfil, nick e mensagens com rotina/senha/viagem |

### As 9 pistas
`nome do pet` · `data de nascimento` · `nome da mãe` · `onde trabalha` · `rua onde mora` · `número da casa` · `rotina` · `período de viagem` · `senha provável`

---

## 📁 Autos do caso

Documentos oficiais fictícios que acompanham a investigação (abrem em pop-up no computador e em nova aba no celular/tablet).

**`case_01` — Lia Andrade**

| Documento | Quando libera |
|-----------|---------------|
| **Inquérito Policial** (IPL — Portaria de Instauração) | desde o início |
| **Laudo Cadavérico / Necropsia** (IML — Exame Médico-Legal) | desde o início |
| **Laudo Pericial** (NPD — Exame em Equipamento Computacional) | no Investigador, **após concluir** a investigação; no Analista, sempre liberado |

> O Atacante não tem acesso aos autos.

**`case_02` — Operação Baravsholov**

| Documento | Observação |
|-----------|------------|
| **Registro de Denúncia Anônima** (DEN-2026-111026) | relato **não verificado** — pista, não prova |
| **Red Wanted — Alerta Vermelho** (AICOI) | difusão do procurado internacional |
| **Mandado de Prisão Internacional** | captura e extradição |

> Todos liberados desde o início. Além dos autos, o `case_02` traz **stills de CCTV** que chegam no app de **Mensagens** e um **Fichário** (foto do rosto + retrato falado).

---

## 🚀 Como rodar

Pré-requisitos: **Node.js 18+**

```bash
npm install     # instalar dependências
npm run dev     # ambiente de desenvolvimento
```

Depois abra:

| Visão | URL |
|-------|-----|
| Tela inicial (seletor de casos) | <http://localhost:5173/> |
| Investigador | <http://localhost:5173/?investigador> |
| Analista (Kali) | <http://localhost:5173/?kali> |
| Atacante | <http://localhost:5173/?atc> |

> O caso ativo é escolhido na tela inicial. Também dá para fixar pela URL com `&case=…` (o padrão é `case_01`). Ex.: `?investigador&case=case_02`, `?kali&case=case_02`. No `case_02`, `?atc&case=case_02` cai numa tela de "modo indisponível".
>
> 📲 Para testar no celular pelo mesmo Wi-Fi, use o endereço `Network` que o Vite mostra no terminal.

### Build de produção

```bash
npm run build     # gera a pasta dist/ (site estático)
npm run preview   # serve o build localmente
```

A pasta `dist/` é estática e pode ir para GitHub Pages, Netlify, Vercel, etc.

---

## ⌨️ Atalhos

**Analista do `case_01` (`?kali`)**

| Tecla | Ação |
|:-----:|------|
| `Enter` | Recon completo |
| `1`–`4` | Ataques simulados (senha · recuperação · engenharia social · mapa de risco) |

> O Analista do `case_02` é um **painel navegável por seções** (sem esses atalhos de recon/ataque).

**Modo Palestra** (botão **Projetar** — nos dois casos)

| Tecla | Ação |
|:-----:|------|
| `→` / `Espaço` | Revelar pista / avançar |
| `←` | Voltar |
| `R` | Recomeçar |
| `Esc` | Sair |

---

## 🗂️ Casos

Um caso é um pacote autossuficiente de dados, registrado em [`src/cases/index.ts`](src/cases/index.ts). Há dois tipos:

- **Caso social** (padrão, como o `case_01`): estrutura `persona`, `missions`, `attackMissions`, `graph`, `docs`, `index`; roda nas três visões clássicas (celular + Kali + Atacante).
- **Caso documental** (`kind: 'documental'`, como o `case_02`): tem uma *surface* própria por visão e pode desativar modos (ex.: `attackerDisabled: true`).

Para adicionar um novo caso social: coloque as fotos em `imgs/case_XX/`, crie `src/cases/case_XX/` (mesma estrutura do `case_01`) e registre no índice. O seletor da tela inicial e as visões passam a funcionar com `?...&case=case_XX`.

### 🕵️ CASE #02 — Operação Baravsholov

Uma investigação **documental** no **Portal AICOI** (fictício): a partir de uma denúncia anônima, o investigador decide se um homem visto em Napoli é um procurado internacional e tenta **localizá-lo a tempo**.

| Visão | O que é no `case_02` |
|-------|----------------------|
| 🔍 **Investigador** | Login da AICOI → desktop com apps: **Autos** (denúncia · Red Wanted · mandado), **Fichário** (foto + retrato falado), **Mensagens** (contatos com leads e CCTV), **Análise** (correlacionar atributos + classificar fato/relato/hipótese) e **Mapa**. Acertar o local abre uma **janela de captura de ~3 min** → **CAPTURADO × FUGIU** (sem pontos; decisão + rapidez definem o final). |
| 🖥️ **Analista** (`?kali`) | **Painel do Analista AICOI**: gabarito da solução (correlação, evidências, localização, ordem de captura), **linha do tempo**, **grafo de correlação**, **materiais** (autos + CCTV) e **Modo Palestra**. |
| 🎯 **Atacante** | **Bloqueado** só neste caso — não há rota jogável de ataque. |

> Premissa pedagógica: denúncia anônima é **pista, não prova**; semelhança não é identificação; e um gesto relatado não comprova crime.

> 📄 **Autos do caso:** para montar o inquérito (IPL) e os laudos, use os modelos editáveis em [`src/template-case/`](src/template-case/) (`.docx`) — inquérito policial, laudo IML, necropsia e laudo pericial. Preencha, exporte em PDF para a pasta `pdf/` do caso e aponte em `docs.ts`.

---

## 🎨 Identidade visual

Paleta oficial, centralizada em [`src/styles/tokens.css`](src/styles/tokens.css):

| | Uso | Hex |
|:-:|-----|-----|
| 🔵 | Azul principal | `#2B7FFF` |
| 🔷 | Ciano (brilho) | `#4FC3F7` |
| 🟣 | Roxo (acento) | `#7C5CFF` |
| 🟢 | Confirmado / sucesso | `#22C55E` |
| 🟡 | Suspeito / atenção | `#F59E0B` |
| 🔴 | Perigo / erro | `#EF4444` |
| ⚫ | Fundo | `#070B14` |

---

## 🧱 Tecnologias & estrutura

**Vite · React · TypeScript · CSS puro.** Sem back-end, sem bibliotecas de UI — tudo roda no navegador.

```
src/
  data/           tipos estáveis + fachada que serve o CASO ATIVO
  cases/          sistema de casos (registro, caso ativo, imagens)
                  case_01/ (social) · case_02/ (documental: conclusion, messages, map, timeline, docs)
  apps/           Fotogram · CorreApp · GameChat · Clue (pistas clicáveis)
  investigador/   fluxo do celular + modo forense + dossiê · case02/ (Portal AICOI)
  kali/           Analista: terminal, ataques e inteligência · case02/ (Painel + Palestra AICOI)
  atc/            modo atacante jogável
  palestra/       Modo Palestra (projeção em telão)
  ui/             design system: ícones, Brand, EvidenceCard, Progress, grafo, timeline,
                  CaseFiles (autos) + PdfModal, ImageLightbox, ModeUnavailable, categorias
  styles/         tokens (paleta oficial) + estilos por modo (case02.css, analista.css, …)
imgs/
  logos/          logo, letreiro e favicon
  case_01/        fotos + md/ e pdf/ (autos do caso)
  case_02/        logo AICOI, retrato falado, foto, stills de CCTV + md/ e pdf/
```

---

## 🗺️ Roadmap

**Concluído**

- [x] Identidade visual por tokens + ícones vetoriais
- [x] Sistema de evidências e indicadores de progresso
- [x] Modo Palestra + tela final `TARGET IDENTIFIED`
- [x] Grafo de investigação
- [x] Linha do tempo
- [x] Pistas clicáveis nos apps
- [x] Arquitetura de múltiplos casos (seletor + `?case=`)
- [x] Autos do caso (PDFs com liberação condicional)
- [x] Casos documentais (`kind: 'documental'`) + bloqueio de modo por caso
- [x] `case_02` — Operação Baravsholov (Investigador, Analista e Palestra AICOI)
- [x] Imagens de CCTV do `case_02` otimizadas (~300 KB cada)

**Próximos**

- [ ] Wallpaper do celular com pistas escondidas
- [ ] Feedback de descoberta em tempo real (toast de "nova evidência")
- [ ] XP cumulativo e ranking
- [ ] Mais casos e um editor de casos para palestrantes

---

## 🤝 Contribuições

**Contribuições são muito bem-vindas!** Abra uma *issue* ou um *pull request*. A ideia é que este projeto cresça com a comunidade e ajude cada vez mais gente a cuidar da própria privacidade.

## 📜 Licença e créditos

Uso **livre e gratuito** para fins educativos — e **com os devidos créditos**. **Venda ou qualquer uso comercial é proibido.** Leia os termos completos em [LICENSE.md](LICENSE.md).

<div align="center">

Criado por **Joabe Emanuel N. Kautnick** · [@JoabeEmanuelNKautnick](https://github.com/JoabeEmanuelNKautnick)

<sub>Observe · Correlacione · Investigue</sub>

</div>
