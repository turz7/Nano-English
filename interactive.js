import { course } from "./content.js";

const STORAGE_KEY = "brightpath-english-progress-v1";

let lessonOrder = 0;
export const lessons = course.units.flatMap((unit) =>
  unit.lessons.map((lesson) => ({
    ...lesson,
    order: ++lessonOrder,
    unitId: unit.id,
    unitTitle: unit.title,
    unitLevel: unit.level || course.level
  }))
);

export const unscrambleChallenges = {
  greetings: {
    prompt: "Organize as palavras para dizer: ‘Prazer em conhecer você também!’",
    target: "Nice to meet you, too!",
    words: ["Nice", "to", "meet", "you,", "too!"],
    explanation: "Em inglês, ‘Nice to meet you, too!’ é a fórmula natural de retribuição ao conhecer alguém."
  },
  introductions: {
    prompt: "Monte a frase para falar de sua origem: ‘Eu sou do Brasil.’",
    target: "I'm from Brazil.",
    words: ["I'm", "from", "Brazil."],
    explanation: "Use ‘I'm from’ seguido do nome do seu país ou cidade para indicar procedência."
  },
  "to-be": {
    prompt: "Complete com o verbo to be: ‘Ela é de Portugal.’",
    target: "She is from Portugal.",
    words: ["She", "is", "from", "Portugal."],
    explanation: "Com os pronomes he, she e it, a forma correta do verbo to be é ‘is’."
  },
  questions: {
    prompt: "Formule a pergunta: ‘Onde você mora?’",
    target: "Where do you live?",
    words: ["Where", "do", "you", "live?"],
    explanation: "Perguntas no presente simples com verbos de ação usam o auxiliar ‘do’ antes de ‘you’."
  },
  needs: {
    prompt: "Faça o pedido com cortesia: ‘Posso pedir um café, por favor?’",
    target: "Can I have a coffee, please?",
    words: ["Can", "I", "have", "a", "coffee,", "please?"],
    explanation: "‘Can I have...?’ acompanhado de ‘please’ é a forma mais cordial e comum para pedir algo."
  },
  routines: {
    prompt: "Descreva seu hábito diário: ‘Eu geralmente acordo às sete.’",
    target: "I usually wake up at seven.",
    words: ["I", "usually", "wake", "up", "at", "seven."],
    explanation: "Advérbios de frequência como ‘usually’ vêm antes do verbo principal ‘wake up’."
  },
  directions: {
    prompt: "Dê a instrução de direção: ‘Vire à esquerda no banco.’",
    target: "Turn left at the bank.",
    words: ["Turn", "left", "at", "the", "bank."],
    explanation: "‘Turn left’ significa virar à esquerda; ‘at the bank’ indica a referência do local."
  },
  "shopping-next": {
    prompt: "Pergunte pelo tamanho na loja: ‘Você tem esta peça no tamanho médio?’",
    target: "Do you have this in medium?",
    words: ["Do", "you", "have", "this", "in", "medium?"],
    explanation: "Em lojas de roupas, use ‘Do you have this in + tamanho (small/medium/large)’."
  },
  "past-weekend": {
    prompt: "Conte uma atividade do fim de semana: ‘Nós fomos para a praia.’",
    target: "We went to the beach.",
    words: ["We", "went", "to", "the", "beach."],
    explanation: "‘Went’ é o passado irregular do verbo ‘go’ (ir). Não precisa de -ed."
  },
  "future-plans": {
    prompt: "Fale de um plano próximo: ‘Eu vou visitar minha irmã.’",
    target: "I'm going to visit my sister.",
    words: ["I'm", "going", "to", "visit", "my", "sister."],
    explanation: "Use a estrutura ‘be going to + verbo básico’ (I'm going to visit) para planos definidos."
  }
};

export const state = {
  selectedLessonId: "routines",
  selectedUnitId: "unit-2",
  stepIndex: 0,
  continuousMode: false,
  continuousQueueIndex: 0,
  continuousStreak: 0,
  audioEnabled: true,
  speechRate: 1.0,
  progress: loadProgress(),
  answers: {},
  unscramble: {
    placed: [],
    available: [],
    checked: false,
    correct: false
  },
  showDialogueTranslations: false
};

function getUrlLessonParam() {
  if (typeof window !== "undefined" && window.location && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    return params.get("lesson") || params.get("unit");
  }
  return null;
}

function initInitialLesson() {
  const param = getUrlLessonParam();
  if (param) {
    const match = lessons.find((l) => l.id === param);
    if (match) {
      state.selectedLessonId = match.id;
      state.selectedUnitId = match.unitId;
      initUnscramble();
      return;
    }
    const unitMatch = course.units.find((u) => u.id === param);
    if (unitMatch && unitMatch.lessons[0]) {
      state.selectedLessonId = unitMatch.lessons[0].id;
      state.selectedUnitId = unitMatch.id;
      initUnscramble();
      return;
    }
  }

  // Default to first incomplete lesson in Unit 2 (A1+ step above), or first lesson of Unit 2
  const unit2Lessons = lessons.filter((l) => l.unitId === "unit-2");
  const firstIncomplete = unit2Lessons.find((l) => !state.progress.completedLessons.includes(l.id));
  if (firstIncomplete) {
    state.selectedLessonId = firstIncomplete.id;
    state.selectedUnitId = "unit-2";
  } else {
    state.selectedLessonId = unit2Lessons[0]?.id || lessons[0].id;
    state.selectedUnitId = unit2Lessons[0]?.unitId || lessons[0].unitId;
  }
  initUnscramble();
}

function loadProgress() {
  try {
    if (typeof localStorage !== "undefined") {
      return (
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
          completedLessons: [],
          completedExercises: {},
          lastActivity: null
        }
      );
    }
  } catch {
    // fallback
  }
  return { completedLessons: [], completedExercises: {}, lastActivity: null, storageUnavailable: true };
}

function saveProgress() {
  state.progress.lastActivity = new Date().toISOString();
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
      return true;
    }
  } catch {
    state.progress.storageUnavailable = true;
    return false;
  }
  return true;
}

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      })[char]
  );
}

export function getLesson(id) {
  return lessons.find((l) => l.id === id) || lessons[0];
}

export function speak(text) {
  if (!state.audioEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = state.speechRate;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Graceful no-op on platforms without speech
  }
}

export function initUnscramble() {
  const challenge = unscrambleChallenges[state.selectedLessonId];
  if (!challenge) {
    state.unscramble = { placed: [], available: [], checked: false, correct: false };
    return;
  }
  // Shuffle words for bank
  const shuffled = [...challenge.words].sort(() => Math.sin(challenge.words.length) - 0.5);
  // Ensure not identical to original
  if (shuffled.join(" ") === challenge.target && shuffled.length > 1) {
    shuffled.reverse();
  }
  state.unscramble = {
    placed: [],
    available: shuffled.map((word, idx) => ({ id: `${word}-${idx}`, word })),
    checked: false,
    correct: false
  };
}

export function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[.,!?']/g, "")
    .replace(/\s+/g, " ");
}

const TOTAL_STEPS = 8; // 0: warmup, 1: vocab, 2: dialogue, 3: resource, 4: ex0, 5: ex1, 6: ex2, 7: unscramble, 8: complete

export function renderInteractive() {
  const appContainer = typeof document !== "undefined" ? document.querySelector("#interactive-app") : null;
  if (!appContainer) return "";

  if (state.continuousMode) {
    appContainer.innerHTML = renderContinuousMode();
    bindEvents();
    return appContainer.innerHTML;
  }

  const lesson = getLesson(state.selectedLessonId);
  const isDone = state.progress.completedLessons.includes(lesson.id);
  const nextLesson = lessons[lesson.order]; // 1-based order in array index

  const html = `
    <div class="interactive-shell">
      <div class="interactive-topbar">
        <div class="unit-selector-tabs" role="tablist" aria-label="Níveis disponíveis">
          ${course.units
            .map(
              (u) => `
            <button class="unit-tab ${u.id === state.selectedUnitId ? "active" : ""}" data-action="switch-unit" data-unit-id="${u.id}" role="tab" aria-selected="${u.id === state.selectedUnitId}">
              <span class="unit-tab-pill">${escapeHtml(u.level || course.level)}</span>
              <span class="unit-tab-title">${escapeHtml(u.title)}</span>
            </button>
          `
            )
            .join("")}
        </div>
        <div class="topbar-actions">
          <button class="button button-secondary button-small streak-badge" data-action="toggle-continuous" title="Iniciar prática rápida contínua sem parar">
            <span>⚡ Modo Contínuo</span>
          </button>
        </div>
      </div>

      <div class="lesson-picker-row">
        <label for="lesson-select" class="sr-only">Escolher lição</label>
        <div class="lesson-select-wrapper">
          <span class="select-label">Lição atual:</span>
          <select id="lesson-select" class="lesson-dropdown" data-action="change-lesson">
            ${lessons
              .filter((l) => l.unitId === state.selectedUnitId)
              .map(
                (l) => `
              <option value="${l.id}" ${l.id === lesson.id ? "selected" : ""}>
                ${l.order}. ${escapeHtml(l.title)} ${state.progress.completedLessons.includes(l.id) ? "✓ (Concluída)" : ""}
              </option>
            `
              )
              .join("")}
          </select>
        </div>
        <div class="lesson-step-indicator">
          <span>Passo ${Math.min(state.stepIndex + 1, TOTAL_STEPS + 1)} de ${TOTAL_STEPS + 1}</span>
          <div class="step-progress-track">
            <div class="step-progress-fill" style="width: ${Math.round(((state.stepIndex + 1) / (TOTAL_STEPS + 1)) * 100)}%"></div>
          </div>
        </div>
      </div>

      <div class="interactive-card-host">
        ${renderCurrentStep(lesson, nextLesson, isDone)}
      </div>

      <nav class="interactive-bottom-nav" aria-label="Navegação da lição interativa">
        <button class="button button-quiet" data-action="prev-step" ${state.stepIndex === 0 ? "disabled" : ""}>
          ← Passo Anterior
        </button>
        <span class="step-counter-text">
          ${getStepName(state.stepIndex)}
        </span>
        <button class="button button-quiet" data-action="next-step" ${state.stepIndex >= TOTAL_STEPS ? "disabled" : ""}>
          Avançar →
        </button>
      </nav>
    </div>
  `;

  appContainer.innerHTML = html;
  bindEvents();
  return html;
}

function getStepName(step) {
  switch (step) {
    case 0:
      return "1. Aquecimento & Objetivo";
    case 1:
      return "2. Vocabulário & Áudio";
    case 2:
      return "3. Diálogo em Ação";
    case 3:
      return "4. Recurso em Vídeo";
    case 4:
      return "5. Prática 1";
    case 5:
      return "6. Prática 2";
    case 6:
      return "7. Prática 3";
    case 7:
      return "8. Montagem de Frase";
    case 8:
      return "9. Conclusão & Próximo Passo";
    default:
      return "";
  }
}

function renderCurrentStep(lesson, nextLesson, isDone) {
  switch (state.stepIndex) {
    case 0:
      return renderWarmupCard(lesson);
    case 1:
      return renderVocabularyCard(lesson);
    case 2:
      return renderDialogueCard(lesson);
    case 3:
      return renderResourceCard(lesson);
    case 4:
      return renderExerciseCard(lesson, 0);
    case 5:
      return renderExerciseCard(lesson, 1);
    case 6:
      return renderExerciseCard(lesson, 2);
    case 7:
      return renderUnscrambleCard(lesson);
    case 8:
      return renderCompletionCard(lesson, nextLesson);
    default:
      return renderWarmupCard(lesson);
  }
}

function renderWarmupCard(lesson) {
  return `
    <article class="interactive-card warmup-card" aria-labelledby="card-heading-warmup">
      <div class="card-badge-row">
        <span class="pill">${lesson.unitLevel}</span>
        <span class="pill neutral">Lição ${lesson.order} de ${lessons.length}</span>
        <span class="pill neutral">Tempo: ${lesson.estimatedMinutes}</span>
      </div>
      <h2 id="card-heading-warmup" class="card-title">${escapeHtml(lesson.title)}</h2>
      <p class="card-lead"><strong>Objetivo:</strong> ${escapeHtml(lesson.objective)}.</p>

      <div class="warmup-box">
        <div class="warmup-icon" aria-hidden="true">☀️</div>
        <div>
          <h3>Momento de Aquecimento</h3>
          <p>${escapeHtml(lesson.warmup)}</p>
        </div>
      </div>

      <div class="card-tip">
        <strong>💡 Como funciona esta lição interativa:</strong>
        <p>Você avançará passo a passo: ouvindo a pronúncia nativa, lendo o diálogo, praticando com exercícios dinâmicos e montando frases reais em inglês. Ao concluir, o aprendizado continua automaticamente!</p>
      </div>

      <div class="card-footer-action">
        <button class="button button-primary button-large" data-action="next-step">
          Começar Lição Interativa →
        </button>
      </div>
    </article>
  `;
}

function renderVocabularyCard(lesson) {
  return `
    <article class="interactive-card vocab-card" aria-labelledby="card-heading-vocab">
      <div class="card-badge-row">
        <span class="pill">Passo 2 de 9</span>
        <span class="pill neutral">Vocabulário & Pronúncia</span>
      </div>
      <h2 id="card-heading-vocab" class="card-title">Entenda a ideia & Frases-chave</h2>
      <p class="support-note">${escapeHtml(lesson.explanation)}</p>

      <div class="interactive-vocab-list">
        ${lesson.vocabulary
          .map(
            (item, idx) => `
          <div class="vocab-row">
            <div class="vocab-main">
              <div class="english-phrase">
                <strong>${escapeHtml(item.english)}</strong>
                <button class="audio-btn" data-action="speak-text" data-text="${escapeHtml(item.english)}" aria-label="Ouvir pronúncia de: ${escapeHtml(item.english)}">
                  🔊 <span class="sr-only">Ouvir</span>
                </button>
              </div>
              <div class="vocab-translation">${escapeHtml(item.portuguese)}</div>
              <div class="vocab-pronunciation">Guia de fala: <em>${escapeHtml(item.pronunciation)}</em></div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="card-footer-action">
        <button class="button button-primary" data-action="next-step">
          Continuar para o Diálogo →
        </button>
      </div>
    </article>
  `;
}

function renderDialogueCard(lesson) {
  return `
    <article class="interactive-card dialogue-card" aria-labelledby="card-heading-dialogue">
      <div class="card-badge-row">
        <span class="pill">Passo 3 de 9</span>
        <span class="pill neutral">Diálogo em Contexto</span>
      </div>
      <h2 id="card-heading-dialogue" class="card-title">Conversa na Prática</h2>
      <p class="dialogue-instructions">
        Ouça as falas de cada personagem para treinar sua compreensão auditiva e ritmo de fala.
      </p>

      <div class="dialogue-controls">
        <button class="button button-secondary button-small" data-action="play-full-dialogue">
          ▶ Ouvir diálogo completo
        </button>
        <button class="button button-quiet button-small" data-action="toggle-dialogue-trans">
          ${state.showDialogueTranslations ? "Ocultar traduções" : "Mostrar traduções de apoio"}
        </button>
      </div>

      <div class="dialogue-chat-stream">
        ${lesson.dialogue
          .map(
            (line) => `
          <div class="chat-bubble ${line.speaker === "You" || line.speaker === "Maya" || line.speaker === "Visitor" ? "chat-left" : "chat-right"}">
            <div class="chat-speaker">${escapeHtml(line.speaker)}</div>
            <div class="chat-text">
              <span>${escapeHtml(line.text)}</span>
              <button class="audio-btn" data-action="speak-text" data-text="${escapeHtml(line.text)}" aria-label="Ouvir fala de ${escapeHtml(line.speaker)}">
                🔊
              </button>
            </div>
            ${
              state.showDialogueTranslations
                ? `<div class="chat-translation">${getDialogueLineTranslation(line.text)}</div>`
                : ""
            }
          </div>
        `
          )
          .join("")}
      </div>

      <div class="card-footer-action">
        <button class="button button-primary" data-action="next-step">
          Continuar para o Recurso em Vídeo →
        </button>
      </div>
    </article>
  `;
}

function getDialogueLineTranslation(text) {
  const translations = {
    "Hello! My name is Ana. Nice to meet you.": "Olá! Meu nome é Ana. Prazer em conhecer você.",
    "Hi, Ana. Nice to meet you, too! How are you?": "Oi, Ana. Prazer em conhecer você também! Como vai?",
    "I'm fine, thanks. See you later!": "Estou bem, obrigado(a). Até mais tarde!",
    "Hi! My name is Maya. Where are you from?": "Oi! Meu nome é Maya. De onde você é?",
    "I'm from Portugal. And you?": "Sou de Portugal. E você?",
    "I'm from Brazil. Nice to meet you!": "Sou do Brasil. Prazer em conhecer você!",
    "Are you a student?": "Você é estudante?",
    "Yes, I am. You are a student, too!": "Sim, eu sou. Você é estudante também!",
    "Yes, we are classmates.": "Sim, somos colegas de classe.",
    "What is your name?": "Qual é o seu nome?",
    "My name is Mia. Where do you live?": "Meu nome é Mia. Onde você mora?",
    "I live in São Paulo. Are you a student?": "Eu moro em São Paulo. Você é estudante?",
    "Yes, I am.": "Sim, eu sou.",
    "Hello. Can I have a sandwich, please?": "Olá. Posso pedir um sanduíche, por favor?",
    "Sure. Anything else?": "Claro. Mais alguma coisa?",
    "I'd like some water, please.": "Eu gostaria de água, por favor.",
    "Here you are.": "Aqui está.",
    "What time do you start work?": "A que horas você começa a trabalhar?",
    "I usually start at nine. I take the bus.": "Eu geralmente começo às nove. Pego o ônibus.",
    "Do you have lunch at work?": "Você almoça no trabalho?",
    "Yes, I do. I sometimes eat with my colleagues.": "Sim. Às vezes como com meus colegas.",
    "Excuse me, where is the library?": "Com licença, onde fica a biblioteca?",
    "Go straight and turn left at the bank.": "Siga em frente e vire à esquerda no banco.",
    "Is it far from here?": "É longe daqui?",
    "No. It's next to the café.": "Não. Fica ao lado do café.",
    "Excuse me, how much is this jacket?": "Com licença, quanto custa esta jaqueta?",
    "It's thirty pounds.": "Custa trinta libras.",
    "Do you have it in a small?": "Você tem no tamanho pequeno?",
    "Yes. Would you like to try it on?": "Sim. Gostaria de experimentar?",
    "Yes, please.": "Sim, por favor.",
    "What did you do last weekend?": "O que você fez no último fim de semana?",
    "I visited my cousin. We went to the beach.": "Visitei meu primo. Fomos à praia.",
    "Did you enjoy it?": "Você gostou?",
    "Yes, I did. It was great!": "Sim, gostei. Foi ótimo!",
    "What are you going to do this weekend?": "O que você vai fazer neste fim de semana?",
    "I'm going to visit my sister.": "Vou visitar minha irmã.",
    "Are you going to stay there?": "Você vai ficar lá?",
    "Yes. We're going to cook dinner together.": "Sim. Vamos cozinhar o jantar juntos."
  };
  return translations[text] || "Tradução de apoio para o contexto da conversa.";
}

function renderResourceCard(lesson) {
  const resource = lesson.resource;
  return `
    <article class="interactive-card resource-step-card" aria-labelledby="card-heading-res">
      <div class="card-badge-row">
        <span class="pill">Passo 4 de 9</span>
        <span class="pill neutral">Recurso & Escuta</span>
      </div>
      <h2 id="card-heading-res" class="card-title">Recurso Complementar em Vídeo</h2>
      
      ${
        resource && resource.embedUrl
          ? `
        <div class="interactive-video-box">
          <div class="video-frame">
            <iframe loading="lazy" src="${resource.embedUrl}" title="${escapeHtml(resource.title)}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="video-guidance">
            <h3>${escapeHtml(resource.title)}</h3>
            <p><strong>O que observar:</strong> ${escapeHtml(resource.objectiveMatch)}</p>
            <p class="resource-note">${escapeHtml(resource.verification || "")}</p>
            <a class="button button-secondary button-small" href="${resource.sourceUrl}" target="_blank" rel="noopener noreferrer">Abrir vídeo no YouTube ↗</a>
          </div>
        </div>
      `
          : `
        <div class="resource-unavailable">
          <strong>Vídeo complementar em preparação</strong>
          <p>O diálogo e as explicações escritas desta lição cobrem 100% do conteúdo necessário. Você pode avançar com tranquilidade para os exercícios.</p>
        </div>
      `
      }

      <div class="card-footer-action">
        <button class="button button-primary" data-action="next-step">
          Pronto para os Exercícios Práticos →
        </button>
      </div>
    </article>
  `;
}

function renderExerciseCard(lesson, exerciseIndex) {
  const exercise = lesson.exercises[exerciseIndex];
  const stepNumber = 5 + exerciseIndex;
  const answerState = state.answers[`${lesson.id}-${exerciseIndex}`];
  const isDone = (state.progress.completedExercises[lesson.id] || []).includes(exerciseIndex);

  return `
    <article class="interactive-card exercise-card ${isDone ? "completed" : ""}" aria-labelledby="card-heading-ex-${exerciseIndex}">
      <div class="card-badge-row">
        <span class="pill">Passo ${stepNumber} de 9</span>
        <span class="pill neutral">Prática ${exerciseIndex + 1} de 3</span>
        ${isDone ? `<span class="pill" style="background:#dff6eb;color:#15704b">✓ Prática Concluída</span>` : ""}
      </div>
      <h2 id="card-heading-ex-${exerciseIndex}" class="card-title">${escapeHtml(exercise.prompt)}</h2>

      <div class="exercise-body">
        ${
          exercise.type === "choice"
            ? `
          <div class="interactive-choice-grid">
            ${exercise.choices
              .map(
                (choice) => `
              <button class="choice-interactive-btn ${answerState?.selected === choice ? (answerState.correct ? "correct" : "incorrect") : ""}" data-action="submit-choice" data-lesson-id="${lesson.id}" data-index="${exerciseIndex}" data-answer="${escapeHtml(choice)}">
                <span class="choice-bullet">${answerState?.selected === choice ? (answerState.correct ? "✓" : "✗") : "●"}</span>
                <span class="choice-text">${escapeHtml(choice)}</span>
              </button>
            `
              )
              .join("")}
          </div>
        `
            : `
          <form class="interactive-text-form" data-action="submit-text" data-lesson-id="${lesson.id}" data-index="${exerciseIndex}">
            <label for="input-ex-${exerciseIndex}" class="sr-only">Digite sua resposta</label>
            <input id="input-ex-${exerciseIndex}" class="interactive-input" name="answer" placeholder="Digite em inglês..." autocomplete="off" value="${answerState?.text || ""}" />
            <button class="button button-secondary" type="submit">Conferir</button>
          </form>
        `
        }

        ${
          answerState?.feedback
            ? `
          <div class="feedback-banner ${answerState.correct ? "correct" : "incorrect"}" role="status">
            <div class="feedback-icon">${answerState.correct ? "🎉" : "💡"}</div>
            <div>
              <strong>${answerState.correct ? "Muito bem! Resposta correta!" : "Quase lá — veja a orientação:"}</strong>
              <p>${escapeHtml(answerState.correct ? exercise.feedback : exercise.hint)}</p>
            </div>
          </div>
        `
            : ""
        }
      </div>

      <div class="card-footer-action">
        ${
          answerState?.correct || isDone
            ? `
          <button class="button button-primary button-large pulse-animation" data-action="next-step">
            ${exerciseIndex < 2 ? "Próxima Prática →" : "Ir para o Desafio de Montagem →"}
          </button>
        `
            : `
          <button class="button button-quiet" data-action="skip-or-hint" data-hint="${escapeHtml(exercise.hint)}">
            Precisa de ajuda? Ver dica
          </button>
        `
        }
      </div>
    </article>
  `;
}

function renderUnscrambleCard(lesson) {
  const challenge = unscrambleChallenges[lesson.id] || unscrambleChallenges.routines;
  const isDone = state.unscramble.correct;

  return `
    <article class="interactive-card unscramble-card ${isDone ? "completed" : ""}" aria-labelledby="card-heading-unscramble">
      <div class="card-badge-row">
        <span class="pill">Passo 8 de 9</span>
        <span class="pill neutral">Desafio de Estrutura de Frase</span>
      </div>
      <h2 id="card-heading-unscramble" class="card-title">${escapeHtml(challenge.prompt)}</h2>
      <p class="card-subtitle">Toque nas palavras para montar a frase na ordem correta do inglês:</p>

      <div class="sentence-target-area" aria-label="Frase montada">
        ${
          state.unscramble.placed.length === 0
            ? `<span class="placeholder-text">Selecione as palavras abaixo...</span>`
            : state.unscramble.placed
                .map(
                  (item, idx) => `
              <button class="word-chip placed" data-action="unplace-word" data-word-id="${item.id}" data-index="${idx}" aria-label="Remover ${escapeHtml(item.word)}">
                ${escapeHtml(item.word)} ✕
              </button>
            `
                )
                .join("")
        }
      </div>

      <div class="word-bank-area" aria-label="Banco de palavras disponíveis">
        ${state.unscramble.available
          .map(
            (item) => `
          <button class="word-chip bank ${state.unscramble.placed.some((p) => p.id === item.id) ? "used" : ""}" data-action="place-word" data-word-id="${item.id}" ${state.unscramble.placed.some((p) => p.id === item.id) ? "disabled" : ""}>
            ${escapeHtml(item.word)}
          </button>
        `
          )
          .join("")}
      </div>

      <div class="unscramble-actions">
        <button class="button button-secondary" data-action="check-unscramble" ${state.unscramble.placed.length === 0 ? "disabled" : ""}>
          Conferir Ordem
        </button>
        <button class="button button-quiet" data-action="reset-unscramble">
          Limpar e Recomeçar
        </button>
      </div>

      ${
        state.unscramble.checked
          ? `
        <div class="feedback-banner ${state.unscramble.correct ? "correct" : "incorrect"}" role="status">
          <div class="feedback-icon">${state.unscramble.correct ? "🏆" : "⚠️"}</div>
          <div>
            <strong>${state.unscramble.correct ? "Frase perfeita!" : "Ordem incorreta. Vamos tentar de novo!"}</strong>
            <p>${escapeHtml(challenge.explanation)}</p>
          </div>
        </div>
      `
          : ""
      }

      <div class="card-footer-action">
        ${
          isDone
            ? `
          <button class="button button-primary button-large pulse-animation" data-action="next-step">
            Ver Conclusão da Lição →
          </button>
        `
            : `
          <button class="button button-quiet" data-action="next-step">
            Pular para a conclusão
          </button>
        `
        }
      </div>
    </article>
  `;
}

function renderCompletionCard(lesson, nextLesson) {
  // Save completion on reaching the end of the lesson
  if (!state.progress.completedLessons.includes(lesson.id)) {
    state.progress.completedLessons.push(lesson.id);
    saveProgress();
  }

  const isFinalInUnit = !nextLesson || nextLesson.unitId !== lesson.unitId;

  return `
    <article class="interactive-card completion-card" aria-labelledby="card-heading-completion">
      <div class="celebration-badge">🌱 🎉 🚀</div>
      <h2 id="card-heading-completion" class="card-title">Lição Concluída com Sucesso!</h2>
      <p class="card-lead">
        Parabéns! Você completou a lição <strong>${escapeHtml(lesson.title)}</strong> (${lesson.level}).
      </p>

      <div class="completion-summary-box">
        <h3>O que você dominou hoje:</h3>
        <p>✓ <strong>Objetivo alcançado:</strong> ${escapeHtml(lesson.objective)}.</p>
        <p>✓ Prática oral com áudio nativo e vocabulário contextualizado.</p>
        <p>✓ Montagem de frases em ordem natural do idioma.</p>
        <div class="device-note">
          <span class="status-dot"></span> Seu progresso foi salvo com sucesso neste dispositivo.
        </div>
      </div>

      <div class="keep-going-container">
        ${
          nextLesson
            ? `
          <div class="keep-going-hero">
            <span class="keep-going-eyebrow">Próximo Passo no seu ritmo:</span>
            <h3>${escapeHtml(nextLesson.title)} (${nextLesson.unitLevel})</h3>
            <p>${escapeHtml(nextLesson.objective)}</p>
            <button class="button button-primary button-large keep-going-btn" data-action="keep-going" data-next-id="${nextLesson.id}">
              Continuar Aprendendo: Próxima Lição →
            </button>
          </div>
        `
            : `
          <div class="keep-going-hero final-hero">
            <span class="keep-going-eyebrow">🏆 Trilha Concluída!</span>
            <h3>Você completou todas as lições desta etapa!</h3>
            <p>Quer continuar afiando seu inglês sem parar? O modo contínuo gera práticas infinitas com todas as frases aprendidas.</p>
            <button class="button button-primary button-large keep-going-btn" data-action="start-continuous">
              Entrar no Modo Prática Contínua ⚡
            </button>
          </div>
        `
        }

        <div class="completion-secondary-links">
          <button class="button button-secondary" data-action="review-current-lesson">
            ↺ Rever esta lição do início
          </button>
          <a class="button button-quiet" href="index.html">
            Voltar para o Painel Geral
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderContinuousMode() {
  const allExercises = lessons.flatMap((lesson) =>
    lesson.exercises.map((ex, idx) => ({
      ...ex,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      exerciseIndex: idx
    }))
  );

  const currentExercise = allExercises[state.continuousQueueIndex % allExercises.length];
  const answerKey = `continuous-${state.continuousQueueIndex}`;
  const answerState = state.answers[answerKey];

  return `
    <div class="continuous-mode-shell">
      <div class="continuous-header">
        <div class="continuous-title">
          <span class="pill" style="background:#ffefe2;color:#b45309">⚡ Prática Contínua Infinita</span>
          <h2>Keep on Going!</h2>
          <p>Pratique sem parar: exercícios misturados de todas as lições para fixar na memória.</p>
        </div>
        <div class="streak-counter-box">
          <span class="streak-flame" aria-hidden="true">🔥</span>
          <span class="streak-number">${state.continuousStreak}</span>
          <span class="streak-label">Acertos seguidos</span>
        </div>
        <button class="button button-quiet" data-action="exit-continuous">
          ← Voltar para as Lições
        </button>
      </div>

      <article class="interactive-card exercise-card">
        <div class="card-badge-row">
          <span class="pill neutral">Origem: ${escapeHtml(currentExercise.lessonTitle)}</span>
          <span class="pill neutral">Questão #${state.continuousQueueIndex + 1}</span>
        </div>
        <h2 class="card-title">${escapeHtml(currentExercise.prompt)}</h2>

        <div class="exercise-body">
          ${
            currentExercise.type === "choice"
              ? `
            <div class="interactive-choice-grid">
              ${currentExercise.choices
                .map(
                  (choice) => `
                <button class="choice-interactive-btn ${answerState?.selected === choice ? (answerState.correct ? "correct" : "incorrect") : ""}" data-action="continuous-choice" data-answer="${escapeHtml(choice)}">
                  <span class="choice-bullet">${answerState?.selected === choice ? (answerState.correct ? "✓" : "✗") : "●"}</span>
                  <span class="choice-text">${escapeHtml(choice)}</span>
                </button>
              `
                )
                .join("")}
            </div>
          `
              : `
            <form class="interactive-text-form" data-action="continuous-text">
              <input class="interactive-input" name="answer" placeholder="Digite em inglês..." autocomplete="off" value="${answerState?.text || ""}" />
              <button class="button button-secondary" type="submit">Conferir</button>
            </form>
          `
          }

          ${
            answerState?.feedback
              ? `
            <div class="feedback-banner ${answerState.correct ? "correct" : "incorrect"}" role="status">
              <div class="feedback-icon">${answerState.correct ? "🎉" : "💡"}</div>
              <div>
                <strong>${answerState.correct ? "Correto! Muito bom!" : "Tente lembrar:"}</strong>
                <p>${escapeHtml(answerState.correct ? currentExercise.feedback : currentExercise.hint)}</p>
              </div>
            </div>
          `
              : ""
          }
        </div>

        <div class="card-footer-action">
          ${
            answerState?.checked
              ? `
            <button class="button button-primary button-large pulse-animation" data-action="continuous-next">
              Próxima Questão → (Continue praticando!)
            </button>
          `
              : ""
          }
        </div>
      </article>
    </div>
  `;
}

export function submitChoiceAnswer(lessonId, index, answer) {
  const lesson = getLesson(lessonId);
  const exercise = lesson.exercises[index];
  const correct = normalizeAnswer(answer) === normalizeAnswer(exercise.answer);

  state.answers[`${lessonId}-${index}`] = {
    feedback: true,
    correct,
    selected: answer
  };

  if (correct) {
    speak(answer);
    const current = state.progress.completedExercises[lessonId] || [];
    if (!current.includes(index)) current.push(index);
    state.progress.completedExercises[lessonId] = current;
    saveProgress();
  }
  renderInteractive();
}

export function submitTextAnswer(lessonId, index, answer) {
  const lesson = getLesson(lessonId);
  const exercise = lesson.exercises[index];
  const normalized = normalizeAnswer(answer);
  const accepted = (exercise.answers || []).map(normalizeAnswer);
  const correct = normalized && accepted.includes(normalized);

  state.answers[`${lessonId}-${index}`] = {
    feedback: true,
    correct,
    text: answer
  };

  if (correct) {
    speak(answer);
    const current = state.progress.completedExercises[lessonId] || [];
    if (!current.includes(index)) current.push(index);
    state.progress.completedExercises[lessonId] = current;
    saveProgress();
  }
  renderInteractive();
}

function submitContinuousChoice(answer) {
  const allExercises = lessons.flatMap((l) => l.exercises);
  const current = allExercises[state.continuousQueueIndex % allExercises.length];
  const correct = normalizeAnswer(answer) === normalizeAnswer(current.answer);

  if (correct) {
    state.continuousStreak++;
    speak(answer);
  } else {
    state.continuousStreak = 0;
  }

  state.answers[`continuous-${state.continuousQueueIndex}`] = {
    checked: true,
    feedback: true,
    correct,
    selected: answer
  };
  renderInteractive();
}

function submitContinuousText(answer) {
  const allExercises = lessons.flatMap((l) => l.exercises);
  const current = allExercises[state.continuousQueueIndex % allExercises.length];
  const normalized = normalizeAnswer(answer);
  const accepted = (current.answers || []).map(normalizeAnswer);
  const correct = normalized && accepted.includes(normalized);

  if (correct) {
    state.continuousStreak++;
    speak(answer);
  } else {
    state.continuousStreak = 0;
  }

  state.answers[`continuous-${state.continuousQueueIndex}`] = {
    checked: true,
    feedback: true,
    correct,
    text: answer
  };
  renderInteractive();
}

function bindEvents() {
  if (typeof document === "undefined") return;

  document.querySelectorAll("[data-action]").forEach((el) => {
    el.addEventListener("click", handleAction);
  });

  const select = document.querySelector('select[data-action="change-lesson"]');
  if (select) {
    select.addEventListener("change", (e) => {
      state.selectedLessonId = e.target.value;
      state.stepIndex = 0;
      initUnscramble();
      renderInteractive();
    });
  }

  document.querySelectorAll('form[data-action="submit-text"]').forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      submitTextAnswer(form.dataset.lessonId, Number(form.dataset.index), input.value);
    });
  });

  document.querySelectorAll('form[data-action="continuous-text"]').forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      submitContinuousText(input.value);
    });
  });

  // Topbar audio toggle buttons
  const toggleAudioBtn = document.querySelector("#toggle-audio-btn");
  if (toggleAudioBtn && !toggleAudioBtn.dataset.bound) {
    toggleAudioBtn.dataset.bound = "true";
    toggleAudioBtn.addEventListener("click", () => {
      state.audioEnabled = !state.audioEnabled;
      toggleAudioBtn.querySelector(".control-text").textContent = state.audioEnabled
        ? "Áudio Ativo"
        : "Áudio Mudo";
      toggleAudioBtn.querySelector(".control-icon").textContent = state.audioEnabled ? "🔊" : "🔇";
    });
  }

  const speedAudioBtn = document.querySelector("#speed-audio-btn");
  if (speedAudioBtn && !speedAudioBtn.dataset.bound) {
    speedAudioBtn.dataset.bound = "true";
    speedAudioBtn.addEventListener("click", () => {
      state.speechRate = state.speechRate === 1.0 ? 0.8 : 1.0;
      speedAudioBtn.querySelector(".control-text").textContent = `Velocidade: ${state.speechRate}x`;
    });
  }
}

function handleAction(event) {
  const el = event.currentTarget;
  const action = el.dataset.action;

  if (action === "switch-unit") {
    state.selectedUnitId = el.dataset.unitId;
    const firstLesson = lessons.find((l) => l.unitId === state.selectedUnitId);
    if (firstLesson) {
      state.selectedLessonId = firstLesson.id;
      state.stepIndex = 0;
      initUnscramble();
    }
    renderInteractive();
    return;
  }

  if (action === "next-step") {
    if (state.stepIndex < TOTAL_STEPS) {
      state.stepIndex++;
      renderInteractive();
    }
    return;
  }

  if (action === "prev-step") {
    if (state.stepIndex > 0) {
      state.stepIndex--;
      renderInteractive();
    }
    return;
  }

  if (action === "speak-text") {
    speak(el.dataset.text);
    return;
  }

  if (action === "play-full-dialogue") {
    const lesson = getLesson(state.selectedLessonId);
    let delay = 0;
    lesson.dialogue.forEach((line) => {
      setTimeout(() => speak(line.text), delay);
      delay += 2400;
    });
    return;
  }

  if (action === "toggle-dialogue-trans") {
    state.showDialogueTranslations = !state.showDialogueTranslations;
    renderInteractive();
    return;
  }

  if (action === "submit-choice") {
    submitChoiceAnswer(el.dataset.lessonId, Number(el.dataset.index), el.dataset.answer);
    return;
  }

  if (action === "place-word") {
    const wordId = el.dataset.wordId;
    const item = state.unscramble.available.find((w) => w.id === wordId);
    if (item && !state.unscramble.placed.some((p) => p.id === wordId)) {
      state.unscramble.placed.push(item);
      state.unscramble.checked = false;
      renderInteractive();
    }
    return;
  }

  if (action === "unplace-word") {
    const idx = Number(el.dataset.index);
    state.unscramble.placed.splice(idx, 1);
    state.unscramble.checked = false;
    renderInteractive();
    return;
  }

  if (action === "check-unscramble") {
    const challenge = unscrambleChallenges[state.selectedLessonId];
    const assembled = state.unscramble.placed.map((p) => p.word).join(" ");
    const correct = assembled === challenge.target;
    state.unscramble.checked = true;
    state.unscramble.correct = correct;
    if (correct) {
      speak(challenge.target);
    }
    renderInteractive();
    return;
  }

  if (action === "reset-unscramble") {
    initUnscramble();
    renderInteractive();
    return;
  }

  if (action === "skip-or-hint") {
    alert(el.dataset.hint);
    return;
  }

  if (action === "keep-going") {
    const nextId = el.dataset.nextId;
    if (nextId) {
      state.selectedLessonId = nextId;
      const lesson = getLesson(nextId);
      state.selectedUnitId = lesson.unitId;
      state.stepIndex = 0;
      initUnscramble();
      renderInteractive();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  if (action === "review-current-lesson") {
    state.stepIndex = 0;
    initUnscramble();
    renderInteractive();
    return;
  }

  if (action === "toggle-continuous" || action === "start-continuous") {
    state.continuousMode = true;
    state.continuousQueueIndex = 0;
    renderInteractive();
    return;
  }

  if (action === "exit-continuous") {
    state.continuousMode = false;
    renderInteractive();
    return;
  }

  if (action === "continuous-choice") {
    submitContinuousChoice(el.dataset.answer);
    return;
  }

  if (action === "continuous-next") {
    state.continuousQueueIndex++;
    renderInteractive();
    return;
  }
}

// Initial bootstrap
initInitialLesson();
renderInteractive();
