# Dream Portal — Test Scenarios

## Scope

Functional coverage for the Dream Portal user flow, including the home page, dream diary, and summary page.

The main focus is on the behavior and data checks mentioned in the assignment.

---

## Home Page

### TC-HOME-001 — Check loading state

Load the Dream Portal and observe the initial loading state.

**Expected:**
The loading animation is shown while the page is loading and disappears once the page is ready.

### TC-HOME-002 — Check home page after loading

Wait for the loading state to finish and verify that the main page content is available.

**Expected:**
The main Dream Portal content is displayed and can be interacted with.

### TC-HOME-003 — Check home page details

Verify the information presented on the home page.

**Expected:**

* Dream count is displayed.
* Day count is displayed.
* `My Dreams` button is visible and available for interaction.

### TC-HOME-004 — Check My Dreams navigation

Click `My Dreams` and verify the pages opened by the application.

**Expected:**
Two pages are opened:

* `dreams-diary.html`
* `dreams-total.html`

---

## Dreams Diary

### TC-DIARY-001 — Check number of dream entries

Open the Dream Diary and count the entries in the table.

**Expected:**
Exactly 10 dream entries are present.

### TC-DIARY-002 — Validate dream types

Check the value shown in the Dream Type column for every entry.

**Expected:**
Each entry has a valid dream type: `Good` or `Bad`.

### TC-DIARY-003 — Check required row data

Verify that each dream row contains all the expected information.

**Expected:**
Every row has values for:

* Dream Name
* Days Ago
* Dream Type

---

## Dreams Summary

### TC-SUMMARY-001 — Check Good Dreams count

Verify the Good Dreams value on the summary page.

**Expected:**
`Good Dreams = 6`

### TC-SUMMARY-002 — Check Bad Dreams count

Verify the Bad Dreams value on the summary page.

**Expected:**
`Bad Dreams = 4`

### TC-SUMMARY-003 — Check total dream count

Verify the overall dream count.

**Expected:**
`Total Dreams = 10`

### TC-SUMMARY-004 — Check recurring dream count

Verify the number of recurring dreams shown in the summary.

**Expected:**
`Recurring Dreams = 2`

### TC-SUMMARY-005 — Verify recurring dream identification

Cross-check the dream names in the diary with the recurring-dream result shown in the summary.

**Expected:**
The recurring dreams are:

* `Flying over mountains`
* `Lost in maze`
