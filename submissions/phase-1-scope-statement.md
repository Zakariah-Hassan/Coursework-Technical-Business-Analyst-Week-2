# Phase 1 Scope Statement: Smart-Recovery Digital Self-Service Portal

**Document Reference:** LTB-BA-P1-SCOPE-2026-V1  
**Project:** Smart-Recovery (Collections Operations Modernisation)  
**Institution:** Legacy Trust Bank plc  
**Status:** Approved Delivery Baseline — Sprint Phase 1  
**Target Completion Horizon:** 4–6 Weeks (Lightweight REST Wrapper Architecture)  

---

## Executive Summary & Scope Credibility

This document establishes the official Phase 1 scope boundary for the **Smart-Recovery Self-Service Portal**, designed to transition Legacy Trust Bank from a fragile, 200-sheet manual spreadsheet tracking process to an automated, auditable digital collections workflow.

### Why This Scope Is Credible
* **Top-Ranked Value Driver Alignment:** Prioritises the highest-ROI automation opportunities identified in baseline analysis:
  * **SO-01:** Real-time balance and arrears inquiries (addressing 12.49% of customer inquiries).
  * **SO-03:** Pre-approved structured installment payment plans (3, 6, 9, 12 months).
  * **SO-04:** Automated binding Promise-to-Pay (PTP) commitments within policy limits (<= 30 days).
  * **SO-06:** Dedicated frontline representative workspace with real-time customer context, eliminating manual spreadsheet re-keying.
* **Delivery Feasibility via Lightweight Wrappers:** Avoids high-risk, multi-million-pound core database refactoring by deploying a lightweight REST API wrapper (`DEP-01`) and direct status parameter write-backs (`DEP-03`: `dispute_flag = 1`, `ptp_active = 1`, `outreach_suppression = 1`).
* **Compliance & Vulnerability Safeguards:** Directly satisfies FCA Consumer Duty and Lending Standards by integrating immediate automated outreach suppression (< 2 seconds) and statutory 30-day breathing space holds upon dispute or hardship intake disclosure (`US-14`, `US-15`).

---

## 1. Stakeholder Change Readiness Assessment (ADKAR Framework)

| Stakeholder Group | Awareness (A) | Desire (D) | Knowledge (K) | Ability (A) | Reinforcement (R) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Collections Representatives** | **High:** Frontline reps recognise the legacy core database and 200-sheet Excel tracker are broken, wasting **2.86 hours per day** on manual re-keying and status cross-referencing. | **Low–Medium:** Fear that self-service automation will either dump broken cases onto their desks or threaten job security. Resistance from veteran reps who consider offline workarounds faster than official banking systems. | **Medium:** High familiarity with collections domain and customer negotiation, but zero experience operating a unified web portal interface or managing Camunda 8 SLA callback timers. | **Low:** High risk of reps bypassing the official system if the portal lacks account context or forces double data entry into core ledgers. | **Medium:** Requires clear operational KPIs that reward portal adoption, status tag accuracy, and clean escalation handoffs rather than raw call handle time alone. |
| **Team Leaders & Operations Managers** | **High:** Acute awareness of operational friction, audit vulnerabilities, and the estimated **£500,000 annual loss** caused by spreadsheet reconciliation failures. | **High:** Strong motivation to eliminate month-end reconciliation waste and establish real-time operational visibility across agent queues. | **Medium:** Requires structured training on interpreting real-time manager observability dashboards, monitoring SLA boundary timers, and handling automated exception escalations. | **Medium:** Ability is constrained if the To-Be system fails to write real-time status flags (`dispute_flag = 1`, `ptp_active = 1`) back to core database tables (`DEP-03`). | **High:** High-visibility dashboard metrics, automated daily reconciliation reports, and audit trail access reinforce managerial control. |
| **Delinquent Customers** | **Low–Medium:** Customers missing payments are frequently unaware that a digital self-service portal exists, assuming they must make phone calls during restricted bank operating hours. | **High:** Strong desire for discreet, 24/7 digital resolution that gives them control over debt breakdowns without feeling pressured, rushed, or judged on live phone calls. | **Medium–Low:** Varying digital literacy levels. Customers will struggle if 2FA authentication, balance breakdowns, or installment plan selection steps are complex or jargon-heavy. | **High (Conditional):** If the portal errors out, lacks flexible pre-approved plans, or fails to confirm commitments instantly, customer ability collapses, causing abandonment to phone queues. | **High:** Instant SMS/email digital confirmations and automated reminders 48 hours prior to PTP due dates reinforce positive payment behavior and trust. |

---

## 2. Change & Adoption Risk Management

### Risk 1: Rep System Bypass & Shadow Spreadsheet Persistence
* **Risk Description:** Experienced representatives ignore the new portal and continue using local shadow Excel trackers because they believe offline workarounds are faster or more familiar.
* **ADKAR Failure Point:** Desire & Ability (Collections Representatives).
* **Designed Phase 1 Mitigation Action:**
  * **Deliver Rep Interaction History Portal (`US-07` / `SO-06`):** Provide a dedicated frontline workspace displaying real-time customer portal actions, active PTPs, payments, and outreach history.
  * **Eliminate Double-Entry:** Ensure core database status write-backs (`DEP-03`) update rep feeds automatically, saving 2.86 hours/day per rep and removing the operational need for shadow spreadsheets.
  * **Adoption Champions:** Enlist Gareth Evans (Operations Lead) to co-design rep portal screens during sprint reviews to guarantee frontline usability and workflow alignment.

### Risk 2: Customer Portal Abandonment Due to Brittle or Confusing UX
* **Risk Description:** Customers encounter friction during 2FA login, balance lookup, or plan selection, causing them to abandon self-service and flood phone queues or default on debts.
* **ADKAR Failure Point:** Knowledge & Ability (Customers).
* **Designed Phase 1 Mitigation Action:**
  * **Frictionless 2FA (`US-01` / `DEP-04`):** Authenticate using simple Account Reference / DOB paired with dynamic 6-digit SMS OTP.
  * **Clear Pre-Approved Schedules (`US-10` / `SO-03`):** Present 3–4 transparent, pre-calculated monthly installment options (3, 6, 9, 12 months) with complete fee and interest freeze.
  * **Instant Confirmation Dispatch (`US-13`):** Send immediate SMS and PDF email payment receipts within 60 seconds of transaction commitment to build trust.

### Risk 3: Manager Observability Gap & Queue Misallocation
* **Risk Description:** Team leaders cannot monitor self-service deflection, queue progression, or representative SLA performance, leading to unaddressed exception queues and manager resistance.
* **ADKAR Failure Point:** Knowledge & Reinforcement (Team Leaders).
* **Designed Phase 1 Mitigation Action:**
  * **Real-Time Ledger Status Flags (`US-19` / `DEP-03`):** Asynchronously write parameter status tags (`dispute_flag = 1`, `ptp_active = 1`, `outreach_suppression = 1`) directly to core database tables.
  * **Team Leader Dashboard View (`US-23`):** Provide real-time supervisor visibility into deflected volume, active PTPs, and overdue SLA callback alerts without manual spreadsheet cross-referencing.

### Risk 4: Unmanaged Hardship & Dispute Intake Handling
* **Risk Description:** Customers declare financial hardship or dispute an arrears balance online, but automated collections outreach continues, exposing the bank to severe FCA compliance fines and ombudsman disputes.
* **ADKAR Failure Point:** Desire & Ability (Compliance & Representatives).
* **Designed Phase 1 Mitigation Action:**
  * **Digital Dispute & Hardship Intake Form (`US-15`):** Provide a structured self-service disclosure form in the customer portal.
  * **Instant Automated Outreach Suppression (`US-14`):** Automatically toggle `outreach_suppression = true` in core ledgers within < 2 seconds upon form submission, freezing all dialer/email campaigns.
  * **Rules-Based Exception Queue Routing (`US-16` / `SO-05`):** Automatically route exception accounts to human specialist queues with attached SLA callback timers (24h Vulnerability, 48h Dispute).

---

## 3. Feature Prioritization Matrix (MoSCoW Framework)

| Feature Name | Priority | Primary Stakeholder Owner | Detailed Scope Justification |
| :--- | :---: | :--- | :--- |
| **Identity Verification** | **Must** | Daniel Okoye (Compliance) & Priya Nair (Product) | **Essential Security & Data Privacy:** Requires 2FA (SMS OTP via `DEP-04` + Account Reference / DOB) before revealing financial details. Mandatory for regulatory compliance and protecting customer data privacy. |
| **Account Summary & Eligible Actions** | **Must** | Priya Nair (Product) & Customers | **Core Value Driver (`SO-01`):** Real-time balance and arrears lookup addresses the primary driver of customer inbound volume, deflecting routine inquiries across straightforward accounts. |
| **Promise-to-Pay (PTP)** | **Must** | Gareth Evans (Ops Lead) & Priya Nair (Product) | **High ROI Solution (`SO-04`):** Directly solves the missed follow-up rate by capturing binding digital payment commitments within policy thresholds (<= 30 days), generating immediate recovery uplift. |
| **Eligible Payment Plan Collection** | **Must** | Priya Nair (Product) & Gareth Evans (Ops Lead) | **Top ROI Ranked Solution (`SO-03`):** Automates structured repayment schedule selection (3, 6, 9, 12 months) for pre-approved delinquent accounts, delivering strong net financial returns. |
| **Interaction History Portal for Reps** | **Must** | Gareth Evans (Ops Lead) | **Frontline Efficiency & Context (`SO-06`):** Allows representatives to view portal interaction logs and self-service outcomes via dedicated rep-side UI screens, eliminating manual spreadsheet re-keying. |
| **Portal Metadata Tracking** | **Must** | Daniel Okoye (Compliance) & Priya Nair (Product) | **Auditability & Observability (`SO-06`):** Captures timestamped interaction logs and updates status flags (`dispute_flag`, `ptp_active`) directly in core ledgers for manager tracking and audit defense. |
| **Rules-Based Exception Routing & Escalation** | **Must** | Gareth Evans (Ops Lead) & Daniel Okoye (Compliance) | **Operational Alignment (`SO-05`):** Automated routing engine that evaluates incoming case flags and automatically passes exception cases directly to representative queues for human handling. |
| **Dispute & Hardship Digital Intake Form** | **Must** | Daniel Okoye (Compliance) & Gareth Evans (Ops Lead) | **Regulatory Safeguard:** Self-service form allowing customers to submit balance disputes or vulnerability declarations. Sets `outreach_suppression = true` and triggers exception routing to human reps. |
| **Automated First Contact Emails** | **Could** | Priya Nair (Product) | **Proactive Outreach Enhancement (`SO-08`):** Sends automated digital notices upon delinquency detection. Highly beneficial for early call deflection, but non-blocking for baseline portal launch. |
| **Automated Follow-up Reminders** | **Could** | Gareth Evans (Ops Lead) | **PTP Enforcement Booster (`SO-07`):** Sends automated SMS/email reminders 48 hours before a promised payment date. Enhances collection rates but deferred to a fast-follow iteration. |
| **Legacy Data Storage Rework** | **Won't** | Priya Nair (Product) & Daniel Okoye (Compliance) | **High Cost / Extreme Risk:** Overhauling the 20-year-old core database schema introduces massive technical risk and budget inflation. Phase 1 relies on a lightweight REST API wrapper (`DEP-01`). |
| **Full Affordability Assessment & Forbearance Decisions** | **Won't** | Daniel Okoye (Compliance) & Gareth Evans (Ops Lead) | **Clarified Out-of-Scope:** Complex affordability calculations and formal forbearance decisions require human empathy and specialist judgment. Phase 1 captures customer intake declarations and hands off to human reps. |
| **Bespoke Repayment Negotiation** | **Won't** | Gareth Evans (Ops Lead) | **Operational Overhead:** Custom, non-standard payment terms cannot be governed safely by automated portal rules. Phase 1 limits self-service to pre-approved policy schedules. |
| **Legal Escalation Workflow** | **Won't** | Daniel Okoye (Compliance) | **Out of Phase 1 Scope:** Late-stage debt litigation and legal enforcement workflows are handled outside the portal. The To-Be workflow explicitly maps the Legal & Compliance Review Handoff Point. |
| **High Risk Routing Engine** | **Won't** | Daniel Okoye (Compliance) | **Algorithmic Complexity (`SO-05`):** Complex algorithmic queue scoring ranks low in net ROI relative to high development effort. High-risk accounts are filtered at ingestion and directed to human teams. |
| **Customer Account Detail Alterations** | **Won't** | Priya Nair (Product) | **Secondary Priority:** Allowing customers to update primary residential addresses or legal names online introduces fraud verification complexity, deferred to Phase 2. |

---

## 4. Technical Dependencies & Architecture Risk Matrix

| Dependency ID | Dependency Name | Primary Source Artifact | System Owner / Responsible Team | Technical Scope & Lightweight Wrapper Mechanics |
| :---: | :--- | :--- | :--- | :--- |
| **DEP-01** | **Core DB REST API Wrapper** | `stakeholder_interview_notes.csv` (SN-11) & Case Study Context | **Owner TBC** *(Delivery Risk #1)* | Lightweight API wrapper providing read/write REST endpoints to query arrears balances and register payment schedules without database schema modifications. |
| **DEP-02** | **Payment Gateway Integration** | `automation-opportunity_Solutions.csv` (SO-03) | **Owner TBC** *(Delivery Risk #2)* | Integration with existing enterprise PCI-compliant bank payment gateway for instant debit card clearance and Direct Debit tokenization. |
| **DEP-03** | **Real-Time Ledger Status Flag Writing** | Stakeholder Interview & `Solutions.csv` (SO-06) | **Owner TBC** *(Delivery Risk #3)* | **Lightweight Wrapper Architecture:** Aligns fully with the lightweight wrapper approach by sending parameter write requests (`dispute_flag = 1`, `ptp_active = 1`, `outreach_suppression = 1`) through API endpoints to update existing status columns in core database tables, avoiding core schema overhauls while delivering real-time manager observability. |
| **DEP-04** | **Enterprise SMS / OTP Gateway** | Security & Compliance 2FA Mandate | **Owner TBC** *(Delivery Risk #4)* | Enterprise SMS gateway integration required to dispatch dynamic, time-limited 6-digit 2FA verification passcodes for mandatory customer authentication. |

---

## 5. Execution Readiness & Implementation Timeline

| Phase 1 Deliverable | Estimated Effort | Dependencies & Blockers | Key Stakeholders |
| :--- | :---: | :--- | :--- |
| **Target To-Be Workflow & Exception Paths** *(Camunda 8 / BPMN)* | **6 – 8 Hours** | Locked As-Is Baseline and Core DB REST API (`DEP-01`). Must map all complex escalation pathways (rules-based exception routing, dispute/hardship intake forms), customer timeout triggers, and an explicit Legal & Compliance Review Handoff Point requested by Gareth and Daniel. | Gareth Evans (Ops Lead), Daniel Okoye (Compliance) |
| **Prioritized Jira Backlog & Technical User Stories** | **8 – 10 Hours** | Target To-Be Workflow. Requires detailed technical user stories and clear Given-When-Then acceptance criteria for core Phase 1 customer features, Rep Interaction History Portal screens, and technical integrations (`DEP-01` to `DEP-04`). | Priya Nair (Product), Gareth Evans (Ops Lead), Daniel Okoye (Compliance) |
| **Rapid AI-Built Clickable Customer & Rep Prototype** | **6 – 8 Hours** | Phase 1 Scope Definition & Technical User Stories. Must visually prove and validate both the end-to-end customer journey (2FA SMS OTP via `DEP-04`, balance lookup, P2P/plan setup, dispute/hardship intake) and the Rep-Side Interaction History Portal to match backlog stories. | Priya Nair (Product), Delinquent Customers, Gareth Evans (Ops Lead) |
| **Adoption & Change Management Risk Plan** *(ADKAR Framework)* | **4 – 5 Hours** | To-Be Workflow & Rep Capacity Savings Model. Must address operational rollout risks, user adoption friction for the Rep Portal, training on exception routing handoffs, and manager observability via `DEP-03` status flags. | Gareth Evans (Ops Lead) |
| **'State of the Product' Executive Slide Deck** *(Pyramid Principle)* | **8 – 10 Hours** | All Prior Execution Deliverables. Structured top-down using the Pyramid Principle to present the high-ROI business case while explicitly highlighting owner team risks (Owner TBC) and compliance mitigations to secure Daniel Okoye's final funding sign-off. | Daniel Okoye (Compliance), Priya Nair (Product), Gareth Evans (Ops Lead) |
