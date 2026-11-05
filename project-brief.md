---
title: "Project: Learning English with Portuguese"
type: project
status: active
priority: medium
startDate: 2026-11-03
targetDate: TBD
owner: "User"
tags:
  - project
  - language-learning
  - web-app
---

# Project: Learning English with Portuguese

## 1. Project Overview & Desired Outcome
- **Goal:** Create a responsive web app that teaches English to Portuguese-speaking learners through structured, interactive lessons with relevant embedded videos and practice in every lesson.
- **Success Criteria:** A learner can open the app on a phone or desktop, choose a lesson, learn a clearly stated English objective with Portuguese-language support, watch an aligned video when available, complete exercises with helpful feedback, and see saved progress.

## 2. Linked SOPs & Guidelines
When building this project, follow:
- [[03_SOPs_and_Instructions/Coding_and_Dev/sop.feature-implementation|Feature Implementation SOP]]
- [[instructions|Detailed Build Prompt]]

## 3. Key Milestones & Deliverables
- [x] Milestone 1: Product requirements, course structure, and lesson content model
- [x] Milestone 2: Responsive learning experience and initial English-for-Portuguese course (A1 & A1+)
- [x] Milestone 3: Practice, feedback, video embeds, progress saving, and accessibility review
- [x] Milestone 4: Dedicated interactive lesson flow (Keep-on-Going mode) and multi-page navigation
- [x] Milestone 5: Testing, documentation, and release-ready app

## 4. Work Breakdown & Action Items
- [x] Inspect the existing repository and document its framework, run commands, and constraints.
- [x] Build the responsive lesson experience and navigation.
- [x] Add an initial beginner course (A1) and next-step unit (A1+), with explanations and translations suitable for Portuguese speakers.
- [x] Add aligned video resources and exercises to every lesson.
- [x] Add progress persistence and test important user flows on mobile and desktop sizes.
- [x] Build dedicated interactive learning page (`interactive.html`) featuring card-by-card progression, native voice pronunciation, sentence unscramble puzzles, and auto-advancing "Keep on Going" flow.

## 5. Notes & Decisions Log
- **2026-11-03:** Initial product direction: English is the target language; Portuguese is the learner's first language. Support Portuguese variants where practical and avoid assuming whether the learner uses Brazilian or European Portuguese.
- **2026-11-05:** Added Unit 2 ("Mais inglês no dia a dia", A1+) as the next step above foundation lessons. Implemented dedicated interactive mode (`interactive.html`) with speech synthesis, sentence builder, and uninterrupted continuous practice flow.
