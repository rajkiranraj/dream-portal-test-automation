# Dream Portal Tests

Playwright tests for the Dream Portal site:

https://arjitnigam.github.io/myDreams/

## Setup

```bash
npm install
cp .env.example .env
```

Add an OpenRouter key to `.env`:

```text
OPENROUTER_API_KEY=your_actual_key_here
```

## Run

```bash
npx playwright test --project=chromium --workers=1
```

Run the AI validation in headed mode:

```bash
npx playwright test tests/qwen.spec.ts --project=chromium --workers=1 --headed
```

The suite covers the home page loading and popup navigation, the 10-row dream diary, summary counts, recurring dreams, and optional Good/Bad classification with Qwen through OpenRouter.

HTML results are written to `playwright-report/`.
