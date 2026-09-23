import { test, expect } from '@playwright/test';
import { DiaryPage } from '../pages/diary.page';

test('diary has 10 dreams, only Good or Bad, no blank cells', async ({ page }) => {
  const diary = new DiaryPage(page);
  await diary.open();
  const entries = await diary.entries();

  expect(entries).toHaveLength(10);

  for (const entry of entries) {
    expect(entry.name, 'dream name').not.toBe('');
    expect(entry.daysAgo, 'days ago').not.toBe('');
    expect(entry.type, entry.name).toMatch(/^(Good|Bad)$/);
  }
});
