---
title: Detailed Build Prompt — Learning English with Portuguese
type: sop
tags:
  - project/learning-english-portuguese
  - web-app
  - language-learning
  - prompt
updated: 2026-11-05
---

# Detailed Build Prompt: Learning English with Portuguese

## Prompt for the implementation bot

Act as a careful product engineer and language-learning experience designer. Build a usable, responsive web application that teaches **English to learners whose first language is Portuguese**. The first release is a practical, beginner-friendly learning experience for mobile phones and desktop computers.

The user may not know programming or language-learning terminology. Keep the product understandable without technical knowledge. Do not treat Portuguese as the target language: **English is the language being learned; Portuguese is the learner's support language.**

## 1. Work with the existing project first

1. Inspect the current repository, its instructions, existing framework, package manager, available scripts, tests, and current UI before changing anything.
2. Follow the repository's existing conventions and preserve unrelated user work. Do not replace the project with a new scaffold if a working app already exists.
3. If the repository is empty, choose a small, well-supported web stack appropriate to the environment, explain the choice briefly, and provide exact setup/run instructions.
4. Before implementation, summarize the proposed screens, data model, and key assumptions. If a necessary product decision cannot be safely inferred, ask the project owner. Otherwise use the defaults in this prompt and continue.
5. Implement in small, working increments. Run the existing tests and the relevant build, lint, and type-check commands. Add focused tests for the features introduced.
6. Do not claim a feature, video, test, or accessibility behavior works unless you have verified it.

## 2. Product goal and intended learner

Create a guided, interactive course for Portuguese-speaking beginners learning English. The app should help learners understand, remember, and use English in everyday situations rather than merely memorize translations.

### Learner assumptions

- The learner may be a complete beginner in English and may be using the app without a teacher.
- The learner may use Brazilian Portuguese or European Portuguese. Do not assume one dialect as universal. Use broadly understandable Portuguese in shared explanations, flag vocabulary/pronunciation variants when meaningful, and provide a way to select or identify the learner's Portuguese variant if the app asks for it.
- The learner may use a small phone screen, have limited bandwidth, use assistive technology, or prefer to study without audio.
- Teach one manageable objective at a time. Introduce jargon only when needed and explain it in ordinary language.

### Learning approach

- Organize course levels using CEFR labels where appropriate, starting with A1 foundations. Do not imply formal certification or guarantee proficiency.
- Present English examples first, with concise Portuguese support. Gradually reduce translation only as lessons become more challenging; never make a beginner guess what instructions mean.
- Teach vocabulary and grammar in useful contexts: greetings, introductions, daily needs, common questions, and simple conversations.
- Explicitly contrast English and Portuguese only when it helps prevent a likely confusion. Examples may cover word order, articles, pronouns, do/does, the verb “to be,” pronunciation, false friends, and sounds that differ between varieties of Portuguese.
- Distinguish spelling, meaning, grammar, and pronunciation. Do not teach an inaccurate one-to-one pronunciation mapping.
- Use inclusive, adult-respectful examples. Avoid childish tone unless a future audience specifically requests a children's course.
- Support retrieval practice: learners should recall or produce language, not only reread explanations.
- Use encouraging, specific feedback. Do not shame learners or describe a wrong answer as a personal failure.

## 3. MVP scope

Build a complete first learning experience, not just a landing page or mockup.

### Required MVP features

1. **Home / course dashboard**
   - Explain in plain language what the app teaches.
   - Show the first course, level, units, lessons, completion states, and a clear “continue learning” action.
   - Let a new learner start without creating an account.

2. **Course and lesson navigation**
   - Display a simple ordered path from lessons to units.
   - Show what is completed, in progress, and not yet started.
   - Make navigation usable by touch, keyboard, and screen reader.

3. **Lesson experience**
   - Show lesson title, level, estimated study time, objective, prerequisite if any, and progress within the lesson.
   - Present the teaching content in short, ordered sections, not one dense wall of text.
   - Include English examples and Portuguese explanations/translations.
   - Include pronunciation support as text and, where available and rights allow, audio. Audio must have a written alternative.
   - Include one relevant embedded video/resource where a verified, appropriate resource is available. If no suitable resource is available, show an honest “video coming soon” or equivalent state; do not invent a URL or embed a video unrelated to the objective.
   - Include practice questions in every lesson and a clear lesson completion state.

4. **Practice and feedback**
   - Implement a small set of reusable exercise types suitable for the MVP: multiple choice, fill in the blank, sentence ordering, and short translation or response entry.
   - Include at least three meaningful practice items in each seed lesson, using more than one exercise type where it fits the lesson.
   - Give immediate, kind feedback. Explain why an answer is correct or incorrect in simple Portuguese, show a hint or example where useful, and allow another attempt when appropriate.
   - Do not expose the correct answer before the learner responds. Provide a clear way to continue after feedback.
   - Accept reasonable capitalization and punctuation variations where they do not change the learning objective. Avoid brittle exact-string checks for open answers; use explicit acceptable-answer lists or a more suitable evaluation design.

5. **Progress and review**
   - Save lesson completion and basic practice progress on the device so it remains after refresh/reopen.
   - Make clear that MVP progress is stored on this device and will not sync to another device unless a backend/account feature is deliberately added.
   - Provide a useful review state for missed or previously practiced items, without pretending a simple local score is a validated measure of language proficiency.
   - Keep progress storage behind a small interface so a future backend can replace local storage without rewriting lesson components.

6. **Responsive design**
   - Work at common phone, tablet, and desktop sizes without horizontal scrolling.
   - Make the primary learning action easy to reach on a phone. Keep text readable and controls large enough for touch.
   - On larger screens, use available space for course navigation and lesson content without making line lengths uncomfortable.
   - Respect reduced-motion preferences. Do not use motion as the only way to communicate state.

### Out of scope for the first release

Do not add paid subscriptions, advertising, social feeds, live tutoring, certificates, an AI chat tutor, speech grading, multiplayer, or user accounts unless the owner explicitly expands the scope. Do not claim automated speech recognition or pronunciation scoring unless implemented and tested with suitable privacy disclosures.

## 4. Initial course content

Seed a small but coherent first course instead of an empty product shell. Create at least one A1 beginner unit with **five complete lessons**. Use these as initial lesson themes, adjusting titles or order if needed for a sound progression:

1. Greetings and polite expressions.
2. Introducing yourself and saying your name/country.
3. Subject pronouns and simple “I am / you are” statements with the verb “to be.”
4. Asking and answering simple personal-information questions.
5. Everyday needs and polite requests in a short conversation.

For each lesson, supply:

- A short title, level, estimated time, and one measurable learning objective.
- Prerequisite/sequence metadata.
- A warm-up or recall question connected to earlier material.
- A brief explanation in simple Portuguese and clear English examples.
- At least five useful vocabulary or phrase items when appropriate, with meaning, context, and pronunciation guidance where helpful.
- A contextual dialogue or reading passage that uses the lesson's language.
- At least three practice items, answer data, hints, and feedback explanations.
- A short wrap-up and completion action.
- A video/resource record matching the lesson objective, or an explicit unavailable state.

Content must be fact-checked for natural English, accurate Portuguese meaning, and the intended CEFR level. Mark dialect variants where they matter. Avoid misleading literal translations. Ensure exercises have unambiguous answers or clearly stated acceptable alternatives.

### Next increment: learner has completed the first five lessons

Treat the five lessons in “Primeiros encontros” as the learner's completed foundation. Keep them available for review and preserve their lesson IDs, prerequisite links, and saved progress. Extend the existing course rather than replacing its content or redesigning its dashboard and lesson layout.

Add a second, ordered unit called “Mais inglês no dia a dia” at A1+ (a gentle bridge toward A2, not a hard intermediate course). Use these practical topics, in this order:

1. Daily routines: present simple, common routine verbs, and usually/sometimes.
2. Finding your way: ask where a place is and follow two short direction instructions.
3. Shopping for clothes: ask a price, request a size, and ask to try something on.
4. The last weekend: describe a couple of completed activities with regular past verbs and a few common irregular forms.
5. Weekend plans: describe a near-future plan with be going to.

Build from known phrases and introduce one manageable new pattern per lesson. Keep explanations in accessible Portuguese, use everyday adult contexts, and include at least three short retrieval-practice questions with kind feedback. Each lesson needs a measurable objective, warm-up, vocabulary with translations and pronunciation guidance, contextual dialogue, wrap-up, and prerequisites that follow the sequence above. Do not make the learner repeat the same beginner activities as new content.

Preserve the current visual structure and navigation, grouping lessons by unit where useful. Make lesson totals, progress, and navigation work for both units; do not hardcode the original five-lesson count. Keep the existing local-progress storage key and old lesson IDs so completed work remains recorded. Do not mark new lessons complete by default.

## 5. Video and media requirements

Videos must support the lesson objective; they are not decoration. Each video or external learning resource must be reviewed for:

- Direct relevance to the specific lesson's vocabulary, grammar, listening skill, or real-life context.
- Appropriate beginner difficulty, length, language, and audience.
- Available captions/subtitles or a written summary/transcript alternative. Provide a Portuguese explanation of the task even if the video is in English.
- Source, title, provider, original URL, and any usage/license notes stored with the lesson data.
- A working embed URL from the original provider. Never fabricate URLs, claim to have watched a video that was not reviewed, download or rehost third-party content, or copy protected transcripts without permission.

Use only resources that can lawfully be embedded and are appropriate for the app. Prefer creator-approved, openly licensed, or otherwise explicitly embeddable resources. If external resources cannot be verified during implementation, include a clearly labeled editable placeholder data entry and make the UI display the honest unavailable state; do not present a fake resource as real.

For the new A1+ unit, provide one topic-matched video suggestion per lesson when a real candidate can be identified. Before calling it reviewed/verified, inspect the actual video or reliable provider information for lesson fit and difficulty, check caption availability and embedding, and record the source, title, provider, original URL, embed URL, review date, and a Portuguese listening task. Metadata or a search-result title alone is not proof that the video content, captions, or embed work. If those checks cannot be completed, label it clearly as a pending candidate (not verified) or use the unavailable state; do not claim a video was watched. Keep the lesson dialogue/explanation as the written alternative, and never require video playback for completion.

### Embed experience

- Do not autoplay video or audio.
- Make embeds responsive and provide a descriptive title for assistive technology.
- Provide a direct link to open the resource at its provider, plus a short Portuguese instruction explaining what to listen/look for.
- Use a privacy-conscious embed option where the provider supports one. Do not load third-party embed scripts until needed or until the learner activates the video, where technically practical.
- If an embed is blocked, unavailable, or fails to load, show a useful fallback link and lesson alternative rather than a broken blank rectangle.
- Do not make lesson completion depend on an unavailable third-party video.

## 6. Suggested content model

Use typed, validated data structures appropriate to the repository's language. Keep lesson content separate from presentation so lessons can be corrected or added without rewriting the learning UI.

Conceptually, model:

- **Course:** title, target language, learner-support language, level, description, ordered units.
- **Unit:** title, order, summary, ordered lessons.
- **Lesson:** stable ID, title, level, order, estimated minutes, objective, prerequisites, explanation sections, examples, vocabulary, dialogue, video/resource state, exercises, and wrap-up.
- **Exercise:** stable ID, type, prompt, optional context/media, choices or accepted answers, answer, hint, feedback, and points or completion state if used.
- **Video/resource:** provider, title, source URL, embed URL, lesson objective match, duration if known, caption/transcript availability, rights/license note, and verification state.
- **Learner progress:** lesson status, completed exercise IDs, attempts or review-needed state, and last activity date. Store only what the MVP needs.

Validate seed content at startup/build/test time where feasible. Catch missing lesson objectives, empty exercises, duplicate IDs, invalid answer references, and a video marked “verified” without a source URL. Do not silently substitute fake/default lesson content when data is invalid.

## 7. UX and visual direction

- Create a calm, focused learning environment. Use a clear visual hierarchy, consistent spacing, restrained color, and a small set of reusable components.
- The default UI language should be Portuguese for explanations and navigation, while lesson examples teach English. If adding a UI-language selector, ensure it does not accidentally change the course target language.
- Label buttons with specific actions such as “Começar lição,” “Ver dica,” and “Continuar”; avoid unexplained icons.
- Show progress in plain language, such as “Lesson 2 of 5” and “3 of 4 exercises completed.” Do not rely on color alone.
- Indicate correct/incorrect answers with text and accessible visual cues. Announce dynamically changing feedback to assistive technology.
- Support keyboard navigation and visible focus indicators. Use semantic headings, buttons, form labels, and landmarks.
- Ensure readable contrast, scalable text, meaningful image alternatives, and accessible form validation.
- Avoid decorative complexity that distracts from practice. Do not use flags as the only indicator of language or locale.
- Include empty, loading, saved, error, and unavailable-video states. Explain what the learner can do next.

## 8. Technical and privacy requirements

- Follow the repository's established framework and dependencies. Avoid adding large dependencies for features that can be handled simply with existing tools.
- Use semantic HTML and responsive CSS. Keep business logic, lesson data, and UI components reasonably separated.
- Write code for human readers, including project owners who may be new to programming. Use the repository's formatter and established style; keep indentation, spacing, and line breaks consistent. Never minify, compress, or put an entire component, function, or file on one long line to save space.
- Keep functions focused and readable. Break long render functions and dense conditionals into clearly named helper functions or smaller components where that improves understanding. Use descriptive names, sensible whitespace, and comments only when they explain non-obvious intent. Do not sacrifice clarity just to reduce the number of files or lines.
- Make changes in small, reviewable patches. Before editing, locate and read the exact code to change. If a patch fails to match, do not report the feature as fixed: reread the current code, make a new targeted edit using the actual surrounding text, and inspect the resulting diff. Never replace a large section or rewrite a whole file merely because a small patch did not apply.
- After editing, inspect the changed code in its formatted form and run the project's formatter/checks when available. Fix any newly introduced formatting or readability problems before considering the work complete.
- Handle malformed lesson data and storage failures with visible, understandable errors. Do not silently lose progress or display success after a failed save.
- Treat all lesson text and video URLs as data, not executable markup. Sanitize or safely render any content that could contain HTML.
- Do not collect personal information, analytics, or location in the MVP. Do not send learner answers or progress to external services.
- If browser storage is unavailable or disabled, explain that progress may not persist and let the learner continue the lesson.
- Do not put credentials, private API keys, or secrets in client-side code.

### Honest implementation status

- Report only changes that were actually applied and verified. A planned change, attempted patch, or explanation of a likely fix is not a completed fix.
- If an edit fails, tests cannot run, or verification is incomplete, say so plainly and identify what remains unchanged or unverified. For example: “The patch did not apply, so the Continue button is still not fixed.”
- Never say “fixed,” “complete,” “working,” or “tests pass” unless the relevant code change is present and the appropriate behavior/check has been verified.
- Before summarizing completion, inspect the final diff and run the most relevant test or manual check. If a change cannot be verified in the current environment, label it as unverified rather than implying success.

## 9. Testing and acceptance criteria

Add focused automated tests using the repository's test framework. At minimum verify:

- The app loads without runtime errors and displays the course dashboard.
- Every seed lesson has an objective, learning content, at least three valid exercises, and an honest video/resource status.
- A learner can enter a lesson, submit an answer, receive appropriate feedback, retry/continue, and complete the lesson.
- Invalid answers and empty input do not crash the app or incorrectly mark an exercise correct.
- Progress is saved and restored on the same device; storage failure is handled clearly.
- Course navigation accurately reflects completed and incomplete lessons.
- An unavailable video produces the fallback state and does not block learning.
- Keyboard users can reach and operate navigation, answer controls, feedback, and lesson actions.
- Layout remains usable at narrow mobile and wide desktop viewports.

Before calling the MVP complete:

1. Run the repository's relevant test, lint, type-check, and production-build commands.
2. Manually test a complete lesson from the dashboard through completion at phone and desktop sizes.
3. Verify that every video/resource shown as verified is real, relevant, embeddable, and documented; otherwise show the unavailable state.
4. Check for console errors, broken links, horizontal overflow, inaccessible controls, and misleading learning/progress claims.
5. Update the project README or equivalent with exact setup, run, test, and content-editing instructions.
6. Report what is implemented, which checks passed, any known limitations, and any resource placeholders that still need human review.

## 10. Definition of done

The MVP is done only when a Portuguese-speaking beginner can use the responsive app to complete the seeded course's lessons, practice every lesson with understandable feedback, access a relevant verified video or a truthful fallback, and revisit locally saved progress. The app must build and its relevant automated checks must pass. Do not call a static design, empty scaffold, or unverified video list a completed learning product.
