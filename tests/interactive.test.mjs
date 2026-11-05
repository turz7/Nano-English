import assert from "node:assert/strict";

const appContainer = { innerHTML: "" };
const localStorageValues = new Map();
const actionListeners = new Map();

function findActionElements() {
  return Array.from(appContainer.innerHTML.matchAll(/<(button|form|select)\b([^>]*\bdata-action="[^"]*"[^>]*)>/g), (match) => {
    const dataset = Object.fromEntries(
      Array.from(match[2].matchAll(/\sdata-([a-z-]+)="([^"]*)"/g), (attribute) => [
        attribute[1].replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
        attribute[2]
      ])
    );
    const listenerKey = `${dataset.action}:${dataset.lessonId || ""}:${dataset.index || ""}:${dataset.answer || ""}:${dataset.wordId || ""}:${dataset.nextId || ""}`;
    return {
      dataset,
      addEventListener(name, listener) {
        if (name === "click" || name === "submit" || name === "change") {
          actionListeners.set(listenerKey, listener);
        }
      },
      click() {
        actionListeners.get(listenerKey)?.({ currentTarget: this, preventDefault() {} });
      }
    };
  });
}

globalThis.window = {
  location: { search: "?lesson=routines" },
  scrollTo() {}
};

globalThis.document = {
  querySelector(selector) {
    if (selector === "#interactive-app") return appContainer;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === "[data-action]") return findActionElements();
    return [];
  },
  addEventListener() {}
};

globalThis.localStorage = {
  getItem(key) {
    return localStorageValues.get(key) || null;
  },
  setItem(key, value) {
    localStorageValues.set(key, value);
  }
};

const module = await import("../interactive.js");
const { state, lessons, renderInteractive, unscrambleChallenges, submitChoiceAnswer } = module;

assert.ok(lessons.length === 10, "Should have 10 lessons in total");
assert.equal(state.selectedLessonId, "routines", "Should select routines based on URL param");
assert.equal(state.stepIndex, 0, "Should start at step 0 (warmup)");

// 1. Initial Warmup Render
assert.match(appContainer.innerHTML, /My daily routine/);
assert.match(appContainer.innerHTML, /Momento de Aquecimento/);
assert.match(appContainer.innerHTML, /Começar Lição Interativa →/);

// 2. Advance to Step 1: Vocabulary & Audio
state.stepIndex = 1;
renderInteractive();
assert.match(appContainer.innerHTML, /Vocabulário &amp; Pronúncia|Vocabulário & Pronúncia/);
assert.match(appContainer.innerHTML, /I wake up at seven/);
assert.match(appContainer.innerHTML, /🔊/);

// 3. Advance to Step 2: Dialogue
state.stepIndex = 2;
renderInteractive();
assert.match(appContainer.innerHTML, /Diálogo em Contexto/);
assert.match(appContainer.innerHTML, /What time do you start work\?/);

// 4. Advance to Step 3: Resource / Video
state.stepIndex = 3;
renderInteractive();
assert.match(appContainer.innerHTML, /Recurso Complementar em Vídeo/);
assert.match(appContainer.innerHTML, /youtube-nocookie\.com\/embed\/mrcLQA8wPJU/);

// 5. Advance to Step 4: Exercise 1
state.stepIndex = 4;
renderInteractive();
assert.match(appContainer.innerHTML, /Complete: She ___ to work at eight/);

// 6. Test submitting an answer in interactive exercise
submitChoiceAnswer("routines", 0, "goes");
assert.match(appContainer.innerHTML, /Muito bem! Resposta correta!/);
assert.match(appContainer.innerHTML, /Próxima Prática →/);

// 7. Advance to Step 7: Sentence Unscramble Challenge
state.stepIndex = 7;
renderInteractive();
assert.match(appContainer.innerHTML, /Desafio de Estrutura de Frase/);
assert.ok(unscrambleChallenges.routines);
assert.equal(unscrambleChallenges.routines.target, "I usually wake up at seven.");

// Test unscramble assembly
state.unscramble.placed = unscrambleChallenges.routines.words.map((w, idx) => ({ id: `${w}-${idx}`, word: w }));
state.unscramble.checked = true;
state.unscramble.correct = true;
renderInteractive();
assert.match(appContainer.innerHTML, /Frase perfeita!/);
assert.match(appContainer.innerHTML, /Ver Conclusão da Lição →/);

// 8. Advance to Step 8: Completion & "Keep On Going"
state.stepIndex = 8;
renderInteractive();
assert.match(appContainer.innerHTML, /Lição Concluída com Sucesso!/);
assert.match(appContainer.innerHTML, /Continuar Aprendendo: Próxima Lição →/);
assert.match(appContainer.innerHTML, /Finding your way/);

// Verify localStorage recorded the lesson as complete
const savedData = JSON.parse(localStorageValues.get("brightpath-english-progress-v1"));
assert.ok(savedData.completedLessons.includes("routines"), "Lesson routines must be saved in localStorage");

// 9. Test "Keep On Going" transition into next lesson
state.selectedLessonId = "directions";
state.stepIndex = 0;
renderInteractive();
assert.equal(state.selectedLessonId, "directions");
assert.match(appContainer.innerHTML, /Finding your way/);
assert.match(appContainer.innerHTML, /Passo 1 de 9/);

// 10. Test Continuous Mode ("Keep on Going" endless queue)
state.continuousMode = true;
state.continuousStreak = 3;
renderInteractive();
assert.match(appContainer.innerHTML, /Prática Contínua Infinita/);
assert.match(appContainer.innerHTML, /Keep on Going!/);
assert.match(appContainer.innerHTML, /3/);
assert.match(appContainer.innerHTML, /Acertos seguidos/);

console.log("Validated interactive lesson flow, step progression, audio cues, sentence unscramble, and keep-on-going transitions.");
