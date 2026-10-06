# 🕵️ OSINT Simulator

Uma experiência **educativa** que mostra, na prática, como posts comuns em
redes sociais — somados — montam um dossiê perigoso sobre uma pessoa.

> ⚠️ **Tudo aqui é ficção.** A persona *Lia Andrade*, a cidade *Vila Serrana*,
> os apps, as fotos e todos os dados são **100% fictícios**. Nenhuma ferramenta
> real de ataque é executada — as "invasões" são apenas animações demonstrativas.
> O objetivo é **conscientização sobre privacidade**, não ensinar a atacar ninguém.

---

## 💡 A ideia

O público vira "investigador" e descobre, só com publicações públicas, tudo
sobre a Lia. No fim, vê o estrago que essas pistas somadas podem causar — e,
mais importante, **como cada pista poderia ter sido evitada**.

São **duas visões independentes** que compartilham exatamente os mesmos dados:

| Visão | Para quem | Onde | O que faz |
|-------|-----------|------|-----------|
| **`?investigador`** | o público | celular | 3 apps fictícios, 9 missões de múltipla escolha, modo forense com pontuação e tempo, e dossiê final |
| **`?kali`** | o palestrante | computador | visual de terminal, reconstrói o dossiê e demonstra 4 "ataques" simulados |

### As 3 redes fictícias
- **Fotogram** (tipo Instagram) — posts e comentários
- **CorreApp** (tipo Strava) — corridas com mapa e horário
- **GameChat** (tipo Discord) — perfil e mensagens

### As 9 pistas
Nome do pet · data de nascimento · nome da mãe · onde trabalha · rua onde mora ·
número da casa · rotina · período de viagem (casa vazia) · senha provável.

---

## 🚀 Como rodar

Pré-requisitos: **Node.js 18+**.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev
```

Depois abra:

- Tela inicial (escolha das visões): **http://localhost:5173/**
- Visão do público: **http://localhost:5173/?investigador**
- Visão do palestrante: **http://localhost:5173/?kali**

Para testar no celular pelo mesmo Wi-Fi, use o endereço `Network` que o Vite
mostra no terminal (ex.: `http://192.168.x.x:5173/?investigador`).

### Build de produção

```bash
npm run build     # gera a pasta dist/ (site estático)
npm run preview   # serve o build localmente para conferir
```

A pasta `dist/` é um site estático e pode ser hospedada em GitHub Pages,
Netlify, Vercel, etc.

---

## ⌨️ Atalhos na visão `?kali`

| Tecla | Ação |
|-------|------|
| `Enter` | Recon completo (reconstrói o dossiê) |
| `1` | Ataque: quebra de senha (wordlist) |
| `2` | Ataque: recuperação de conta |
| `3` | Ataque: engenharia social |
| `4` | Ataque: mapa de risco |

---

## 🧱 Tecnologias

Vite · React · TypeScript · CSS puro. Sem back-end — as duas visões são
totalmente estáticas e rodam no navegador.

## 📁 Estrutura

```
src/
  data/           persona.ts e missions.ts (FONTE ÚNICA dos dados)
  apps/           Fotogram, CorreApp, GameChat (compartilhados)
  investigador/   fluxo do celular + modo forense + dossiê
  kali/           terminal + ataques simulados
  styles/         base, phone, forensic, kali
imgs/             fotos fictícias da Lia
```

---

## 🤝 Contribuições

**Contribuições são muito bem-vindas!** Abra uma *issue* ou um *pull request*.
A ideia é que este projeto cresça com a comunidade e ajude cada vez mais gente
a cuidar da própria privacidade.

## 📜 Licença e créditos

Uso **livre e gratuito** para fins educativos — e **com os devidos créditos**.
**Venda ou qualquer uso comercial é proibido.** Leia os termos completos em
[LICENSE.md](LICENSE.md).

Criado por **Joabe Emanuel N. Kautnick**
([@JoabeEmanuelNKautnick](https://github.com/JoabeEmanuelNKautnick)).
