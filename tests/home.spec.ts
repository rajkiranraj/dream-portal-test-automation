import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('loader clears in about 3s, then My Dreams opens both pages', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();

  await expect(home.loader).toBeVisible();
  await expect(home.main).toBeHidden();
  await expect(home.myDreams).toBeHidden();

  const waitedMs = await home.waitForPortal();
  // 3000ms in their script. wide enough that a slow page load doesn't fail it,
  // tight enough that a missing timer would.
  expect(waitedMs).toBeGreaterThan(2000);
  expect(waitedMs).toBeLessThan(5000);

  await expect(home.main).toBeVisible();
  await expect(home.myDreams).toBeVisible();
  await expect(home.myDreams).toHaveText('My Dreams');
  await expect(page.getByRole('heading', { name: 'Dream Portal' })).toBeVisible();

  await page.screenshot({ path: 'screenshots/home.png' });

  const { diary, summary } = await home.openMyDreams();
  expect(diary, 'diary tab').toBeTruthy();
  expect(summary, 'summary tab').toBeTruthy();
  await expect(diary!).toHaveURL(/dreams-diary\.html/);
  await expect(summary!).toHaveURL(/dreams-total\.html/);
  await expect(diary!.getByRole('heading', { name: 'Dreams Diary' })).toBeVisible();
  await expect(summary!.getByRole('heading', { name: 'Dreams Summary' })).toBeVisible();

  await diary!.screenshot({ path: 'screenshots/diary.png' });
  await summary!.screenshot({ path: 'screenshots/summary.png' });
});
