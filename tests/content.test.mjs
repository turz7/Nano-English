import assert from "node:assert/strict";
import { course, validateCourse } from "../content.js";

assert.equal(validateCourse(course), true);
const lessons = course.units.flatMap((unit) => unit.lessons);
assert.equal(lessons.length, 5);
for (const lesson of lessons) {
  assert.ok(lesson.objective);
  assert.ok(lesson.explanation);
  assert.ok(lesson.vocabulary.length >= 5);
  assert.ok(lesson.dialogue.length >= 2);
  assert.ok(lesson.exercises.length >= 3);
  assert.equal(lesson.resource.status, "reviewed");
  assert.match(lesson.resource.sourceUrl, /^https:\/\/www\.youtube\.com\/watch\?v=/);
  assert.match(lesson.resource.embedUrl, /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
  assert.ok(lesson.resource.objectiveMatch);
  assert.ok(lesson.resource.captions);
}
console.log(`Validated ${lessons.length} lessons and ${lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0)} exercises.`);
