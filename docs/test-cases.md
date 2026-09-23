# Dream Portal test cases

The tests cover the home page, diary, summary page, and the optional Qwen check.

## 1. Home page

### TC-HOME-001 - Loading state

1. Open `index.html`.
2. Check the page before the timer finishes.
3. Wait for the loading animation to disappear.

Expected: the loader is visible first, then the main content is shown after about three seconds.

### TC-HOME-002 - Home page controls

Open the page after loading and check the dream count, day count, page heading, and `My Dreams` button.

Expected: the values are displayed and the button can be clicked.

### TC-HOME-003 - My Dreams links

Click `My Dreams` and check the tabs/windows opened by the page.

Expected:

1. One page opens `dreams-diary.html`.
2. One page opens `dreams-total.html`.

## 2. Dreams diary

### TC-DIARY-001 - Number of rows

Open `dreams-diary.html` and count the table rows.

Expected: there are exactly 10 dreams.

### TC-DIARY-002 - Row values

Read each row and check the three columns: Dream Name, Days Ago, and Dream Type.

Expected: no cell is blank and the type is either `Good` or `Bad`.

## 3. Dreams summary

### TC-SUMMARY-001 - Summary totals

Open `dreams-total.html` and compare the displayed values with the diary.

Expected:

1. Good Dreams: `6`
2. Bad Dreams: `4`
3. Total Dreams: `10`
4. Recurring Dreams: `2`

### TC-SUMMARY-002 - Recurring dreams

Count repeated names in the diary and compare them with the summary.

Expected: the repeated names are `Flying over mountains` and `Lost in maze`.

## 4. Bonus AI check

### TC-AI-001 - Dream type classification

Send each unique diary title to the Qwen model through OpenRouter and compare the result with the table type.

Expected: the model returns `Good` or `Bad`, and its result matches the diary for every title.
