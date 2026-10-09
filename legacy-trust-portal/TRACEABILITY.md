# Legacy Trust Bank - Customer Resolution Portal Prototype
## Full Traceability Matrix against `user_stories_v2.csv` & `to-be-process-map.bpmn`

This prototype is built strictly with **semantic HTML5 and modern CSS3** (zero JavaScript required) and provides comprehensive end-to-end coverage of all 21 user stories across the 5 project epics.

---

### Epic 1: Access and Verification
* **US-01 (SMS 2FA Authentication):** Implemented in [02-verify.html](02-verify.html). Demonstrates Account Reference + DOB verification triggering a 6-digit SMS OTP to masked mobile `•••• 4921`. Includes simulated intermediate failed verification [02-verify-failed.html](02-verify-failed.html) (Attempt 2 of 3) and 15-minute security lockout after 3 failed attempts ([07-unhappy-lockout.html](07-unhappy-lockout.html)).
* **US-02 (Account Credential Lookup):** Integrated in [01-landing.html](01-landing.html) and [02-verify.html](02-verify.html), showing `POST /api/v1/auth/lookup` response, account recognition badge, and masked telephone confirmation.
* **US-03 (Session Auto-Logout):** Implemented via a pure CSS modal trigger in [02-verify.html#modal-timeout](02-verify.html#modal-timeout) showing the 13-minute inactivity warning with a 120-second countdown timer pill (`⏱️ 01:58`).
* **US-04 (OTP Resend Rate Limiting):** Implemented with interactive pure-CSS modal states in [02-verify.html#modal-resend](02-verify.html#modal-resend) (60-second cooldown timer) and [02-verify.html#modal-ratelimit](02-verify.html#modal-ratelimit) (blocking 4th attempt within 60 minutes with *"Maximum OTP requests reached. Please try again in 1 hour"* message).

---

### Epic 2: Account Visibility
* **US-05 (Real-Time Balance Summary):** Implemented in [03-account-summary.html](03-account-summary.html) reflecting real-time core ledger response (`GET /api/v1/accounts/{id}/balance`), total balance, overdue arrears (£1,240.00), and 34 days delinquent badge.
* **US-06 (Itemized Debt Details):** Implemented in [03-account-summary.html](03-account-summary.html) with an expandable table breaking down missed August & September principal/interest installments and £20 late assessment surcharges.
* **US-07 (Representative Account Workspace):** Dedicated internal operations screen in [rep-workspace.html](rep-workspace.html) providing live account search, arrears snapshot, active commitments, and customer interaction logs.
* **US-08 (Outreach Activity Feed):** Fully rendered in [rep-workspace.html](rep-workspace.html) showing chronological audit logs of SMS passcodes, default letters, reminders, and late fee events.
* **US-09 (Self-Service Eligibility Filter):** Visible badge and routing check on [03-account-summary.html](03-account-summary.html) verifying `self_service_eligible = true` and `legal_flag = false`.

---

### Epic 3: Promise-to-Pay / Payment-Plan Journey
* **US-10 (Payment Plan Selection):** Implemented in [04b-payment-plan.html](04b-payment-plan.html) presenting interactive 3, 6, 9, and 12-month installment schedules with fee/interest freeze notices.
* **US-11 (Future-Dated Promise to Pay):** Implemented in [04a-promise-to-pay.html](04a-promise-to-pay.html) allowing dates up to **30 calendar days**, with legal declaration and real-time ledger flag updates (`ptp_active = true`, `ptp_due_date`). Accompanied by policy exception page [08-unhappy-ptp-rejected.html](08-unhappy-ptp-rejected.html) when requesting dates >30 days.
* **US-12 (Card Payment Processing):** Dedicated screen in [04d-card-payment.html](04d-card-payment.html) embedding a simulated PCI-compliant Payment Gateway iFrame container (DEP-02) for immediate card settlement.
* **US-13 (Plan & P2P Confirmations):** Implemented in [05-confirmation.html](05-confirmation.html) with written confirmation notice dispatching via SMS to `•••• 4921` and email to registered address.

---

### Epic 4: Routing and Exception Handling
* **US-14 (Outreach Suppression):** Displayed prominently on [06b-dispute-hardship.html](06b-dispute-hardship.html), [06-routed-representative.html](06-routed-representative.html), and synced to [rep-workspace.html](rep-workspace.html) where `outreach_suppression = true` immediately halts dialer campaigns and collection letters within < 2s.
* **US-15 (Dispute & Hardship Form):** Dedicated intake screen [06b-dispute-hardship.html](06b-dispute-hardship.html) capturing dispute reason codes (`ERR_CALC`, `FEE_DISPUTE`, `SUSPECTED_FRAUD`, `HARDSHIP_HEALTH`, `HARDSHIP_INCOME`), customer statement, and document upload mock. Live submissions write directly to the representative audit trail and case list.
* **US-16 (Exception Queue Routing):** Demonstrated in [rep-workspace.html](rep-workspace.html) and [06-routed-representative.html](06-routed-representative.html) showing real-time routing to `Dispute_Specialists` and `Vulnerability_Team` queues.
* **US-17 (SLA Callback Escalations):** Illustrated in [rep-workspace.html](rep-workspace.html) with boundary timer status showing an Amber indicator (42 minutes remaining) before escalating to Team Lead.
* **US-18 (Legal Review Handoff):** Reflected in [rep-workspace.html](rep-workspace.html) via manual management escalation triggers (`legal_flag` toggles).

---

### Epic 5: Reporting and Audit Trail
* **US-19 (Real-Time Status Write-Back):** Visible on [05-confirmation.html](05-confirmation.html) and [rep-workspace.html](rep-workspace.html) showing the `PUT /api/v1/ledgers/flags` 200 OK commit within 2 seconds.
* **US-20 (Immutable Audit Logging):** Table rendered in [rep-workspace.html](rep-workspace.html) pre-filled with authentic historical entries and live events capturing payments, hardship declarations (`HARDSHIP_INTAKE_SUBMITTED`), dispute claims (`DISPUTE_CLAIM_LOGGED`), and dialer suppression (`OUTREACH_SUPPRESSION_WRITEBACK`).
* **US-21 (Conversion Telemetry):** Built into the multi-step navigation structure mapping user funnel progression (Auth $\rightarrow$ Summary $\rightarrow$ Plan/PTP Selection $\rightarrow$ Confirmation) with abandonment fallbacks.

---

### Unhappy Paths & Edge Scenarios

| Unhappy Path ID | Screen File | Trigger Condition | UX Resolution & Safety Fallback |
| :--- | :--- | :--- | :--- |
| **UH-01A** | [02-verify-failed.html](02-verify-failed.html) | Invalid OTP passcode entered (Attempt 2 of 3) | **Inline Error & Remaining Attempt Warning:** Input turns red with warning banner; customer can retry attempt 3, trigger lockout, or hand off to representative. |
| **UH-01B** | [07-unhappy-lockout.html](07-unhappy-lockout.html) | 3 consecutive invalid OTP entries | **15-Minute Session Freeze:** Displays incident reference `SEC-992-FAIL` and routes to priority telephone queue. |
| **UH-02** | [08-unhappy-ptp-rejected.html](08-unhappy-ptp-rejected.html) | PTP date selected > 30 days | **Policy Horizon Gate:** Explains 30-day limit; offers payment plan or advisor review. |
| **UH-03** | [09-unhappy-plan-ineligible.html](09-unhappy-plan-ineligible.html) | Standard 3–12m installments unaffordable | **Affordability Protection:** Prevents unsustainable debt; transfers to bespoke income/expenditure review. |
| **UH-04** | [10-unhappy-no-slots.html](10-unhappy-no-slots.html) | Advisor capacity full on selected day | **Automated 7-Day Hold:** Prevents arrears escalation; queues asynchronous telephone callback within 2 hours. |
| **UH-05** | [06-routed-representative.html](06-routed-representative.html) | Self-reported vulnerability / dispute | **30-Day Statutory Breathing Space:** Halts collection activities; produces Handover Token `#LTB-HANDOVER-4491-VULN`. |
| **UH-06** | [02-verify.html#modal-timeout](02-verify.html#modal-timeout) | 13 minutes of user inactivity | **Inactivity Security Modal:** 120s countdown warning before session invalidation. |
| **UH-07** | [02-verify.html#modal-ratelimit](02-verify.html#modal-ratelimit) | 4th OTP request within 60 minutes | **Rate Limiter Block:** Enforces 1-hour cooldown to protect SMS gateway costs. |
