import { test } from "node:test";
import assert from "node:assert/strict";
import { filterProjectsBySource, selectFeaturedProjects } from "../src/components/Projects/quickViewUtils.ts";

test("featured projects keep the requested order and skip missing entries", () => {
  const projects = [{ name: "B", source: "personal" }, { name: "A", source: "experience" }];
  assert.deepEqual(selectFeaturedProjects(projects, ["A", "missing", "B"]).map(project => project.name), ["A", "B"]);
  assert.deepEqual(filterProjectsBySource(projects, "experience").map(project => project.name), ["A"]);
});
import { buildProjects } from "../src/content/portfolio/projectUtils.ts";

test("documented Git dates and translated diagrams stay scoped to their projects", () => {
  const source = [
    { name: "Demo", description: "Demo", role: "Developer", date_source: "git", media: [{ type: "image", url: "es.svg" }] },
    { name: "Other", description: "Other", role: "Developer", media: [] },
  ];
  const projects = buildProjects(source, { Demo: { mediaUrls: ["en.svg"] } }, "experience");
  assert.equal(projects[0].date_source, "git");
  assert.equal(projects[0].media[0].url, "en.svg");
  assert.equal(projects[1].date_source, undefined);
});
