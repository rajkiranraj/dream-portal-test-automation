import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  page: Page;
  loader: Locator;
  main: Locator;
  myDreams: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loader = page.locator('#loadingAnimation');
    this.main = page.locator('#mainContent');
    this.myDreams = page.locator('#dreamButton');
  }

  async open() {
    await this.page.goto('index.html');
  }

  async waitForPortal() {
    await this.loader.waitFor({ state: 'visible' });
    const started = Date.now();
    await this.loader.waitFor({ state: 'hidden', timeout: 6000 });
    return Date.now() - started;
  }

  async openMyDreams() {
    const popups: Page[] = [];
    const grab = (popup: Page) => popups.push(popup);
    this.page.on('popup', grab);

    await this.myDreams.click();

    for (let i = 0; i < 25 && popups.length < 2; i++) {
      await this.page.waitForTimeout(100);
    }
    this.page.off('popup', grab);

    await Promise.all(popups.map((popup) => popup.waitForURL(/dreams-(diary|total)\.html/)));

    return {
      diary: popups.find((popup) => popup.url().includes('dreams-diary')),
      summary: popups.find((popup) => popup.url().includes('dreams-total')),
    };
  }
}
