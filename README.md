# BrightPath English

Uma experiência web responsiva para ensinar inglês a iniciantes que falam português. O inglês é o idioma-alvo; o português aparece como apoio para instruções, explicações e traduções.

## Páginas da aplicação

1. **Painel Geral (`index.html`)**:
   - Visão consolidada da trilha completa com duas etapas: **Primeiros encontros (A1)** e **Mais inglês no dia a dia (A1+)**.
   - Acompanhamento de progresso percentual, lições concluídas e leitura completa das explicações, vocabulários e diálogos.
   - Navegação direta para o novo modo interativo.

2. **Lições Interativas Passo a Passo (`interactive.html`)**:
   - Página dedicada para vivenciar as lições em formato interativo contínuo, tela a tela.
   - Suporte à audição de pronúncia nativa via Web Speech API (com controle de velocidade normal 1.0x e lenta 0.8x).
   - Diálogos simulados com áudio linha por linha e tradução revelável.
   - Desafios práticos interativos com feedback instantâneo e construtivo.
   - Desafio de montagem de frases (Word Unscramble) para fixar a ordem natural das palavras em inglês.
   - Fluxo contínuo (*Keep on Going*): ao concluir uma lição, um botão de avanço imediato carrega a lição seguinte sem interrupções.
   - **Modo Contínuo Infinito**: fila interminável de exercícios misturados com contador de sequência de acertos para prática ativa constante.

## Executar localmente

Como o app usa módulos JavaScript nativos, sirva esta pasta por HTTP:

```powershell
python -m http.server 8765
```

Depois abra:
- Painel Geral: `http://127.0.0.1:8765/`
- Modo Interativo A1+: `http://127.0.0.1:8765/interactive.html`

## Verificações automatizadas

```powershell
npm test
npm run check
```

Os testes cobrem:
- Validação estrutural do curso, unidades, lições, diálogos, vocabulários e exercícios (`tests/content.test.mjs`).
- Renderização do dashboard, carregamento de lições A1+, player de vídeo e feedback de exercícios (`tests/app.test.mjs`).
- Experiência interativa passo a passo, avanço contínuo entre lições (*Keep on Going*), desafios de frase e persistência em `localStorage` (`tests/interactive.test.mjs`).
- Verificação de sintaxe de todos os módulos (`node --check`).

## Armazenamento de progresso

O progresso é salvo no `localStorage` do navegador com a chave `brightpath-english-progress-v1`, unificado entre a visão geral e a página interativa. Nenhum dado pessoal é transmitido externamente.

## Editar o conteúdo

As lições ficam em `content.js`. Cada lição deve manter objetivo, explicação, pelo menos cinco itens de vocabulário, diálogo, três exercícios e um registro de recurso. Preserve IDs e pré-requisitos das lições existentes para não perder o progresso local.

## Limitações conhecidas

- Os cinco recursos da primeira etapa foram revisados por relevância temática; os cinco recursos da etapa A1+ têm títulos/canais conferidos e estão sinalizados como sugestões pendentes de revisão de conteúdo e legendas. O app não baixa nem re-hospeda conteúdo de terceiros.
- A reprodução de fala nativa utiliza a síntese de voz do navegador (`window.speechSynthesis`), respeitando o dispositivo e sem custo de rede.
- O progresso é local ao dispositivo e serve como registro de estudo e prática.
