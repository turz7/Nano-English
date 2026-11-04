# BrightPath English

Uma experiência web responsiva para ensinar inglês a iniciantes que falam português. O inglês é o idioma-alvo; o português aparece como apoio para instruções, explicações e traduções.

## Executar localmente

Como o app usa módulos JavaScript, sirva esta pasta por HTTP em vez de abrir o HTML diretamente:

```powershell
python -m http.server 8765
```

Depois abra `http://127.0.0.1:8765/`.

## Verificações

```powershell
npm test
npm run check
```

O teste de conteúdo valida as cinco lições, objetivos, diálogos, vocabulário, exercícios, respostas e os cinco recursos externos revisados. Os vídeos usam incorporação oficial `youtube-nocookie.com`, têm link direto para o provedor, orientação em português e alternativa escrita. A disponibilidade de legendas e do player pode variar conforme o YouTube; a conclusão da lição não depende do vídeo. O progresso é salvo em `localStorage` com a chave `brightpath-english-progress-v1`; nenhum dado pessoal ou resposta é enviado para fora do dispositivo.

## Editar o conteúdo

As lições ficam em `content.js`. Cada lição deve manter objetivo, explicação, pelo menos cinco itens de vocabulário, diálogo, três exercícios e um registro de recurso. Só marque um recurso como `verified` depois de revisar relevância, legendas, URL original, permissão de incorporação e alternativa escrita.

## Limitações conhecidas

- Os cinco recursos apontam para vídeos públicos de terceiros revisados por relevância temática; o app não baixa nem re-hospeda esse conteúdo.
- A disponibilidade de legendas e incorporação depende do provedor e deve ser rechecadas periodicamente.
- O progresso é local ao dispositivo e não mede proficiência formal.
- A pronúncia é uma orientação escrita aproximada, não uma avaliação de fala.
