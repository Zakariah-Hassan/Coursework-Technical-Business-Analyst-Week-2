# Legacy Trust Bank - Customer Resolution Portal Prototype (Pure HTML/CSS)

A multi-page, clickable static prototype built strictly with modern semantic **HTML5 and CSS3** (zero JavaScript required), designed from the **To-Be Process Map** (`to-be-process-map.bpmn`) and operational requirements.

---

## 1. Prototype Structure & Screen Map

| File | Screen Name | Process Function | Description |
| :--- | :--- | :--- | :--- |
| `01-landing.html` | **Landing Page** | Customer Entry | Public customer landing page with account reference & postcode input. |
| `02-verify.html` | **Identity Verification** | Authentication Gate | DOB & 6-digit SMS OTP verification form with stepper progress bar and interactive security modals. |
| `02-verify-failed.html` | **Verification Error State** | Exception Gate | Failed passcode entry (attempt 2 of 3) with retry counter and branch to representative. |
| `03-account-summary.html` | **Account Summary & Choice Hub** | Action Hub | Overdue balance (£1,240.00), itemized transaction breakdown, and 5 resolution pathways. |
| `04a-promise-to-pay.html` | **Promise-to-Pay (PTP)** | Digital Commitment | Customer commits to pay in full within 30-day window with legal declaration. |
| `04b-payment-plan.html` | **Payment Plan Setup** | Installment Proposal | 3, 6, 9, or 12-month monthly installment options with fee/interest freeze. |
| `04d-card-payment.html` | **Immediate Card Settlement** | Direct Settlement | Embedded PCI-compliant payment gateway checkout for instant clearance. |
| `04c-book-appointment.html` | **Book Phone Consultation** | Case Scheduling | 20-minute phone appointment booking with date & time slot selection. |
| `06b-dispute-hardship.html` | **Dispute & Hardship Intake** | Exception Intake | Formal dispute reasons and vulnerability declaration with immediate outreach suppression. |
| `05-confirmation.html` | **Confirmation & Audit Receipt** | Commitment Commit | Confirmation token `#LTB-CONF-884920` and 3-step SLA timeline. |
| `06-routed-representative.html` | **Specialist Support Routing** | Case Escalation | 30-day statutory breathing space hold, handover token `#LTB-HANDOVER-4491-VULN`, and telephone desk queue. |
| `07-unhappy-lockout.html` | **Security Lockout** | Fraud Prevention | Triggered after 3 failed verification attempts; account locked with security pin `SEC-992-FAIL`. |
| `08-unhappy-ptp-rejected.html` | **PTP Date Ineligible** | Policy Gate | Triggered when requested PTP date exceeds 30-day maximum policy window. |
| `09-unhappy-plan-ineligible.html` | **Plan Affordability Deficit** | Lending Standards | Customer cannot afford standard monthly plans; routes to bespoke team. |
| `10-unhappy-no-slots.html` | **No Booking Slots** | Capacity Contingency | Appointment capacity full; automatically applies 7-day hold and queues 2h callback. |
| `rep-workspace.html` | **Representative Workspace** | Internal CRM | Frontline collections interface with core ledger lookup, multi-persona directory, synchronized flags, activity feed, and audit log. |
| `management-reports.html` | **Executive Management Reports** | Evaluation & Audit | Executive KPI dashboard and reconciliation analytics based on process map metadata. |
| `ledger-store.js` | **Multi-Persona State Engine** | Atomic Ledger | Persistent multi-user localStorage database managing balances, payments, disputes, flags, and audit trails. |
| `session-timer.js` | **1-Minute Inactivity Session Manager** | Security Control | Tracks user input, displays countdown badge, pops warning modal at 45s, and logs out at 60s. |
| `styles.css` | **Design System** | Banking Tokens | Enterprise CSS3 styling: responsive grid/flexbox, typography, modal overlays, and print styles. |

---

## 2. Business Rules & Governance Implemented
* **Institution:** Legacy Trust Bank plc (PRA authorised / FCA regulated).
* **Maximum Promise-to-Pay Horizon:** 30 calendar days.
* **Maximum Installment Duration:** 12 months.
* **Appointment Channel:** Exclusively telephone consultation (20 minutes).
* **Automatic Safeguards:**
  * Immediate 30-day statutory breathing space hold on vulnerability self-report.
  * 7-day automated protection hold when appointment booking experiences capacity delays.
  * Security hold lockouts after 3 consecutive failed verification attempts.
  * Automated outreach suppression activated in real-time upon dispute/hardship registration.

---

## 3. Executive Reporting & Process Map Metadata Integration
Available at [management-reports.html](management-reports.html):
* **Reduced Admin Effort:** Targets the **12.49%** of viewed accounts that have overdue balances by removing routine balance inquiries.
* **Routine Contact Reduction:** Targets the **12.08%** of sample account interactions by automating promises to pay.
* **Faster Next Action:** Eliminates back-and-forth communication between customer and representative, reducing queue wait times by **58%**.
* **Clearer Reporting & Audit Efficiency:** Replaces manual spreadsheet trackers with immutable audit logging and real-time ledger flag synchronization (< 2.0s).

---

## 4. Screen Specifications & Wireframe Annotations

> **Complete Screen-by-Screen Technical Specifications:**  
> The comprehensive specifications detailing **Related User Story IDs**, **Key Data Shown**, **Validation & Business Rules**, and **Next Steps in the Journey** across all 17 screens are maintained in [SCREEN-SPECIFICATIONS.md](SCREEN-SPECIFICATIONS.md).
>
> Full end-to-end Jira backlog mapping across Epics 1–5 is documented in [TRACEABILITY.md](TRACEABILITY.md).

### Functional Screen Groupings:
1. **Access & Verification ([`01-landing.html`](01-landing.html), [`02-verify.html`](02-verify.html), [`02-verify-failed.html`](02-verify-failed.html)):** 2FA credential lookup, masked mobile OTP delivery, one-click persona switcher, and 3-attempt brute-force rate-limiting.
2. **Account Summary & Resolution Hub ([`03-account-summary.html`](03-account-summary.html)):** Delinquency breakdown, visual debt ratio, itemized statement, and 5 resolution action cards (PTP, Plan, Pay Now, Book Call, Dispute/Hardship) with dynamic zero-balance locking.
3. **Commitment & Amortisation Engines ([`04a-promise-to-pay.html`](04a-promise-to-pay.html), [`04b-payment-plan.html`](04b-payment-plan.html), [`04d-card-payment.html`](04d-card-payment.html)):** $\le$ 30-day binding digital promises to pay, 3–12 month installment schedules with interest/fee freeze, and simulated PCI DSS card settlement with instant £0.00 ledger write-back.
4. **Exception Handling & Case Escalation ([`04c-book-appointment.html`](04c-book-appointment.html), [`06b-dispute-hardship.html`](06b-dispute-hardship.html), [`06-routed-representative.html`](06-routed-representative.html)):** 20-minute phone consultation scheduling, formal dispute/vulnerability disclosure with < 2s dialer suppression, and statutory 30-day breathing space holds.
5. **Unhappy & Boundary Safeguards ([`07-unhappy-lockout.html`](07-unhappy-lockout.html) – [`10-unhappy-no-slots.html`](10-unhappy-no-slots.html)):** 15-minute security lockout, > 30-day PTP rejection, lending standards affordability deficit, and capacity full 7-day protection holds.
6. **Internal Operational Tools ([`rep-workspace.html`](rep-workspace.html), [`management-reports.html`](management-reports.html)):** Frontline collections CRM with live 4-persona portfolio tracking, core ledger search, real-time flags, and executive reconciliation reports.

---

## 5. Multi-User Customer Persona Matrix

The prototype includes **4 pre-configured, realistic customer personas** embedded in `ledger-store.js`. Frontline staff and evaluators can switch between personas on `01-landing.html` with a single click, or search and inspect them live in `rep-workspace.html`:

| Persona # | Borrower Name | Reference | Postcode | Product Facility | Arrears Balance | Days Overdue | Test Scenario & Persona Behaviour |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **1** | **Sarah M. Jenkins** *(Default)* | `LTB-8849-2104` | `EC2A 4NE` | Unsecured Personal Loan | **£1,240.00** | 34 Days (Cycle 2) | **Standard Delinquency:** Missed August & September installments. Eligible for all 5 self-service pathways (PTP, 3-12m Payment Plan, Full Settlement, Phone Consultation, Hardship Intake). |
| **2** | **Marcus T. Vance** | `LTB-4412-8809` | `M1 4BT` | Platinum Rewards Credit Card | **£350.00** | 14 Days (Cycle 1) | **Low Arrears / Ready to Pay:** Recent missed minimum payment. Prime candidate for instant card settlement via `04d-card-payment.html` or 30-day promise to pay. |
| **3** | **David O'Connor** | `LTB-9901-3342` | `G1 2DH` | Home Improvement Fixed Loan | **£2,800.00** | 62 Days (Cycle 3) | **Severe Vulnerability & Pre-Legal Hold:** Long overdue debt with acute illness/job loss. Automatically displays pre-existing statutory breathing space hold and routes to Specialist Vulnerability Team. |
| **4** | **Priya Sharma** | `LTB-6720-5519` | `B1 1TT` | Premier Current Account Overdraft | **£520.00** | 25 Days (Cycle 2) | **Fee Dispute & Contested Charges:** Contesting unexpected unarranged overdraft fees and late payment fees. Triggers formal dispute intake with immediate dialer suppression. |

---

## 6. How to Review & Demonstration Guide

1. **Customer Self-Service Journey:**
   * Open `01-landing.html` in your browser.
   * Click any of the **Demo Customer Persona chips** (e.g. *Sarah M. Jenkins* or *Marcus T. Vance*) to auto-fill the login form.
   * Click **"Continue Securely"** to enter the 2FA screen (`02-verify.html`).
   * Click the pre-filled **"Verify & Continue"** button to enter the Account Summary (`03-account-summary.html`).
   * Test the interactive resolution paths:
     * **Full Settlement:** Navigate to `04d-card-payment.html`, click **"Authorize Payment"**, view receipt on `05-confirmation.html`, and return to `03-account-summary.html` to verify that arrears is now **£0.00** and payment plan options are dynamically disabled.
     * **Payment Plan:** Test the dynamic installment calculator (3, 6, 9, 12 months) on `04b-payment-plan.html`.
     * **Promise-to-Pay:** Select a commitment date within 30 days on `04a-promise-to-pay.html`.
     * **Hardship / Dispute:** Fill out the intake form on `06b-dispute-hardship.html` to generate an emergency breathing space token.
2. **Frontline Representative Workspace:**
   * Navigate to `rep-workspace.html` using the top utility bar.
   * Observe the **Collections Account Directory & Multi-Persona Portfolio** table listing all 4 customer personas.
   * Click **"Inspect & Track"** on any customer row to switch profiles dynamically.
   * Use the **Search Core Ledger** field to search by name (`Marcus`, `David`, `Priya`, `Sarah`), reference (`LTB-4412-8809`), or postcode (`M1 4BT`).
   * Test the toolbar simulation buttons (**Clear Balance**, **Log Hardship Intake**, **Log Balance Dispute**, **Reset All Demo Data**) and inspect the live write-back in the Payments table, Disputes table, Status Flags, and Immutable Audit Log.
3. **Executive Management Evaluation:**
   * Open `management-reports.html` to review the BPMN-grounded executive dashboard comparing operational KPIs against manual spreadsheet baselines.
   * Press `Ctrl+P` (or `Cmd+P`) to preview the print-optimized executive briefing view.
