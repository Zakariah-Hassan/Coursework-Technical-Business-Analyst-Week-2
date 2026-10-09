# Legacy Trust Bank - Screen Specifications & Wireframe Annotations

**Document Purpose:** Detailed Technical Business Analyst (TBA) wireframe and screen-by-screen specification guide for the Smart-Recovery Customer Resolution Portal and Internal Representative CRM.  
**Traceability References:** Conforms to `to-be-process-map.bpmn`, `docs/03-wireframe-annotation-guide.md`, and Jira Backlog (`user_stories_v2.csv`).  
**Portal Directory:** `submissions/legacy-trust-portal/`

---

## Screen Inventory Index

| Screen File | Screen Title | Primary Journey Role |
| :--- | :--- | :--- |
| [`01-landing.html`](01-landing.html) | Customer Landing Page | Public Credential Entry & Persona Selector |
| [`02-verify.html`](02-verify.html) | Two-Factor Identity Verification | 2FA Authentication Gate (SMS OTP + DOB) |
| [`02-verify-failed.html`](02-verify-failed.html) | Verification Error State | Exception Path: Attempt 2 of 3 Retry/Handoff |
| [`03-account-summary.html`](03-account-summary.html) | Account Delinquency Overview | Core Resolution Choice Hub |
| [`04a-promise-to-pay.html`](04a-promise-to-pay.html) | Future-Dated Promise to Pay (PTP) | Digital Commitment (≤ 30 Days) |
| [`04b-payment-plan.html`](04b-payment-plan.html) | Payment Plan Installment Setup | Structured Amortisation (3, 6, 9, 12 Months) |
| [`04d-card-payment.html`](04d-card-payment.html) | Immediate Card Settlement | Direct PCI-Compliant Balance Clearance |
| [`04c-book-appointment.html`](04c-book-appointment.html) | Book Phone Consultation | 20-Minute Telephony Case Booking |
| [`06b-dispute-hardship.html`](06b-dispute-hardship.html) | Dispute & Financial Hardship Intake | Vulnerability & Contested Balance Disclosure |
| [`05-confirmation.html`](05-confirmation.html) | Arrangement Confirmation & Receipt | Cryptographic Audit Receipt & SLA Timeline |
| [`06-routed-representative.html`](06-routed-representative.html) | Specialist Support Routing | Statutory 30-Day Breathing Space & Token |
| [`07-unhappy-lockout.html`](07-unhappy-lockout.html) | Security Lockout | Unhappy 1: 3-Attempt Security Freeze |
| [`08-unhappy-ptp-rejected.html`](08-unhappy-ptp-rejected.html) | PTP Date Ineligible | Unhappy 2: > 30-Day Policy Horizon Rejection |
| [`09-unhappy-plan-ineligible.html`](09-unhappy-plan-ineligible.html) | Plan Affordability Deficit | Unhappy 3: Standards of Lending Deficit |
| [`10-unhappy-no-slots.html`](10-unhappy-no-slots.html) | Capacity Full Fallback | Unhappy 4: 7-Day Protection Hold & 2h Callback |
| [`rep-workspace.html`](rep-workspace.html) | Representative Collections CRM | Frontline Operations & Real-Time Sync Console |
| [`management-reports.html`](management-reports.html) | Executive Management Reports | Operational Analytics & Audit Reconciliation |

---

## Detailed Screen Specifications

### 1. `01-landing.html` (Customer Landing Page)
* **Related User Story ID:**
  * `US-02`: Account Credential Lookup
  * `US-09`: Self-Service Eligibility Filter
  * `US-21`: Conversion Telemetry (Funnel Stage 1)
* **Key Data Shown:**
  * Bank branding (Legacy Trust Bank plc), SSL 256-bit encryption and FCA/PRA regulatory badges.
  * **Interactive Demo Persona Switcher (4 Selectable Customer Profiles):** One-click quick selection chips for Sarah Jenkins (£1,240.00), Marcus Vance (£350.00), David O'Connor (£2,800.00), and Priya Sharma (£520.00) that automatically populate credentials into the form.
  * Input fields: Account/Notice Reference (`LTB-8849-2104`) and Billing Postcode (`EC2A 4NE`).
  * Direct phone desk link for customers preferring not to use digital channels.
  * Value proposition benefit cards: Immediate Hold on Recovery Fees, Up to 30 Days to Pay, Flexible Plans up to 12 Months.
* **Validation or Business Rule:**
  * Alphanumeric account reference (`pattern="LTB-[0-9]{4}-[0-9]{4}"`) and valid UK postcode format.
  * Credential lookup against core ledger (`POST /api/v1/auth/lookup`); non-matching records return generic error without revealing account existence.
  * Ineligible accounts (`self_service_eligible = false` or `legal_flag = true`) are gated and routed to manual support.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Submits valid credentials $\rightarrow$ proceeds to [`02-verify.html`](02-verify.html).
  * *Alternative / Opt-Out:* Selects *"I prefer to speak to a representative"* $\rightarrow$ routes to [`06-routed-representative.html`](06-routed-representative.html).

---

### 2. `02-verify.html` (Two-Factor Identity Verification)
* **Related User Story ID:**
  * `US-01`: SMS 2FA Authentication
  * `US-02`: Account Credential Lookup
  * `US-03`: Session Auto-Logout
  * `US-04`: OTP Resend Rate Limiting
* **Key Data Shown:**
  * 4-step progress stepper (Step 1: Identity Verification active).
  * Masked mobile phone confirmation (`•••• 4921`) matching the active user.
  * Inputs: Date of Birth (`DD/MM/YYYY`) and 6-digit SMS Passcode (`pattern="[0-9]{6}"`).
  * Floating 1-minute session inactivity timer pill badge with live countdown.
  * Interactive modal triggers for Session Inactivity Warning and Rate Limit Enforcement.
* **Validation or Business Rule:**
  * DOB must match core customer record on file (`14/06/1985` for Sarah Jenkins).
  * SMS passcode expires in 5 minutes.
  * Inactivity limit: 45 seconds of user inactivity displays a 15-second modal warning; 60 seconds of inactivity terminates the session.
  * Resend cooldown: 60-second cooldown timer enforced between resend requests.
  * Rate limit cap: Maximum 3 resend attempts per hour; 4th request blocks SMS dispatch for 1 hour.
  * Failure limit: 3 consecutive failed verification attempts locks the session for 15 minutes.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Valid DOB and OTP submitted $\rightarrow$ advances to [`03-account-summary.html`](03-account-summary.html).
  * *Exception Path (Failed Attempt 2 of 3):* Invalid OTP entered $\rightarrow$ routes to [`02-verify-failed.html`](02-verify-failed.html).
  * *Unhappy Path (UH-01):* 3 consecutive failed verification attempts $\rightarrow$ routes to [`07-unhappy-lockout.html`](07-unhappy-lockout.html).

---

### 3. `02-verify-failed.html` (Exception Path: Failed Verification Attempt 2 of 3)
* **Related User Story ID:**
  * `US-01`: SMS 2FA Authentication (Error Handling)
  * `US-02`: Account Credential Lookup
  * `US-16`: Exception Queue Routing
* **Key Data Shown:**
  * High-visibility alert banner: *"Attempt 2 of 3 Failed: You have 1 attempt remaining"*.
  * Pre-populated invalid input field (`123456`) with distinct red error border and helper text.
  * 3 explicit action branches:
    1. Retry with correct code (Attempt 3 of 3).
    2. Simulate 3rd failure (triggers automated security lockout).
    3. Route directly to a telephone representative for manual identity verification.
* **Validation or Business Rule:**
  * System enforces a 3-attempt maximum threshold before automated security freeze.
  * Clear warning of impending lockout given after the 2nd failed attempt.
  * Preserves user data and pre-verified Account Reference without exposing full PII.
* **Next Steps in the Journey:**
  * *Branch 1 (Retry):* Re-enters code $\rightarrow$ advances to [`03-account-summary.html`](03-account-summary.html).
  * *Branch 2 (3rd Failure):* Submits invalid code again $\rightarrow$ routes to [`07-unhappy-lockout.html`](07-unhappy-lockout.html).
  * *Branch 3 (Representative Handoff):* Selects manual verification $\rightarrow$ routes to [`06-routed-representative.html?reason=failed-verification`](06-routed-representative.html).

---

### 4. `03-account-summary.html` (Account Delinquency Overview & Choice Hub)
* **Related User Story ID:**
  * `US-05`: Real-Time Balance Summary
  * `US-06`: Itemized Debt Details
  * `US-09`: Self-Service Eligibility Filter
* **Key Data Shown:**
  * Verified Account Reference (`LTB-8849-2104`), Customer Name (`Sarah M. Jenkins`), and Delinquency Duration (`34 Days Overdue`).
  * Total overdue arrears balance (`£1,240.00`) and remaining principal balance (`£5,400.00`).
  * Visual debt ratio progress bar showing arrears proportion of total credit facility.
  * Expandable itemized statement table (missed August & September principal/interest installments, £20 late assessment surcharges).
  * 5 resolution action cards: Promise to Pay, Payment Plan, Instant Card Settlement, Book Phone Call, and Dispute/Hardship Intake.
* **Validation or Business Rule:**
  * Confirms `self_service_eligible = true` and `legal_flag = false` before rendering self-service options.
  * Transparent fee itemization required before customer commits to financial solutions.
  * **Dynamic Zero-Balance Locking:** If the arrears balance is £0.00 (settled via card payment), Payment Plan and Promise-to-Pay cards are automatically disabled and locked with an "Account Up to Date" badge.
* **Next Steps in the Journey:**
  * *Action 1:* Selects Promise to Pay $\rightarrow$ [`04a-promise-to-pay.html`](04a-promise-to-pay.html).
  * *Action 2:* Selects Payment Plan $\rightarrow$ [`04b-payment-plan.html`](04b-payment-plan.html).
  * *Action 3:* Selects Pay Now $\rightarrow$ [`04d-card-payment.html`](04d-card-payment.html).
  * *Action 4:* Selects Book Phone Call $\rightarrow$ [`04c-book-appointment.html`](04c-book-appointment.html).
  * *Action 5:* Selects Dispute or Declare Hardship $\rightarrow$ [`06b-dispute-hardship.html`](06b-dispute-hardship.html).

---

### 5. `04a-promise-to-pay.html` (Future-Dated Promise to Pay)
* **Related User Story ID:**
  * `US-11`: Future-Dated Promise to Pay
  * `US-19`: Real-Time Status Write-Back
* **Key Data Shown:**
  * Total overdue arrears balance to settle dynamically recalled from active account ledger.
  * Interactive HTML5 date picker pre-bounded to policy limits.
  * Payment channel selector (Debit Card, Open Banking Instant Transfer, Telephone Banking).
  * Statutory legal commitment declaration checkbox.
* **Validation or Business Rule:**
  * Commitment date must fall within policy threshold of **$\le$ 30 calendar days** from current date.
  * Mandatory legal declaration acknowledgment must be checked before submission button activates.
  * Real-time status update: Committing writes `ptp_active = true` and `ptp_due_date` to core ledger tables within 2 seconds.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Valid date $\le$ 30 days submitted $\rightarrow$ advances to [`05-confirmation.html?type=ptp`](05-confirmation.html).
  * *Unhappy Path (UH-02):* User selects date > 30 days $\rightarrow$ routes to [`08-unhappy-ptp-rejected.html`](08-unhappy-ptp-rejected.html).

---

### 6. `04b-payment-plan.html` (Payment Plan Setup)
* **Related User Story ID:**
  * `US-10`: Payment Plan Selection
  * `US-19`: Real-Time Status Write-Back
* **Key Data Shown:**
  * Outstanding arrears balance dynamically calculated from active user state.
  * 4 calculated installment schedule options:
    * 3 Months: e.g. £413.33/month
    * 6 Months: e.g. £206.67/month
    * 9 Months: e.g. £137.78/month
    * 12 Months: e.g. £103.33/month
  * First installment payment date selector and payment collection method (Direct Debit, Standing Order, Continuous Card Authority).
  * Affordability declaration checkbox.
* **Validation or Business Rule:**
  * Maximum plan duration without manual credit underwriter approval is 12 months.
  * Monthly arrears interest and late administrative fees are frozen while plan remains active and maintained.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Selects plan and confirms schedule $\rightarrow$ advances to [`05-confirmation.html?type=plan`](05-confirmation.html).
  * *Unhappy Path (UH-03):* Customer cannot afford minimum monthly plan $\rightarrow$ routes to [`09-unhappy-plan-ineligible.html`](09-unhappy-plan-ineligible.html).

---

### 7. `04d-card-payment.html` (Immediate Card Settlement)
* **Related User Story ID:**
  * `US-12`: Card Payment Processing
  * `US-19`: Real-Time Status Write-Back
* **Key Data Shown:**
  * Total immediate settlement amount matching active account arrears.
  * Realistic debit card container with chip, bank logo, dynamic cardholder name, and masked number.
  * Simulated PCI DSS Level 1 certified gateway iFrame container (`DEP-02`).
  * Cardholder name, 16-digit card number, expiry date (MM/YY), CVV, and security encryption badge.
* **Validation or Business Rule:**
  * Strict PCI compliance: Web application never stores or handles raw PAN/CVV; card details are tokenized directly via the payment gateway vault.
  * Immediate ledger credit: Authorizing payment drops arrears balance from £1,240.00 $\rightarrow$ £0.00, sets `settled_in_full = true`, and dynamically generates a transaction receipt.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Authorises card settlement $\rightarrow$ advances to [`05-confirmation.html?type=card-payment`](05-confirmation.html).
  * *Cancellation:* Selects cancel $\rightarrow$ returns to [`03-account-summary.html`](03-account-summary.html).

---

### 8. `04c-book-appointment.html` (Book Phone Consultation)
* **Related User Story ID:**
  * `US-16`: Exception Queue Routing
  * Customer Scheduling Subflow (BPMN)
* **Key Data Shown:**
  * Channel restriction notice: **Telephone Consultation Only** (20 minutes).
  * Discussion topic selector (Affordability Review, Vulnerability & Health, Contested Charges, General Arrears Guidance).
  * Pre-filled customer contact telephone number (`+44 7700 900492`).
  * Date picker and available morning/afternoon time window slots (09:30, 11:15, 14:00, 16:30).
  * Optional advisor preparation notes input.
* **Validation or Business Rule:**
  * Appointments restricted to phone consultations between Monday and Friday, up to 14 days in advance.
  * Maximum booking capacity per slot enforced by scheduling engine.
* **Next Steps in the Journey:**
  * *Primary Happy Path:* Selects available slot and confirms $\rightarrow$ advances to [`05-confirmation.html?type=appointment`](05-confirmation.html).
  * *Unhappy Path (UH-04):* Selected date has no capacity $\rightarrow$ routes to [`10-unhappy-no-slots.html`](10-unhappy-no-slots.html).

---

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
  * Submits intake declaration $\rightarrow$ routes to [`06-routed-representative.html?reason=form-submitted`](06-routed-representative.html) with case queued for specialist assessment.

---

### 10. `05-confirmation.html` (Arrangement Confirmation & Audit Receipt)
* **Related User Story ID:**
  * `US-13`: Plan & P2P Multi-Channel Confirmations
  * `US-19`: Real-Time Status Write-Back
  * `US-20`: Immutable Audit Logging
* **Key Data Shown:**
  * Unique confirmation reference (`#LTB-CONF-884920`).
  * Summary receipt: Customer Name, Account Reference, Arrangement Type, Covered Amount (£1,240.00).
  * Multi-channel delivery confirmation (SMS to masked mobile and email to registered address).
  * Compliance verification hash (`sha256:7f83b165...`).
  * 3-step next steps timeline (Written confirmation $\rightarrow$ Late fees paused $\rightarrow$ 24h SMS reminder).
  * Print / Save PDF Summary action.
* **Validation or Business Rule:**
  * Atomic transaction write-back committed to database (`PUT /api/v1/ledgers/flags` - HTTP 200 OK).
  * Formal proof of agreement dispatched to customer across multiple channels.
* **Next Steps in the Journey:**
  * Selects *"Done & Exit Securely"* $\rightarrow$ terminates session and redirects to [`01-landing.html`](01-landing.html).
  * Internal staff can inspect real-time synchronized status in [`rep-workspace.html`](rep-workspace.html).

---

### 11. `06-routed-representative.html` (Specialist Support & Routing)
* **Related User Story ID:**
  * `US-14`: Outreach Suppression
  * `US-16`: Exception Queue Routing
  * `US-18`: Legal Review Handoff
* **Key Data Shown:**
  * 30-Day Statutory Breathing Space hold alert.
  * Unique Case Handover Token (`#LTB-HANDOVER-4491-VULN`) to eliminate customer repeating context.
  * Direct priority telephone desk number (`0800 456 7890`) and live wait-time estimate (< 2 minutes).
  * Scheduled phone callback booking button.
  * Impartial independent debt charity resource links (StepChange, Citizens Advice, National Debtline).
* **Validation or Business Rule:**
  * Statutory breathing space stops all recovery action and freezes interest/charges for a minimum of 30 days.
  * Case is assigned directly to the `Vulnerability_Team` or `Dispute_Specialists` queue with SLA tracking.
* **Next Steps in the Journey:**
  * Customer can call telephone banking directly, book a scheduled phone consultation ([`04c-book-appointment.html`](04c-book-appointment.html)), or return to [`01-landing.html`](01-landing.html).

---

### 12. `07-unhappy-lockout.html` (Unhappy 1: Security Lockout)
* **Related User Story ID:**
  * `US-01`: SMS 2FA Authentication
  * `US-16`: Exception Queue Routing
* **Key Data Shown:**
  * Security hold warning banner.
  * Security Incident Authorization Pin (`SEC-992-FAIL`).
  * Priority telephone security desk details and live phone wait time (< 3 minutes).
  * Scheduled phone callback booking option.
* **Validation or Business Rule:**
  * Triggered after 3 consecutive invalid OTP or credential verification entries.
  * Online portal access locked for 15 minutes to mitigate brute-force and credential stuffing attacks.
  * Incident flag logged to security metadata; access can only be restored via representative secondary identity verification.
* **Next Steps in the Journey:**
  * Customer books scheduled callback ([`04c-book-appointment.html`](04c-book-appointment.html)), calls security helpline, or returns to [`01-landing.html`](01-landing.html).

---

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
  * *Option A:* Returns to revise date within 30 days $\rightarrow$ [`04a-promise-to-pay.html`](04a-promise-to-pay.html).
  * *Option B:* Selects Payment Plan $\rightarrow$ [`04b-payment-plan.html`](04b-payment-plan.html).
  * *Option C:* Books phone consultation for human underwriter review $\rightarrow$ [`04c-book-appointment.html`](04c-book-appointment.html).

---

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
  * Customer books 20-min telephone review ([`04c-book-appointment.html`](04c-book-appointment.html)) or transfers to representative queue ([`06-routed-representative.html?reason=affordability`](06-routed-representative.html)).

---

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
  * Customer queues 2-hour callback $\rightarrow$ advances to [`05-confirmation.html?type=callback-queued`](05-confirmation.html) or picks a new date on [`04c-book-appointment.html`](04c-book-appointment.html).

---

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
  * **Collections Account Directory & Multi-Persona Portfolio Matrix:** Table monitoring all 4 active customer personas with account reference, borrower name, product & postcode, live arrears balance (dynamically showing `£0.00 CLEARED` upon payment), days overdue, risk profile, and one-click `"Inspect & Track"` profiling.
  * **Live Search by Reference, Name, or Postcode:** Interactive search input allowing frontline representatives to search by reference (`LTB-4412-8809`), borrower name (`Marcus`, `David`, `Priya`, `Sarah`), or UK postcode (`M1 4BT`, `G1 2DH`, `B1 1TT`, `EC2A 4NE`).
  * **Quick Account Selector Dropdown:** Instant dropdown switcher synchronized across all panels.
  * **Active Customer Context Banner:** Dynamic borrower name, active status badge, account reference, last activity timestamp, client IP, and channel. Includes one-click *"Open Customer View ↗"* and *"Initiate Outbound Call"* actions.
  * **Interactive Demo Toolbar:** Dynamic balance indicator for the active user, instant full balance clearance button (`£... → £0.00`), Log Hardship button, Log Dispute button, and Reset All Demo Data button.
  * **Account Snapshot Panel:** Verified borrower details, date of birth, product facility, direct contact number, full UK residential address, total principal balance, arrears balance, and overdue delinquency cycle.
  * **Real-Time Synchronized Database Flags:** Live synchronization of core flags (`self_service_eligible`, `ptp_active`, `payment_received`, `settled_in_full`, `outreach_suppression`, `hardship_flag`, `dispute_flag`, `legal_flag`).
  * **Recorded Customer Payments & Receipts Table:** Live transaction log capturing receipt IDs, UTC timestamps, amounts paid, payment channel (Debit Card / Virtual POS), principal/fee allocation breakdown, and settled ledger status.
  * **Recorded Customer Disputes & Financial Hardship Cases Table:** Live case tracking for vulnerability declarations and formal balance disputes with Case Token, category, reason code, customer statement, dialer suppression status, and assigned queue.
  * **Customer Communication & Dialer Activity Feed:** Chronological timeline of automated SMS reminders, formal default letters, OTP tokens, and telephony dialer outreach.
  * **Append-Only Compliance Audit Log:** Pre-filled historical audit records and live entries tracking `CARD_SETTLEMENT_FULL`, `HARDSHIP_INTAKE_SUBMITTED`, `DISPUTE_CLAIM_LOGGED`, `OUTREACH_SUPPRESSION_WRITEBACK`, and `STATUS_WRITEBACK`.
* **Validation or Business Rule:**
  * Submissions from the customer portal form [`06b-dispute-hardship.html`](06b-dispute-hardship.html), self-service payment gateway [`04d-card-payment.html`](04d-card-payment.html), or representative simulation buttons instantly update the active account ledger in `localStorage`.
  * Payments instantly clear the active arrears balance to £0.00, update the Account Directory table, mark `settled_in_full = true`, and dynamically lock payment plans on the customer side.
  * Automatically sets `outreach_suppression = true` and updates `hardship_flag` or `dispute_flag` in real-time (< 2 seconds).
* **Next Steps in the Journey:**
  * Representative can view customer handoff packet ([`06-routed-representative.html`](06-routed-representative.html)), inspect live customer portal state ([`03-account-summary.html`](03-account-summary.html)), or initiate outbound telephone contact.

---

### 17. `management-reports.html` (Executive Management Evaluation & Reconciliation Reports)
* **Related User Story ID:**
  * `US-20`: Immutable Audit Logging
  * `US-21`: Conversion Telemetry (Funnel Analysis)
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
