import { test, expect } from '@playwright/test';
import { DiaryPage } from '../pages/diary.page';
import { classifyDream, qwenKey } from '../lib/qwen';

test('qwen labels match the type in the diary', async ({ page }) => {
  test.skip(!qwenKey(), 'set OPENROUTER_API_KEY to run this');
  test.setTimeout(60_000);

  const diary = new DiaryPage(page);
  await diary.open();
  const entries = await diary.entries();

  // titles repeat. one call per title.
  const seen = new Map<string, string>();
  for (const entry of entries) {
    const previous = seen.get(entry.name);
    expect(previous === undefined || previous === entry.type, entry.name).toBeTruthy();
    seen.set(entry.name, entry.type);
  }

  for (const [name, type] of seen) {
    const fromQwen = await classifyDream(name);
    console.log(`${name}: table=${type} qwen=${fromQwen}`);
    expect(fromQwen, name).toBe(type);
  }
});
