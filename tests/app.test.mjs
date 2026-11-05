import assert from "node:assert/strict";

const main = { innerHTML: "" };
const localStorageValues = new Map();
const actionListeners = new Map();

function findActionElements() {
  return Array.from(main.innerHTML.matchAll(/<(button|form)\b([^>]*\bdata-action="[^"]*"[^>]*)>/g), (match) => {
    const dataset = Object.fromEntries(
      Array.from(match[2].matchAll(/\sdata-([a-z-]+)="([^"]*)"/g), (attribute) => [
        attribute[1].replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
        attribute[2]
      ])
    );
    const listenerKey = `${dataset.action}:${dataset.lessonId || ""}:${dataset.index || ""}:${dataset.answer || ""}`;
    return {
      dataset,
      addEventListener(name, listener) {
        if (name === "click") actionListeners.set(listenerKey, listener);
      },
      click() {
        actionListeners.get(listenerKey)?.({ currentTarget: this });
      }
    };
  });
}

globalThis.document = {
  querySelector(selector) {
    if (selector === "#main-content") return main;
    if (selector !== ".resource-unavailable") return null;
    const placeholder = main.innerHTML.match(/<div class="resource-unavailable">[\s\S]*?<\/div>/);
    if (!placeholder) return null;
    return {
      set outerHTML(resourceHtml) {
        main.innerHTML = main.innerHTML.replace(placeholder[0], resourceHtml);
      }
    };
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

await import("../app.js");

assert.match(main.innerHTML, /Mais inglês no dia a dia/);
assert.match(main.innerHTML, /10 lições/);
assert.equal((main.innerHTML.match(/class="lesson-card /g) || []).length, 10);

const routinesButton = findActionElements().find((element) =>
  element.dataset.action === "open-lesson" && element.dataset.lessonId === "routines"
);
assert.ok(routinesButton);
routinesButton.click();

assert.match(main.innerHTML, /My daily routine/);
assert.match(main.innerHTML, /Sugestão de vídeo · revisão pendente/);
assert.match(main.innerHTML, /youtube-nocookie\.com\/embed\/mrcLQA8wPJU/);

const correctChoice = findActionElements().find((element) =>
  element.dataset.action === "answer-choice" && element.dataset.answer === "goes"
);
assert.ok(correctChoice);
correctChoice.click();
assert.match(main.innerHTML, /Muito bem!/);

console.log("Validated dashboard, A1+ lesson rendering, video embed, and answer feedback.");
