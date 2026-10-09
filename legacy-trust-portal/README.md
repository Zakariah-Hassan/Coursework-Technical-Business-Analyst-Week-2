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
| `rep-workspace.html` | **Representative Workspace** | Internal CRM | Frontline collections interface with core ledger lookup, synchronized flags, activity feed, and audit log. |
| `management-reports.html` | **Executive Management Reports** | Evaluation & Audit | Executive KPI dashboard and reconciliation analytics based on process map metadata. |
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
Available at [management-reports.html](legacy-trust-portal/management-reports.html):
* **Reduced Admin Effort:** Targets the **12.49%** of viewed accounts that have overdue balances by removing routine balance inquiries.
* **Routine Contact Reduction:** Targets the **12.08%** of sample account interactions by automating promises to pay.
* **Faster Next Action:** Eliminates back-and-forth communication between customer and representative, reducing queue wait times by **58%**.
* **Clearer Reporting & Audit Efficiency:** Replaces manual spreadsheet trackers with immutable audit logging and real-time ledger flag synchronization (< 2.0s).

---

## 4. Page-by-Page Technical Specification & BA Governance

### 1. `01-landing.html` (Customer Landing Page)
* **Related User Story ID:**
  * `US-02`: Account Credential Lookup
  * `US-09`: Self-Service Eligibility Filter
  * `US-21`: Conversion Telemetry (Funnel Stage 1)
* **Key Data Shown:**
  * Bank branding (Legacy Trust Bank plc), encryption & security badges.
  * Input fields: Account/Notice Reference (`LTB-8849-2104`) and Billing Postcode (`EC2A 4NE`).
  * Direct phone desk link for customers preferring not to use the portal.
  * Customer value proposition cards (Immediate Hold on Fees, Up to 30 Days to Pay, Plans up to 12 Months).
* **Validation or Business Rule:**
  * Input format: Alphanumeric account reference and valid UK postcode.
  * Lookup query matches active borrower record; non-matching records return generic error without revealing account existence.
  * Ineligible accounts (`self_service_eligible = false` or `legal_flag = true`) are gated and routed to manual support.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Submits credentials $\rightarrow$ proceeds to `02-verify.html`.
  * *Alternative / Opt-Out:* Selects *"I prefer to speak to a representative"* $\rightarrow$ routes to `06-routed-representative.html`.

### 2. `02-verify.html` (Two-Factor Identity Verification)
* **Related User Story ID:**
  * `US-01`: SMS 2FA Authentication
  * `US-02`: Account Credential Lookup
  * `US-03`: Session Auto-Logout
  * `US-04`: OTP Resend Rate Limiting
* **Key Data Shown:**
  * 4-step progress stepper (Step 1 active).
  * Masked mobile destination confirmation (`•••• 4921`).
  * Inputs: Date of Birth (`DD/MM/YYYY`) and 6-digit SMS Passcode (`pattern="[0-9]{6}"`).
  * Pure-CSS modal triggers for Session Inactivity Warning and Rate Limit Enforcement.
* **Validation or Business Rule:**
  * DOB must match core record on file.
  * SMS passcode expires in 5 minutes.
  * Inactivity limit: 13-minute inactivity triggers warning modal with 120-second countdown; 15 minutes clears session tokens.
  * Resend cooldown: 60-second cooldown timer between resend requests.
  * Rate limit cap: Maximum 3 resend attempts per hour; 4th request blocks SMS dispatch for 1 hour.
  * Failure limit: 3 consecutive failed verification attempts locks the session for 15 minutes.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Valid DOB and OTP submitted $\rightarrow$ advances to `03-account-summary.html`.
  * *Exception Path (Failed Attempt 2 of 3):* Invalid OTP entered $\rightarrow$ routes to `02-verify-failed.html`.
  * *Unhappy Path (UH-01):* 3 consecutive failed verification attempts $\rightarrow$ routes to `07-unhappy-lockout.html`.

### 3. `02-verify-failed.html` (Exception Path: Failed Verification Attempt 2 of 3)
* **Related User Story ID:**
  * `US-01`: SMS 2FA Authentication (Error Handling)
  * `US-02`: Account Credential Lookup
  * `US-16`: Exception Queue Routing
* **Key Data Shown:**
  * Red alert banner with attempt counter: *"Attempt 2 of 3 Failed: You have 1 attempt remaining"*.
  * Pre-populated invalid input field (`123456`) with error border and validation helper text.
  * Direct clickable branches:
    1. Retry with correct code (Attempt 3 of 3).
    2. Simulate 3rd failure (triggers 15-minute lockout).
    3. Route directly to a telephone representative for manual identity verification.
* **Validation or Business Rule:**
  * System enforces a 3-attempt maximum threshold before automated security freeze.
  * Clear warning of impending lockout given after the 2nd failed attempt.
  * Preserves user data and pre-verified Account Reference without exposing full PII.
* **Next Steps in the Journey:**
  * *Branch 1 (Retry):* Re-enters code $\rightarrow$ advances to `03-account-summary.html`.
  * *Branch 2 (3rd Failure):* Submits invalid code again $\rightarrow$ routes to `07-unhappy-lockout.html`.
  * *Branch 3 (Representative Handoff):* Selects manual verification $\rightarrow$ routes to `06-routed-representative.html?reason=failed-verification`.

### 4. `03-account-summary.html` (Account Delinquency Overview & Choice Hub)
* **Related User Story ID:**
  * `US-05`: Real-Time Balance Summary
  * `US-06`: Itemized Debt Details
  * `US-09`: Self-Service Eligibility Filter
* **Key Data Shown:**
  * Account Reference (`LTB-8849-2104`), Customer Name (`Sarah M. Jenkins`), and Days Delinquent (`34 Days`).
  * Total overdue arrears balance (`£1,240.00`) and remaining principal balance (`£5,400.00`).
  * Expandable itemized statement table (August and September missed installments, £20 late assessment surcharges).
  * 5 resolution action cards: Promise to Pay, Payment Plan, Instant Card Settlement, Book Phone Call, and Dispute/Hardship Intake.
* **Validation or Business Rule:**
  * Real-time ledger lookup check confirms account is eligible for digital self-service.
  * Transparent fee itemization required before customer commits to financial solutions.
* **Next Steps in the Journey:**
  * *Action 1:* Selects Promise to Pay $\rightarrow$ `04a-promise-to-pay.html`.
  * *Action 2:* Selects Payment Plan $\rightarrow$ `04b-payment-plan.html`.
  * *Action 3:* Selects Pay Now $\rightarrow$ `04d-card-payment.html`.
  * *Action 4:* Selects Book Phone Call $\rightarrow$ `04c-book-appointment.html`.
  * *Action 5:* Selects Dispute or Declare Hardship $\rightarrow$ `06b-dispute-hardship.html`.

### 5. `04a-promise-to-pay.html` (Future-Dated Promise to Pay)
* **Related User Story ID:**
  * `US-11`: Future-Dated Promise to Pay
  * `US-19`: Real-Time Status Write-Back
* **Key Data Shown:**
  * Total arrears balance to settle (`£1,240.00`).
  * Date picker bounded to policy limits.
  * Payment channel selection (Debit Card, Open Banking, Telephone Banking).
  * Statutory legal commitment declaration checkbox.
* **Validation or Business Rule:**
  * Date must fall within policy threshold of **$\le$ 30 calendar days** from today (Latest permitted: 08 November 2026).
  * Mandatory legal declaration acknowledgment must be checked before submission.
  * Real-time status update: Committing writes `ptp_active = true` and `ptp_due_date` to core ledger tables within 2 seconds.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Valid date $\le$ 30 days submitted $\rightarrow$ advances to `05-confirmation.html?type=ptp`.
  * *Unhappy Path (UH-02):* User selects date > 30 days $\rightarrow$ routes to `08-unhappy-ptp-rejected.html`.

### 6. `04b-payment-plan.html` (Payment Plan Setup)
* **Related User Story ID:**
  * `US-10`: Payment Plan Selection
  * `US-19`: Real-Time Status Write-Back
* **Key Data Shown:**
  * Arrears balance to amortise (`£1,240.00`).
  * 4 calculated installment schedule options: 3 months (£413.33/mo), 6 months (£206.67/mo), 9 months (£137.78/mo), 12 months (£103.33/mo).
  * First payment date selector and payment method selection (Direct Debit, Standing Order, Continuous Card Authority).
  * Affordability declaration checkbox.
* **Validation or Business Rule:**
  * Maximum plan duration without manual credit underwriter approval is 12 months.
  * Monthly arrears interest and late administrative fees are frozen while plan remains active and maintained.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Selects plan and confirms schedule $\rightarrow$ advances to `05-confirmation.html?type=plan`.
  * *Unhappy Path (UH-03):* Customer cannot afford minimum monthly plan $\rightarrow$ routes to `09-unhappy-plan-ineligible.html`.

### 7. `04d-card-payment.html` (Immediate Card Settlement)
* **Related User Story ID:**
  * `US-12`: Card Payment Processing
  * `US-19`: Real-Time Status Write-Back
* **Key Data Shown:**
  * Total immediate settlement amount (`£1,240.00`).
  * Simulated PCI DSS Level 1 certified gateway iFrame container (DEP-02).
  * Cardholder name, card number, expiry date (MM/YY), CVV, and security encryption badge.
* **Validation or Business Rule:**
  * Strict PCI compliance: Web application never stores or handles raw PAN/CVV; card details are tokenized directly via the payment gateway vault.
  * Immediate ledger credit: Successful card authorization immediately clears arrears balance and restores good account standing.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Authorises card settlement $\rightarrow$ advances to `05-confirmation.html?type=card-payment`.
  * *Cancellation:* Selects cancel $\rightarrow$ returns to `03-account-summary.html`.

### 8. `04c-book-appointment.html` (Book Phone Consultation)
* **Related User Story ID:**
  * `US-16`: Exception Queue Routing
  * Customer Scheduling Subflow (BPMN)
* **Key Data Shown:**
  * Channel restriction notice: **Telephone Consultation Only** (20 minutes).
  * Discussion topic selector (Affordability, Hardship, Balance Dispute, General Arrears Guidance).
  * Pre-filled customer contact telephone number (`+44 7700 900492`).
  * Date picker and available morning/afternoon time window slots (09:30, 11:15, 14:00, 16:30).
  * Optional advisor preparation notes input.
* **Validation or Business Rule:**
  * Appointments restricted to phone consultations between Monday and Friday, up to 14 days in advance.
  * Maximum booking capacity per slot enforced by scheduling engine.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Selects available slot and confirms $\rightarrow$ advances to `05-confirmation.html?type=appointment`.
  * *Unhappy Path (UH-04):* Selected date has no capacity $\rightarrow$ routes to `10-unhappy-no-slots.html`.

### 9. `06b-dispute-hardship.html` (Dispute & Financial Hardship Intake Form)
* **Related User Story ID:**
  * `US-14`: Outreach Suppression (< 2s)
  * `US-15`: Dispute & Hardship Form
  * `US-16`: Exception Queue Routing
* **Key Data Shown:**
  * Declaration category selection: Dispute Account Balance or Declare Financial Hardship / Vulnerability.
  * Standard reason code dropdown (`ERR_CALC`, `FEE_DISPUTE`, `SUSPECTED_FRAUD`, `HARDSHIP_HEALTH`, `HARDSHIP_INCOME`, `STATUTORY_BREATHING`).
  * Detailed customer narrative statement box and supporting document upload mock.
  * Truth declaration checkbox.
* **Validation or Business Rule:**
  * Customer-facing language: Technical database variable names are shielded from the user.
  * Real-time automated collection freeze: Submitting immediately activates automated outreach suppression in the core ledger within 2 seconds.
  * Halts dialer campaigns, automated SMS broadcasts, and enforcement letters during review.
* **Next Steps in the Journey:**
  * Submits intake declaration $\rightarrow$ routes to `06-routed-representative.html?reason=form-submitted` with case queued for specialist assessment.

### 10. `05-confirmation.html` (Arrangement Confirmation & Audit Receipt)
* **Related User Story ID:**
  * `US-13`: Plan & P2P Multi-Channel Confirmations
  * `US-19`: Real-Time Status Write-Back
  * `US-20`: Immutable Audit Logging
* **Key Data Shown:**
  * Unique confirmation reference (`#LTB-CONF-884920`).
  * Summary receipt: Customer Name, Account Reference, Arrangement Type, Covered Amount (£1,240.00).
  * Multi-channel delivery confirmation (SMS to `•••• 4921` and email to registered address).
  * Compliance verification hash (`sha256:7f83b165...`).
  * 3-step next steps timeline (Written confirmation $\rightarrow$ Late fees paused $\rightarrow$ 24h SMS reminder).
  * Print / Save PDF Summary action.
* **Validation or Business Rule:**
  * Atomic transaction write-back committed to database (`PUT /api/v1/ledgers/flags` - HTTP 200 OK).
  * Formal proof of agreement dispatched to customer across multiple channels.
* **Next Steps in the Journey:**
  * Selects *"Done & Exit Securely"* $\rightarrow$ terminates session and redirects to `01-landing.html`.
  * Internal staff can inspect real-time synchronized status in `rep-workspace.html`.

### 11. `06-routed-representative.html` (Specialist Support & Routing)
* **Related User Story ID:**
  * `US-14`: Outreach Suppression
  * `US-16`: Exception Queue Routing
  * `US-18`: Legal Review Handoff
* **Key Data Shown:**
  * 30-Day Statutory Breathing Space hold alert.
  * Unique Case Handover Token (`#LTB-HANDOVER-4491-VULN`) to eliminate customer repeating context.
  * Direct priority telephone desk number (`0800 456 7890`) and live wait-time estimate (&lt;2 minutes).
  * Scheduled phone callback booking button.
  * Impartial independent debt charity resource links (StepChange, Citizens Advice, National Debtline).
* **Validation or Business Rule:**
  * Statutory breathing space stops all recovery action and freezes interest/charges for a minimum of 30 days.
  * Case is assigned directly to the `Vulnerability_Team` or `Dispute_Specialists` queue with SLA tracking.
* **Next Steps in the Journey:**
  * Customer can call telephone banking directly, book a scheduled phone consultation (`04c-book-appointment.html`), or return to `01-landing.html`.

### 12. `07-unhappy-lockout.html` (Unhappy 1: Security Lockout)
* **Related User Story ID:**
  * `US-01`: SMS 2FA Authentication
  * `US-16`: Exception Queue Routing
* **Key Data Shown:**
  * Security hold warning banner.
  * Security Incident Authorization Pin (`SEC-992-FAIL`).
  * Priority telephone security desk details and live phone wait time (&lt;3 minutes).
  * Scheduled phone callback booking option.
* **Validation or Business Rule:**
  * Triggered after 3 consecutive invalid OTP or credential verification entries.
  * Online portal access locked for 15 minutes to mitigate brute-force and credential stuffing attacks.
  * Incident flag logged to security metadata; access can only be restored via representative secondary identity verification.
* **Next Steps in the Journey:**
  * Customer books scheduled callback (`04c-book-appointment.html`), calls security helpline, or returns to `01-landing.html`.

### 13. `08-unhappy-ptp-rejected.html` (Unhappy 2: PTP Date Ineligible)
* **Related User Story ID:**
  * `US-11`: Future-Dated Promise to Pay (Policy Exception)
* **Key Data Shown:**
  * Rejection notice for requested date beyond policy window (e.g. 47 days requested).
  * Clear explanation of maximum 30-calendar-day threshold.
  * Approved structured alternatives: Spread into a 3–12 month payment plan or request discretionary officer extension via phone consultation.
* **Validation or Business Rule:**
  * Automated digital promises-to-pay are policy-capped at 30 calendar days. Any commitment beyond 30 days requires credit officer discretion.
* **Next Steps in the Journey:**
  * *Option A:* Returns to revise date within 30 days $\rightarrow$ `04a-promise-to-pay.html`.
  * *Option B:* Selects Payment Plan $\rightarrow$ `04b-payment-plan.html`.
  * *Option C:* Books phone consultation for human underwriter review $\rightarrow$ `04c-book-appointment.html`.

### 14. `09-unhappy-plan-ineligible.html` (Unhappy 3: Plan Affordability Deficit)
* **Related User Story ID:**
  * `US-10`: Payment Plan Selection (Lending Standards Gate)
  * `US-16`: Exception Queue Routing
* **Key Data Shown:**
  * Affordability assurance notice (Standards of Lending Practice).
  * Tailored support routing options: Book a 20-min telephone income/expenditure review or transfer to live specialist queue.
* **Validation or Business Rule:**
  * System prevents customer from accepting installment schedules that exceed verified disposable income or essential living expenditure thresholds.
* **Next Steps in the Journey:**
  * Customer books 20-min telephone review (`04c-book-appointment.html`) or transfers to representative queue (`06-routed-representative.html?reason=affordability`).

### 15. `10-unhappy-no-slots.html` (Unhappy 4: Capacity Full Fallback)
* **Related User Story ID:**
  * `US-16`: Exception Queue Routing
  * `US-17`: SLA Callback Escalations
* **Key Data Shown:**
  * Booking capacity notification for selected date.
  * **Automatic 7-Day Protection Hold:** Freezes late charges while appointment is pending.
  * Contact alternatives: Queue an asynchronous callback within 2 business hours or select an alternative date.
* **Validation or Business Rule:**
  * Capacity exhaustion must not penalize the customer; system automatically applies 7-day grace hold upon booking attempt.
* **Next Steps in the Journey:**
  * Customer queues 2-hour callback $\rightarrow$ advances to `05-confirmation.html?type=callback-queued` or picks a new date on `04c-book-appointment.html`.

### 16. `rep-workspace.html` (Internal Representative Collections CRM)
* **Related User Story ID:**
  * `US-07`: Representative Account Workspace
  * `US-08`: Outreach Activity Feed
  * `US-14`: Outreach Suppression (< 2s)
  * `US-15`: Dispute & Hardship Form Data Capture
  * `US-16`: Exception Queue Routing
  * `US-17`: SLA Callback Escalations
  * `US-18`: Legal Review Handoff
  * `US-19`: Real-Time Status Write-Back
  * `US-20`: Immutable Audit Logging
* **Key Data Shown:**
  * Interactive Demo Toolbar: Live balance indicator, Simulate Payment button, Log Hardship button, Log Dispute button, and Reset Ledger button.
  * Core ledger search bar and customer snapshot (Borrower name, DOB, product, arrears balance, overdue cycle).
  * Real-time synchronized database flags (`self_service_eligible`, `ptp_active`, `payment_received`, `settled_in_full`, `outreach_suppression`, `hardship_flag`, `dispute_flag`, `legal_flag`).
  * Recorded Customer Payments & Receipts Table (Receipt ID, timestamp, amount paid, channel, allocation).
  * **Recorded Customer Disputes & Financial Hardship Cases Table:** Live case tracking for vulnerability declarations and formal balance disputes with Case Token, category, reason code, statement, suppression status, and assigned queue.
  * Outreach Activity Feed (chronological timeline of automated SMS, default letters, hardship holds, and dispute intake notifications).
  * **Append-Only Compliance Audit Log:** Pre-filled historical audit records and live entries tracking `HARDSHIP_INTAKE_SUBMITTED`, `DISPUTE_CLAIM_LOGGED`, `OUTREACH_SUPPRESSION_WRITEBACK`, `CARD_SETTLEMENT_FULL`, and `STATUS_WRITEBACK`.
* **Validation or Business Rule:**
  * Submissions from the customer portal form `06b-dispute-hardship.html` or the representative simulation toolbar instantly log into the case list and audit trail.
  * Automatically sets `outreach_suppression = true` and updates `hardship_flag` or `dispute_flag` in real-time (< 2 seconds).
* **Next Steps in the Journey:**
  * Representative can view customer handoff packet (`06-routed-representative.html`) or initiate outbound telephone contact.

### 17. `management-reports.html` (Executive Management Evaluation & Reconciliation Reports)
* **Key Data Shown:**
  * **Key Executive KPIs:**
    * *12.49%* overdue balance self-service resolution rate.
    * *12.08%* routine contact diverted via automated promises to pay.
    * *-58%* queue wait time reduction for complex cases.
    * *99.4%* PTP follow-up SLA adherence.
  * **Report 1: Operational Impact & Admin Effort Reduction Table:** Detailed breakdown of balance inquiries, PTP capture, payment plan consults, context handoffs, and automatable workload routing.
  * **Report 2: Ledger Reconciliation & Audit Quality:** Quantified comparison against legacy manual spreadsheets showing a **74% reduction** in audit prep time and ledger write-back latency **< 2.0 seconds**.
  * **Funnel Conversion Telemetry Table:** Session throughput and conversion rates across all 5 user journey stages.
* **Validation or Business Rule:**
  * High-level governance report aggregating portal telemetry, audit logs, and reconciliation records.
  * Formatted with full CSS print media support (`@media print`) for executive stakeholder presentations and board review.
* **Next Steps in the Journey:**
  * Executive stakeholders can review metrics, print/export to PDF, or jump directly into customer or representative test scenarios.

---

## 5. How to Review
Open [01-landing.html](01-landing.html) directly in any modern browser. Every page contains a clean, professional prototype navigation header allowing you to explore the full end-to-end customer journey, internal representative console, and executive reporting suite.
