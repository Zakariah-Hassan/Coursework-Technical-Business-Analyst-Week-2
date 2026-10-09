/**
 * Legacy Trust Bank - Multi-User Core Ledger & State Management Store
 * Supports 4 Realistic Personas across Customer Portal and Representative Workspace:
 * 1. Sarah M. Jenkins (Standard Overdue Personal Loan - £1,240.00)
 * 2. Marcus T. Vance (Low Arrears / Ready to Pay Credit Card - £350.00)
 * 3. David O'Connor (Severe Hardship / Breathing Space Fixed Loan - £2,800.00)
 * 4. Priya Sharma (Contested Charges & Dispute Overdraft - £520.00)
 */

const LTB_STORAGE_KEY = 'ltb_multi_user_store_v3';

const LTB_INITIAL_USERS = {
  'LTB-8849-2104': {
    accountRef: 'LTB-8849-2104',
    postcode: 'EC2A 4NE',
    borrowerName: 'Sarah M. Jenkins',
    dob: '1985-06-14',
    dobDisplay: '14/06/1985',
    product: 'Unsecured Personal Loan',
    address: '14 Moorfields, London, EC2A 4NE',
    phone: '+44 7700 900492',
    phoneMasked: '•••• 4921',
    email: 's.jenkins@outlook.com',
    totalPrincipal: 5400.00,
    initialArrears: 1240.00,
    arrearsBalance: 1240.00,
    isPaid: false,
    daysOverdue: 34,
    cycle: 'Cycle 2 (30+ Days)',
    personaBadge: 'Standard Overdue Loan',
    personaDescription: '34 days overdue personal loan with missed August & September installments.',
    flags: {
      self_service_eligible: true,
      ptp_active: true,
      payment_received: false,
      settled_in_full: false,
      outreach_suppression: true,
      hardship_flag: false,
      dispute_flag: false,
      legal_flag: false
    },
    statementItems: [
      { date: '05 Aug 2026', desc: 'Missed Monthly Principal & Interest Installment', amount: 600.00 },
      { date: '12 Aug 2026', desc: 'Late Assessment Administration Surcharge', amount: 20.00 },
      { date: '05 Sep 2026', desc: 'Missed Monthly Principal & Interest Installment', amount: 600.00 },
      { date: '12 Sep 2026', desc: 'Late Assessment Administration Surcharge', amount: 20.00 }
    ],
    payments: [],
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
      }
    ],
    auditLogs: [
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
      }
    ],
    outreachFeed: [
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
      }
    ]
  },

  'LTB-4412-8809': {
    accountRef: 'LTB-4412-8809',
    postcode: 'M1 4BT',
    borrowerName: 'Marcus T. Vance',
    dob: '1992-11-23',
    dobDisplay: '23/11/1992',
    product: 'Platinum Rewards Credit Card',
    address: '82 Deansgate, Manchester, M1 4BT',
    phone: '+44 7700 900881',
    phoneMasked: '•••• 0881',
    email: 'm.vance@gmail.com',
    totalPrincipal: 1800.00,
    initialArrears: 350.00,
    arrearsBalance: 350.00,
    isPaid: false,
    daysOverdue: 14,
    cycle: 'Cycle 1 (1-14 Days)',
    personaBadge: 'Low Arrears / Ready to Pay',
    personaDescription: '14 days overdue credit card minimum balance (£350). Ideal candidate for single card clearance.',
    flags: {
      self_service_eligible: true,
      ptp_active: false,
      payment_received: false,
      settled_in_full: false,
      outreach_suppression: false,
      hardship_flag: false,
      dispute_flag: false,
      legal_flag: false
    },
    statementItems: [
      { date: '25 Sep 2026', desc: 'Missed Monthly Minimum Credit Card Payment', amount: 325.00 },
      { date: '02 Oct 2026', desc: 'Late Payment Administration Charge', amount: 25.00 }
    ],
    payments: [],
    disputesAndHardships: [],
    auditLogs: [
      {
        timestamp: '2026-10-08 14:10:05',
        actor: 'API_GATEWAY',
        action: 'CRED_LOOKUP',
        field: 'lookup_status',
        oldVal: 'NONE',
        newVal: 'MATCHED_200'
      },
      {
        timestamp: '2026-10-02 04:00:00',
        actor: 'CORE_BATCH_JOB',
        action: 'FEE_ASSESSMENT',
        field: 'late_fee_balance',
        oldVal: '£0.00',
        newVal: '£25.00'
      },
      {
        timestamp: '2026-09-25 23:59:59',
        actor: 'CORE_LEDGER',
        action: 'MISSED_DUE_DATE',
        field: 'delinquency_cycle',
        oldVal: '0',
        newVal: '1 (1-14 Days)'
      }
    ],
    outreachFeed: [
      {
        timestamp: '2026-10-06 09:00:15',
        channel: 'SMS',
        summary: 'Reminder: Minimum payment of £350.00 past due on Platinum Card •••• 8809',
        status: 'Delivered',
        badgeClass: 'background:#e0f2fe; color:#0369a1;'
      },
      {
        timestamp: '2026-09-26 08:30:00',
        channel: 'EMAIL',
        summary: 'Payment Alert: Your monthly card payment was not received on 25 September',
        status: 'Delivered',
        badgeClass: 'background:#f1f5f9; color:#334155;'
      }
    ]
  },

  'LTB-9901-3342': {
    accountRef: 'LTB-9901-3342',
    postcode: 'G1 2DH',
    borrowerName: "David O'Connor",
    dob: '1978-03-08',
    dobDisplay: '08/03/1978',
    product: 'Home Improvement Fixed Loan',
    address: '45 George Square, Glasgow, G1 2DH',
    phone: '+44 7700 900334',
    phoneMasked: '•••• 3342',
    email: 'd.oconnor@scotnet.co.uk',
    totalPrincipal: 12500.00,
    initialArrears: 2800.00,
    arrearsBalance: 2800.00,
    isPaid: false,
    daysOverdue: 62,
    cycle: 'Cycle 3 (60+ Days High Risk)',
    personaBadge: 'Severe Hardship / Breathing Space',
    personaDescription: '62 days overdue with medical incapacity. Statutory 30-day breathing space hold active.',
    flags: {
      self_service_eligible: false,
      ptp_active: false,
      payment_received: false,
      settled_in_full: false,
      outreach_suppression: true,
      hardship_flag: true,
      dispute_flag: false,
      legal_flag: false
    },
    statementItems: [
      { date: '05 Jul 2026', desc: 'Missed Fixed Loan Monthly Installment', amount: 900.00 },
      { date: '12 Jul 2026', desc: 'Late Assessment Administration Surcharge', amount: 33.33 },
      { date: '05 Aug 2026', desc: 'Missed Fixed Loan Monthly Installment', amount: 900.00 },
      { date: '12 Aug 2026', desc: 'Late Assessment Administration Surcharge', amount: 33.33 },
      { date: '05 Sep 2026', desc: 'Missed Fixed Loan Monthly Installment', amount: 900.00 },
      { date: '12 Sep 2026', desc: 'Late Assessment Administration Surcharge', amount: 33.34 }
    ],
    payments: [],
    disputesAndHardships: [
      {
        caseId: 'CASE-HARDSHIP-9901',
        token: '#LTB-HANDOVER-9901-VULN',
        timestamp: '2026-09-28 11:15:00',
        displayTime: '28 Sep 2026, 11:15 UTC',
        category: 'Financial Hardship',
        reasonCode: 'HARDSHIP_HEALTH (Medical Incapacity)',
        statement: 'Customer submitted certified medical certificate following major surgery. 30-Day statutory breathing space hold enforced.',
        assignedQueue: 'Vulnerability_Team',
        suppressionStatus: 'ACTIVE (Suppressed < 2s)',
        status: 'Active Breathing Space'
      }
    ],
    auditLogs: [
      {
        timestamp: '2026-09-28 11:15:02',
        actor: 'CAMUNDA_WORKFLOW',
        action: 'BREATHING_SPACE_INITIATED',
        field: 'hardship_flag',
        oldVal: '0',
        newVal: '1 (STATUTORY_30D_HOLD)'
      },
      {
        timestamp: '2026-09-28 11:15:01',
        actor: 'LEDGER_API_DEP03',
        action: 'OUTREACH_SUPPRESSION_WRITEBACK',
        field: 'outreach_suppression',
        oldVal: '0',
        newVal: '1 (TRUE)'
      },
      {
        timestamp: '2026-09-05 23:59:59',
        actor: 'CORE_LEDGER',
        action: 'MISSED_DUE_DATE',
        field: 'delinquency_cycle',
        oldVal: '2',
        newVal: '3 (60+ Days)'
      }
    ],
    outreachFeed: [
      {
        timestamp: '2026-09-28 11:15:05',
        channel: 'HARDSHIP',
        summary: 'Breathing Space Activated: All automated debt collection calls and enforcement notices halted.',
        status: 'Hold Active',
        badgeClass: 'background:#fef3c7; color:#92400e;'
      },
      {
        timestamp: '2026-09-20 09:30:00',
        channel: 'LETTER',
        summary: 'Pre-Default Warning Notice dispatched via Royal Mail Signed-For',
        status: 'Delivered',
        badgeClass: 'background:#f1f5f9; color:#334155;'
      }
    ]
  },

  'LTB-6720-5519': {
    accountRef: 'LTB-6720-5519',
    postcode: 'B1 1TT',
    borrowerName: 'Priya Sharma',
    dob: '1990-09-19',
    dobDisplay: '19/09/1990',
    product: 'Premier Current Account Overdraft',
    address: '10 Colmore Row, Birmingham, B1 1TT',
    phone: '+44 7700 900551',
    phoneMasked: '•••• 5519',
    email: 'priya.sharma@enterprise.co.uk',
    totalPrincipal: 2200.00,
    initialArrears: 520.00,
    arrearsBalance: 520.00,
    isPaid: false,
    daysOverdue: 25,
    cycle: 'Cycle 1 (Overdraft Arrears)',
    personaBadge: 'Fee Dispute & Contested Charges',
    personaDescription: '25 days overdue. Customer claims £120.00 late surcharges were applied erroneously.',
    flags: {
      self_service_eligible: true,
      ptp_active: false,
      payment_received: false,
      settled_in_full: false,
      outreach_suppression: true,
      hardship_flag: false,
      dispute_flag: true,
      legal_flag: false
    },
    statementItems: [
      { date: '14 Sep 2026', desc: 'Unarranged Overdraft Facility Excess', amount: 400.00 },
      { date: '21 Sep 2026', desc: 'Contested Monthly Maintenance Surcharge', amount: 60.00 },
      { date: '28 Sep 2026', desc: 'Contested Late Assessment Surcharge', amount: 60.00 }
    ],
    payments: [],
    disputesAndHardships: [
      {
        caseId: 'CASE-DISP-6720',
        token: '#LTB-DISP-6720-CLAIM',
        timestamp: '2026-10-02 16:45:00',
        displayTime: '02 Oct 2026, 16:45 UTC',
        category: 'Balance Dispute',
        reasonCode: 'FEE_DISPUTE (Contested Maintenance Surcharges)',
        statement: 'Customer claims bank agreed to waive £120 overdraft surcharges due to banking app maintenance outage on 20 Sep.',
        assignedQueue: 'Dispute_Specialists',
        suppressionStatus: 'ACTIVE (Suppressed < 2s)',
        status: 'Under Investigation'
      }
    ],
    auditLogs: [
      {
        timestamp: '2026-10-02 16:45:02',
        actor: 'CUSTOMER_PORTAL',
        action: 'DISPUTE_CLAIM_LOGGED',
        field: 'dispute_flag',
        oldVal: '0',
        newVal: '1 (FEE_DISPUTE)'
      },
      {
        timestamp: '2026-10-02 16:45:03',
        actor: 'LEDGER_API_DEP03',
        action: 'OUTREACH_SUPPRESSION_WRITEBACK',
        field: 'outreach_suppression',
        oldVal: '0',
        newVal: '1 (TRUE)'
      },
      {
        timestamp: '2026-10-02 16:45:03',
        actor: 'CAMUNDA_WORKFLOW',
        action: 'DISPUTE_QUEUE_ROUTING',
        field: 'assigned_queue',
        oldVal: 'GENERAL_COLLECTIONS',
        newVal: 'DISPUTE_SPECIALISTS (SLA: 4h)'
      }
    ],
    outreachFeed: [
      {
        timestamp: '2026-10-02 16:45:05',
        channel: 'DISPUTE',
        summary: 'Formal Dispute Registered: Overdraft fees contested (£120.00). Automated dialer excluded.',
        status: 'Under Review',
        badgeClass: 'background:#fee2e2; color:#b91c1c;'
      },
      {
        timestamp: '2026-09-22 10:12:00',
        channel: 'SMS',
        summary: 'Account Notice: Overdraft excess of £520.00 currently outstanding',
        status: 'Delivered',
        badgeClass: 'background:#e0f2fe; color:#0369a1;'
      }
    ]
  }
};

// Retrieve store containing all users and the current activeAccountRef
function getStore() {
  try {
    const raw = localStorage.getItem(LTB_STORAGE_KEY);
    if (!raw) {
      const initialStore = {
        activeAccountRef: 'LTB-8849-2104',
        users: JSON.parse(JSON.stringify(LTB_INITIAL_USERS))
      };
      saveStore(initialStore);
      return initialStore;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.users || !parsed.activeAccountRef) {
      const reset = {
        activeAccountRef: 'LTB-8849-2104',
        users: JSON.parse(JSON.stringify(LTB_INITIAL_USERS))
      };
      saveStore(reset);
      return reset;
    }
    return parsed;
  } catch (e) {
    return {
      activeAccountRef: 'LTB-8849-2104',
      users: JSON.parse(JSON.stringify(LTB_INITIAL_USERS))
    };
  }
}

function saveStore(store) {
  try {
    localStorage.setItem(LTB_STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save store to localStorage:', e);
  }
}

// Reset store to fresh initial state
function resetAllData() {
  localStorage.removeItem(LTB_STORAGE_KEY);
  return getStore();
}

// Get the currently active user
function getActiveUser() {
  const store = getStore();
  let user = store.users[store.activeAccountRef];
  if (!user) {
    user = store.users['LTB-8849-2104'];
    store.activeAccountRef = 'LTB-8849-2104';
    saveStore(store);
  }
  return user;
}

// Set active user by account reference
function setActiveUser(accountRef) {
  const store = getStore();
  if (store.users[accountRef]) {
    store.activeAccountRef = accountRef;
    saveStore(store);
    return store.users[accountRef];
  }
  return getActiveUser();
}

// Get all users as an array
function getAllUsers() {
  const store = getStore();
  return Object.values(store.users);
}

// Find user by reference, name, postcode, or phone
function findUser(query) {
  if (!query) return null;
  const clean = String(query).trim().toLowerCase();
  const all = getAllUsers();
  return all.find(u => 
    u.accountRef.toLowerCase() === clean ||
    u.accountRef.toLowerCase().includes(clean) ||
    u.borrowerName.toLowerCase().includes(clean) ||
    u.postcode.toLowerCase().replace(/\s+/g, '') === clean.replace(/\s+/g, '') ||
    u.phone.includes(clean)
  ) || null;
}

// Backward-compatible getState() returning the active user
function getState() {
  return getActiveUser();
}

// Execute payment on active user (or specified accountRef)
function executePayment(amount, method, targetRef) {
  const store = getStore();
  const ref = targetRef || store.activeAccountRef;
  const user = store.users[ref];
  if (!user) return null;

  const previousArrears = user.arrearsBalance;
  const payAmount = Number(amount) || previousArrears;

  user.arrearsBalance = Math.max(0, previousArrears - payAmount);
  user.isPaid = (user.arrearsBalance === 0);
  if (user.isPaid) {
    user.daysOverdue = 0;
    user.flags.payment_received = true;
    user.flags.settled_in_full = true;
    user.flags.ptp_active = false;
  }

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
    arrearsAfter: user.arrearsBalance
  };

  user.payments.unshift(paymentRecord);

  // Prepend to user audit log
  user.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'LEDGER_API_DEP03',
    action: 'STATUS_WRITEBACK',
    field: 'account_status',
    oldVal: previousArrears > 0 ? 'DELINQUENT' : 'PERFORMING',
    newVal: user.isPaid ? 'PERFORMING_CLEARED' : 'PARTIAL_PAYMENT'
  });

  user.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'CUSTOMER_PORTAL',
    action: 'CARD_SETTLEMENT_FULL',
    field: 'arrears_balance',
    oldVal: '£' + previousArrears.toFixed(2),
    newVal: '£' + user.arrearsBalance.toFixed(2)
  });

  // Prepend to outreach feed
  user.outreachFeed.unshift({
    timestamp: utcFormatted,
    channel: 'PAYMENT',
    summary: 'Payment Settled: £' + payAmount.toFixed(2) + ' received via ' + paymentRecord.method + ' (Ref: ' + paymentRecord.id + '). Balance: £' + user.arrearsBalance.toFixed(2) + '.',
    status: 'Settled & Cleared',
    badgeClass: 'background:#dcfce7; color:#166534;'
  });

  saveStore(store);
  return user;
}

// Log a dispute or hardship on active user (or specified accountRef)
function executeDisputeOrHardship(category, reasonCode, statement, targetRef) {
  const store = getStore();
  const ref = targetRef || store.activeAccountRef;
  const user = store.users[ref];
  if (!user) return null;

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
    statement: statement || (isHardship ? 'Customer submitted financial hardship declaration.' : 'Customer submitted formal account balance dispute.'),
    assignedQueue: assignedQueue,
    suppressionStatus: 'ACTIVE (Suppressed < 2s)',
    status: 'Open (Under Priority Review)'
  };

  user.disputesAndHardships.unshift(caseRecord);
  user.flags.outreach_suppression = true;
  if (isHardship) {
    user.flags.hardship_flag = true;
  } else {
    user.flags.dispute_flag = true;
  }

  // Prepend audit entries
  user.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'CAMUNDA_WORKFLOW',
    action: isHardship ? 'EXCEPTION_QUEUE_ROUTING' : 'DISPUTE_QUEUE_ROUTING',
    field: 'assigned_queue',
    oldVal: 'GENERAL_COLLECTIONS',
    newVal: assignedQueue + ' (SLA: ' + (isHardship ? '2h' : '4h') + ')'
  });

  user.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'LEDGER_API_DEP03',
    action: 'OUTREACH_SUPPRESSION_WRITEBACK',
    field: 'outreach_suppression',
    oldVal: '0 (FALSE)',
    newVal: '1 (TRUE - SUPPRESSED IN < 2S)'
  });

  user.auditLogs.unshift({
    timestamp: utcFormatted,
    actor: 'CUSTOMER_PORTAL',
    action: isHardship ? 'HARDSHIP_INTAKE_SUBMITTED' : 'DISPUTE_CLAIM_LOGGED',
    field: isHardship ? 'hardship_flag' : 'dispute_flag',
    oldVal: '0',
    newVal: isHardship ? '1 (ACTIVE - 30D BREATHING SPACE)' : '1 (INVESTIGATION_OPEN)'
  });

  user.outreachFeed.unshift({
    timestamp: utcFormatted,
    channel: isHardship ? 'HARDSHIP' : 'DISPUTE',
    summary: (isHardship ? 'Financial Hardship Intake received' : 'Dispute Claim Registered') + ' (' + caseRecord.reasonCode + '). Collections suppressed. Assigned to ' + assignedQueue + '.',
    status: 'Hold Placed',
    badgeClass: isHardship ? 'background:#fef3c7; color:#92400e;' : 'background:#fee2e2; color:#b91c1c;'
  });

  saveStore(store);
  return { user, caseRecord };
}

// Global exposure
window.LTBLedger = {
  getStore: getStore,
  saveStore: saveStore,
  getState: getState,
  getActiveUser: getActiveUser,
  setActiveUser: setActiveUser,
  getAllUsers: getAllUsers,
  findUser: findUser,
  resetState: resetAllData,
  resetAllData: resetAllData,
  pay: executePayment,
  executePayment: executePayment,
  logDisputeOrHardship: executeDisputeOrHardship,
  executeDisputeOrHardship: executeDisputeOrHardship
};

