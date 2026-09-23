import { type Locator, type Page } from '@playwright/test';

export class SummaryPage {
  page: Page;
  rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('#dreamsTotal tbody tr');
  }

  async open() {
    await this.page.goto('dreams-total.html');
  }

  async counts() {
    const pairs = await this.rows.evaluateAll((trs) =>
      trs.map((tr) => [...tr.querySelectorAll('td')].map((td) => (td as HTMLElement).innerText.trim())),
    );

    const stats: Record<string, number> = {};
    for (const [label, count] of pairs) stats[label] = Number(count);
    return stats;
  }
}
