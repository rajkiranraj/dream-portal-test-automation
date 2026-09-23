import { type Locator, type Page } from '@playwright/test';

type DreamRow = {
  name: string;
  daysAgo: string;
  type: string;
};

export class DiaryPage {
  page: Page;
  rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('#dreamsDiary tbody tr');
  }

  async open() {
    await this.page.goto('dreams-diary.html');
  }

  async entries(): Promise<DreamRow[]> {
    const cells = await this.rows.evaluateAll((trs) =>
      trs.map((tr) => [...tr.querySelectorAll('td')].map((td) => (td as HTMLElement).innerText.trim())),
    );

    return cells.map(([name = '', daysAgo = '', type = '']) => ({ name, daysAgo, type }));
  }

  recurringNames(entries: DreamRow[]) {
    const counts: Record<string, number> = {};
    for (const entry of entries) {
      counts[entry.name] = (counts[entry.name] || 0) + 1;
    }
    return Object.keys(counts).filter((name) => counts[name] > 1);
  }
}
