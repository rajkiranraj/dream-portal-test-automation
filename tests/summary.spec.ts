import { test, expect } from '@playwright/test';
import { DiaryPage } from '../pages/diary.page';
import { SummaryPage } from '../pages/summary.page';

test('summary counts match the diary, including the two recurring dreams', async ({ page }) => {
  const diary = new DiaryPage(page);
  await diary.open();
  const entries = await diary.entries();
  const recurring = diary.recurringNames(entries).sort();

  console.log('recurring from diary:', recurring.join(', '));
  expect(recurring).toEqual(['Flying over mountains', 'Lost in maze']);

  const good = entries.filter((entry) => entry.type === 'Good').length;
  const bad = entries.filter((entry) => entry.type === 'Bad').length;

  const summary = new SummaryPage(page);
  await summary.open();
  const stats = await summary.counts();

  expect(stats['Good Dreams']).toBe(6);
  expect(stats['Bad Dreams']).toBe(4);
  expect(stats['Total Dreams']).toBe(10);
  expect(stats['Recurring Dreams']).toBe(2);

  expect(stats['Good Dreams']).toBe(good);
  expect(stats['Bad Dreams']).toBe(bad);
  expect(stats['Total Dreams']).toBe(entries.length);
  expect(stats['Recurring Dreams']).toBe(recurring.length);
});
