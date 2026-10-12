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
> **Tudo aqui é ficção.** A persona *Lia Andrade*, a cidade *Vila Serrana*, os apps, as fotos, os documentos (inquérito e laudos) e todos os dados são **100% fictícios** — inclusive o cenário de crime, criado apenas como contexto de investigação. Nenhuma ferramenta real de ataque é executada. O objetivo é **conscientização sobre privacidade e educação em OSINT/forense**, não ensinar a atacar ninguém.

---

## 💡 A ideia

Cada investigação é um **caso**. O caso inicial — `case_01` — acompanha a apuração fictícia envolvendo **Lia Andrade**: o investigador lê os **autos oficiais** (inquérito e laudos), levanta tudo o que a vítima deixou exposto publicamente (**OSINT**) e, ao concluir, libera o **laudo pericial** final.

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

Documentos oficiais fictícios que acompanham a investigação (abrem em pop-up no computador e em nova aba no celular/tablet):

| Documento | Quando libera |
|-----------|---------------|
| **Inquérito Policial** (IPL — Portaria de Instauração) | desde o início |
| **Laudo Cadavérico / Necropsia** (IML — Exame Médico-Legal) | desde o início |
| **Laudo Pericial** (NPD — Exame em Equipamento Computacional) | no Investigador, **após concluir** a investigação; no Analista, sempre liberado |

> O Atacante não tem acesso aos autos.

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

> O caso ativo é escolhido na tela inicial. Também dá para fixar pela URL: `?kali&case=case_01` (o padrão é `case_01`).
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

**Analista (`?kali`)**

| Tecla | Ação |
|:-----:|------|
| `Enter` | Recon completo |
| `1`–`4` | Ataques simulados (senha · recuperação · engenharia social · mapa de risco) |

**Modo Palestra** (botão **Projetar**)

| Tecla | Ação |
|:-----:|------|
| `→` / `Espaço` | Revelar pista / avançar |
| `←` | Voltar |
| `R` | Recomeçar |
| `Esc` | Sair |

---

## 🗂️ Casos

Um caso é um pacote autossuficiente de dados. Para adicionar um novo (`case_02`, …):

1. Coloque as fotos em `imgs/case_02/`.
2. Crie `src/cases/case_02/` (mesma estrutura do `case_01`: `persona`, `missions`, `attackMissions`, `graph`, `docs`, `index`).
3. Registre em [`src/cases/index.ts`](src/cases/index.ts).

O seletor da tela inicial e as três visões passam a funcionar automaticamente com `?...&case=case_02`.

> 🕵️ **CASE #02 — Operação Baravsholov** *(em desenvolvimento)*: uma investigação **documental** no "Portal AICOI" (fictício). O Investigador analisa denúncia anônima, Red Wanted e mandado, cruza leads que chegam por mensagem e precisa **localizar o suspeito a tempo** — acertar o local abre uma janela de captura de ~3 min (capturado × fugiu). O **Analista** (`?kali`) é um *Painel do Analista AICOI*: gabarito da solução, linha do tempo, grafo de correlação, materiais (autos + CCTV) e Modo Palestra. O modo **Atacante fica bloqueado** (só neste caso).

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
  cases/          sistema de casos (registro, caso ativo, imagens) + case_01/
  apps/           Fotogram · CorreApp · GameChat · Clue (pistas clicáveis)
  investigador/   fluxo do celular + modo forense + dossiê
  kali/           Analista: terminal, ataques e inteligência
  atc/            modo atacante jogável
  palestra/       Modo Palestra (projeção em telão)
  ui/             design system: ícones, Brand, EvidenceCard, Progress,
                  grafo, timeline, CaseFiles (autos) + PdfModal, categorias
  styles/         tokens (paleta oficial) + estilos por modo
imgs/
  logos/          logo, letreiro e favicon
  case_01/        fotos + md/ e pdf/ (autos do caso)
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
