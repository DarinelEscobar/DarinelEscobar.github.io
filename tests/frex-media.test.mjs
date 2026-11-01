import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildProjects } from '../src/content/portfolio/projectUtils.ts';

test('FREX keeps an image cover and an accessible promotional video with matching subtitle timings', () => {
  const data = JSON.parse(fs.readFileSync(new URL('../data/experience.json', import.meta.url), 'utf8'));
  const raw = data.experience.projects.find(project => project.name === 'FREX Club');
  const [project] = buildProjects([raw], {}, 'experience');
  assert.equal(project.media[0].type, 'image');
  const videos = project.media.filter(media => media.type === 'video');
  assert.equal(videos.length, 1);
  const [video] = videos;
  assert.ok(fs.existsSync(new URL(`../public/${video.url}`, import.meta.url)));
  assert.ok(fs.existsSync(new URL(`../src/${video.poster}`, import.meta.url)));
  const toSeconds = stamp => stamp.split(':').reduce((sum, part) => sum * 60 + Number(part), 0);
  const tracks = [video.captions, video.subtitles].map(file => {
    assert.ok(file);
    const text = fs.readFileSync(new URL(`../public/${file}`, import.meta.url), 'utf8');
    assert.ok(text.startsWith('WEBVTT\n'));
    const cues = [...text.matchAll(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([^\n]+)/gu)];
    assert.equal(cues.length, 15);
    let previousEnd = 0;
    for (const [, start, end, caption] of cues) {
      assert.ok(toSeconds(start) >= previousEnd);
      assert.ok(toSeconds(end) > toSeconds(start));
      assert.ok(toSeconds(end) <= 41.55);
      assert.ok(caption.trim());
      previousEnd = toSeconds(end);
    }
    return cues.map(([, start, end]) => [start, end]);
  });
  assert.deepEqual(tracks[0], tracks[1]);
});
