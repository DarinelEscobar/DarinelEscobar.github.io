import { test } from "node:test";
import assert from "node:assert/strict";
import { filterProjectsBySource, selectFeaturedProjects } from "../src/components/Projects/quickViewUtils.ts";

test("featured projects keep the requested order and skip missing entries", () => {
  const projects = [{ name: "B", source: "personal" }, { name: "A", source: "experience" }];
  assert.deepEqual(selectFeaturedProjects(projects, ["A", "missing", "B"]).map(project => project.name), ["A", "B"]);
  assert.deepEqual(filterProjectsBySource(projects, "experience").map(project => project.name), ["A"]);
});
