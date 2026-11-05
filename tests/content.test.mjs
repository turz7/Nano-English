import assert from "node:assert/strict";
import { course, validateCourse } from "../content.js";

assert.equal(validateCourse(course), true);
const lessons = course.units.flatMap((unit) => unit.lessons);
assert.equal(course.units.length, 2);
assert.equal(lessons.length, 10);
for (const lesson of lessons) {
  assert.ok(lesson.objective);
  assert.ok(lesson.explanation);
  assert.ok(lesson.vocabulary.length >= 5);
  assert.ok(lesson.dialogue.length >= 2);
  assert.ok(lesson.exercises.length >= 3);
  assert.ok(["reviewed", "candidate"].includes(lesson.resource.status));
  assert.match(lesson.resource.sourceUrl, /^https:\/\/www\.youtube\.com\/watch\?v=/);
  assert.match(lesson.resource.embedUrl, /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
  assert.ok(lesson.resource.objectiveMatch);
  assert.ok(lesson.resource.captions);
}

const nextUnit = course.units[1];
assert.equal(nextUnit.level, "A1+");
assert.deepEqual(nextUnit.lessons.map((lesson) => lesson.id), [
  "routines",
  "directions",
  "shopping-next",
  "past-weekend",
  "future-plans"
]);
assert.deepEqual(nextUnit.lessons.map((lesson) => lesson.prerequisites[0]), [
  "needs",
  "routines",
  "directions",
  "shopping-next",
  "past-weekend"
]);
for (const lesson of nextUnit.lessons) {
  assert.equal(lesson.level, "A1+");
  assert.equal(lesson.resource.status, "candidate");
  assert.ok(lesson.resource.objectiveMatch);
  assert.match(lesson.resource.verification, /revisar/i);
}

console.log(`Validated ${lessons.length} lessons and ${lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0)} exercises.`);
