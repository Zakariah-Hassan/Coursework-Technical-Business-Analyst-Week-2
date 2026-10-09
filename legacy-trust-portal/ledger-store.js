/**
 * Legacy Trust Bank - Core Ledger & State Management Store
 * Handles:
 * 1. Persistent account balance (£1,240.00 -> £0.00 on payment)
 * 2. Payment history records (Amount, Date/Time, Payment Channel, Receipt Ref)
 * 3. Pre-filled comprehensive Immutable Compliance Audit Log
 * 4. Pre-filled Outreach Activity Feed
 * 5. Dynamic UI adaptation across Customer Portal & Rep Workspace
 */

const LTB_STORAGE_KEY = 'ltb_core_ledger_v2';

const LTB_DEFAULT_STATE = {
  accountRef: 'LTB-8849-2104',
  borrowerName: 'Sarah M. Jenkins',
  dob: '14/06/1985',
  totalPrincipal: 5400.00,
  initialArrears: 1240.00,
  arrearsBalance: 1240.00,
  isPaid: false,
  daysOverdue: 34,
  payments: [],
  // Pre-filled hardship and dispute case records
  disputesAndHardships: [
    {
      caseId: 'CASE-HARDSHIP-4491',
      token: '#LTB-HANDOVER-4491-VULN',
      timestamp: '2026-10-09 10:43:55',
      displayTime: 'Today, 10:43 UTC',
      category: 'Financial Hardship',
      reasonCode: 'HARDSHIP_INCOME (Redundancy / Loss of Income)',
      statement: 'Customer notified of redundancy at end of July. Universal Credit pending. Statutory 30-day breathing space initiated.',
      assignedQueue: 'Vulnerability_Team',
      suppressionStatus: 'ACTIVE (Suppressed < 2s)',
      status: 'Open (Under Assessment)'
    },
    {
      caseId: 'CASE-DISP-8849',
      token: '#LTB-DISP-8849-FEE',
      timestamp: '2026-09-15 14:22:10',
      displayTime: '15 Sep 2026, 14:22 UTC',
      category: 'Balance Dispute',
      reasonCode: 'FEE_DISPUTE (Late Assessment Charges)',
      statement: 'Customer queried £40.00 late assessment fees applied while branch communication was open. Fee review task queued.',
      assignedQueue: 'Dispute_Specialists',
      suppressionStatus: 'REVIEW COMPLETED',
      status: 'Resolved (Fee Upheld - Hardship Concession Applied)'
    }
  ],
  // Pre-filled authentic historical audit entries
  auditLogs: [
    {
      timestamp: '2026-10-09 10:43:55',
      actor: 'CUSTOMER_PORTAL',
      action: 'HARDSHIP_INTAKE_SUBMITTED',
      field: 'hardship_flag',
      oldVal: '0 (INACTIVE)',
      newVal: '1 (ACTIVE - 30D BREATHING SPACE)'
    },
    {
      timestamp: '2026-10-09 10:43:56',
      actor: 'LEDGER_API_DEP03',
      action: 'OUTREACH_SUPPRESSION_WRITEBACK',
      field: 'outreach_suppression',
      oldVal: '0 (FALSE)',
      newVal: '1 (TRUE - SUPPRESSED IN < 2S)'
    },
    {
      timestamp: '2026-10-09 10:43:56',
      actor: 'CAMUNDA_WORKFLOW',
      action: 'EXCEPTION_QUEUE_ROUTING',
      field: 'assigned_queue',
      oldVal: 'GENERAL_COLLECTIONS',
      newVal: 'VULNERABILITY_TEAM (SLA: 2h)'
    },
    {
      timestamp: '2026-10-09 10:44:02',
      actor: 'CUSTOMER_PORTAL',
      action: 'PTP_COMMITMENT',
      field: 'ptp_due_date',
      oldVal: 'NULL',
      newVal: '2026-10-30'
    },
    {
      timestamp: '2026-10-09 10:44:02',
      actor: 'LEDGER_API_DEP03',
      action: 'STATUS_SYNC',
      field: 'ptp_active',
      oldVal: '0',
      newVal: '1 (TRUE)'
    },
    {
      timestamp: '2026-10-09 10:43:18',
      actor: 'CUSTOMER_PORTAL',
      action: 'AUTH_SUCCESS',
      field: 'last_auth_method',
      oldVal: 'PASSWORD',
      newVal: '2FA_SMS_OTP'
    },
    {
      timestamp: '2026-10-09 10:42:01',
      actor: 'API_GATEWAY',
      action: 'CRED_LOOKUP',
      field: 'lookup_status',
      oldVal: 'NONE',
      newVal: 'MATCHED_200'
    },
    {
      timestamp: '2026-10-05 08:30:22',
      actor: 'NOTIFICATION_ENGINE',
      action: 'SMS_REMINDER',
      field: 'outreach_count',
      oldVal: '1',
      newVal: '2'
    },
    {
      timestamp: '2026-09-15 14:22:10',
      actor: 'CUSTOMER_PORTAL',
      action: 'DISPUTE_CLAIM_LOGGED',
      field: 'dispute_flag',
      oldVal: '0 (NONE)',
      newVal: '1 (FEE_DISPUTE_CLAIM)'
    },
    {
      timestamp: '2026-09-15 14:22:11',
      actor: 'CAMUNDA_WORKFLOW',
      action: 'DISPUTE_QUEUE_ROUTING',
      field: 'assigned_queue',
      oldVal: 'GENERAL_COLLECTIONS',
      newVal: 'DISPUTE_SPECIALISTS'
    },
    {
      timestamp: '2026-09-12 11:00:00',
      actor: 'CORE_BATCH_JOB',
      action: 'FEE_ASSESSMENT',
      field: 'late_fee_balance',
      oldVal: '£20.00',
      newVal: '£40.00'
    },
    {
      timestamp: '2026-09-05 23:59:59',
      actor: 'CORE_LEDGER',
      action: 'MISSED_DUE_DATE',
      field: 'delinquency_cycle',
      oldVal: '1',
      newVal: '2 (30+ Days)'
    },
    {
      timestamp: '2026-08-12 11:00:00',
      actor: 'CORE_BATCH_JOB',
      action: 'FEE_ASSESSMENT',
      field: 'late_fee_balance',
      oldVal: '£0.00',
      newVal: '£20.00'
    },
    {
      timestamp: '2026-08-05 23:59:59',
      actor: 'CORE_LEDGER',
      action: 'MISSED_DUE_DATE',
      field: 'delinquency_cycle',
      oldVal: '0',
      newVal: '1 (1-30 Days)'
    }
  ],
  // Pre-filled outreach communications feed
  outreachFeed: [
    {
      timestamp: '2026-10-09 10:43:56',
      channel: 'HARDSHIP',
      summary: 'Financial Hardship Intake received. 30-Day Statutory Breathing Space activated. Automated dialer and SMS outreach paused.',
      status: 'Hold Placed',
      badgeClass: 'background:#fef3c7; color:#92400e;'
    },
    {
      timestamp: '2026-10-09 10:42:12',
      channel: 'SMS',
      summary: '2FA Passcode dispatched to •••• 4921 (Token matched)',
      status: 'Delivered',
      badgeClass: 'background:#e0f2fe; color:#0369a1;'
    },
    {
      timestamp: '2026-10-09 09:15:00',
      channel: 'EMAIL',
      summary: 'Formal Notice of Default Arrears (£1,240.00 overdue balance alert)',
      status: 'Opened',
      badgeClass: 'background:#f1f5f9; color:#334155;'
    },
    {
      timestamp: '2026-10-05 08:30:22',
      channel: 'SMS',
      summary: 'Urgent payment reminder: Monthly installment missed for loan LTB-8849-2104',
      status: 'Delivered',
      badgeClass: 'background:#e0f2fe; color:#0369a1;'
    },
    {
      timestamp: '2026-09-15 14:22:15',
      channel: 'DISPUTE',
      summary: 'Dispute Case Logged: Customer raised inquiry on £40 late fee charges. Case assigned to Dispute Specialists.',
      status: 'Assigned',
      badgeClass: 'background:#fee2e2; color:#b91c1c;'
    },
    {
      timestamp: '2026-09-12 11:00:00',
      channel: 'SYSTEM',
      summary: 'Late assessment administration surcharge of £20.00 applied to ledger',
      status: 'Posted',
      badgeClass: 'background:#f1f5f9; color:#334155;'
    }
  ]
};

// Retrieve current state from localStorage or seed defaults
function getLedgerState() {
  try {
    const raw = localStorage.getItem(LTB_STORAGE_KEY);
    if (!raw) {
      saveLedgerState(LTB_DEFAULT_STATE);
      return JSON.parse(JSON.stringify(LTB_DEFAULT_STATE));
    }
    const state = JSON.parse(raw);
    // Ensure disputesAndHardships is initialized
    if (!state.disputesAndHardships || state.disputesAndHardships.length === 0) {
      state.disputesAndHardships = JSON.parse(JSON.stringify(LTB_DEFAULT_STATE.disputesAndHardships));
      saveLedgerState(state);
    }
    return state;
  } catch (e) {
    return JSON.parse(JSON.stringify(LTB_DEFAULT_STATE));
  }
}

// Save state to localStorage
function saveLedgerState(state) {
  try {
    localStorage.setItem(LTB_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

// Reset state to initial overdue balance of £1,240.00
function resetLedgerState() {
  localStorage.removeItem(LTB_STORAGE_KEY);
  return getLedgerState();
}

// Process a payment
function executePayment(amount, method) {
  const state = getLedgerState();
  const previousArrears = state.arrearsBalance;
  const payAmount = Number(amount) || state.arrearsBalance;
  
  state.arrearsBalance = Math.max(0, previousArrears - payAmount);
  state.isPaid = (state.arrearsBalance === 0);
  state.daysOverdue = state.isPaid ? 0 : state.daysOverdue;

  const now = new Date();
  const utcFormatted = now.toISOString().replace('T', ' ').substring(0, 19);
  const localTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const paymentRecord = {
    id: 'PAY-' + Math.floor(100000 + Math.random() * 900000),
    amount: payAmount,
    timestamp: utcFormatted,
    displayTime: 'Today, ' + localTime + ' UTC',
    method: method || 'Debit Card (•••• 4012)',
    receiptRef: '#LTB-CONF-884920',
    arrearsAfter: state.arrearsBalance
  };

  // Add to payments array
  state.payments.unshift(paymentRecord);

  // Prepend to compliance audit logs
  state.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'LEDGER_API_DEP03',
    action: 'STATUS_WRITEBACK',
    field: 'account_status',
    oldVal: 'DELINQUENT_34D',
    newVal: state.isPaid ? 'PERFORMING_CLEARED' : 'PARTIAL_PAYMENT'
  });
  state.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'CUSTOMER_PORTAL',
    action: 'CARD_SETTLEMENT_FULL',
    field: 'arrears_balance',
    oldVal: '£' + previousArrears.toFixed(2),
    newVal: '£' + state.arrearsBalance.toFixed(2)
  });

  // Prepend to outreach feed
  state.outreachFeed.unshift({
    timestamp: utcFormatted,
    channel: 'PAYMENT',
    summary: 'Card Settlement Authorized: £' + payAmount.toFixed(2) + ' received via ' + paymentRecord.method + ' (Ref: ' + paymentRecord.id + '). Balance cleared to £' + state.arrearsBalance.toFixed(2) + '.',
    status: 'Settled & Cleared',
    badgeClass: 'background:#dcfce7; color:#166534;'
  });

  saveLedgerState(state);
  return state;
}

// Process a dispute or hardship intake submission
function executeDisputeOrHardship(category, reasonCode, statement) {
  const state = getLedgerState();
  const isHardship = (category === 'hardship');
  const now = new Date();
  const utcFormatted = now.toISOString().replace('T', ' ').substring(0, 19);
  const localTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const caseId = isHardship ? `CASE-VULN-${randomNum}` : `CASE-DISP-${randomNum}`;
  const token = isHardship ? `#LTB-HANDOVER-${randomNum}-VULN` : `#LTB-DISP-${randomNum}-CLAIM`;
  const assignedQueue = isHardship ? 'Vulnerability_Team' : 'Dispute_Specialists';
  const categoryTitle = isHardship ? 'Financial Hardship' : 'Balance Dispute';

  const caseRecord = {
    caseId: caseId,
    token: token,
    timestamp: utcFormatted,
    displayTime: 'Today, ' + localTime + ' UTC',
    category: categoryTitle,
    reasonCode: reasonCode || (isHardship ? 'HARDSHIP_INCOME' : 'FEE_DISPUTE'),
    statement: statement || (isHardship ? 'Customer submitted financial hardship intake form via online self-service.' : 'Customer submitted formal account balance dispute via online portal.'),
    assignedQueue: assignedQueue,
    suppressionStatus: 'ACTIVE (Suppressed < 2s)',
    status: 'Open (Under Priority Review)'
  };

  // Prepend to cases array
  if (!state.disputesAndHardships) {
    state.disputesAndHardships = [];
  }
  state.disputesAndHardships.unshift(caseRecord);

  // Prepend audit log entries
  state.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'CAMUNDA_WORKFLOW',
    action: isHardship ? 'EXCEPTION_QUEUE_ROUTING' : 'DISPUTE_QUEUE_ROUTING',
    field: 'assigned_queue',
    oldVal: 'GENERAL_COLLECTIONS',
    newVal: assignedQueue + ' (SLA: ' + (isHardship ? '2h' : '4h') + ')'
  });

  state.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'LEDGER_API_DEP03',
    action: 'OUTREACH_SUPPRESSION_WRITEBACK',
    field: 'outreach_suppression',
    oldVal: '0 (FALSE)',
    newVal: '1 (TRUE - SUPPRESSED IN < 2S)'
  });

  state.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'CUSTOMER_PORTAL',
    action: isHardship ? 'HARDSHIP_INTAKE_SUBMITTED' : 'DISPUTE_CLAIM_LOGGED',
    field: isHardship ? 'hardship_flag' : 'dispute_flag',
    oldVal: '0 (INACTIVE)',
    newVal: isHardship ? '1 (ACTIVE - 30D BREATHING SPACE)' : '1 (INVESTIGATION_OPEN)'
  });

  // Prepend to outreach feed
  state.outreachFeed.unshift({
    timestamp: utcFormatted,
    channel: isHardship ? 'HARDSHIP' : 'DISPUTE',
    summary: (isHardship ? 'Financial Hardship Intake received' : 'Dispute Claim Registered') + ' (Reason: ' + caseRecord.reasonCode + '). Collections suppressed. Assigned to ' + assignedQueue + '.',
    status: 'Hold Placed',
    badgeClass: isHardship ? 'background:#fef3c7; color:#92400e;' : 'background:#fee2e2; color:#b91c1c;'
  });

  saveLedgerState(state);
  return { state, caseRecord };
}

// Global exposure for inline HTML scripts
window.LTBLedger = {
  getState: getLedgerState,
  saveState: saveLedgerState,
  resetState: resetLedgerState,
  pay: executePayment,
  logDisputeOrHardship: executeDisputeOrHardship
};
