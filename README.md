# Dream Portal Tests

Playwright tests for the Dream Portal site:

https://arjitnigam.github.io/myDreams/

## Why this project exists

This is a small Playwright exercise for checking the main user flows on the Dream Portal site. The tests cover loading, navigation, the dream diary, and the summary page. There is also an optional experiment that compares dream types with a Qwen model.

## Setup

```bash
npm install
```

The normal browser tests do not need an API key. To run the optional Qwen check, copy the example file and add an OpenRouter key to `.env`:

```bash
cp .env.example .env
```

```text
OPENROUTER_API_KEY=your_actual_key_here
```

## Run

```bash
npx playwright test --project=chromium --workers=1
```

The Qwen/OpenRouter test is optional and depends on an external service. It can be slower than the browser-only tests or unavailable if the service or key is unavailable.

Run the optional check in headed mode:

```bash
npx playwright test tests/qwen.spec.ts --project=chromium --workers=1 --headed
```

The browser suite covers home page loading and popup navigation, the 10-row dream diary, summary counts, and recurring dreams. The optional check classifies each unique dream title as Good or Bad with Qwen through OpenRouter.

HTML results are written to `playwright-report/`.
