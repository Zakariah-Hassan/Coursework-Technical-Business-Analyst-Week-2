/**
 * Legacy Trust Bank - Client-Side 1-Minute Inactivity Session Manager
 * Inactivity Timeout: 60 seconds
 * Inactivity Warning Modal: Triggered at 45 seconds (15-second countdown)
 * Auto-Logout Destination: 01-landing.html?session=expired
 */

(function () {
  const INACTIVITY_LIMIT_MS = 60 * 1000; // 60 seconds (1 minute)
  const WARNING_THRESHOLD_MS = 45 * 1000; // Warning shown at 45s (15s remaining)
  let lastActivityTime = Date.now();
  let warningModalShown = false;
  let countdownInterval = null;

  // Create UI overlay container if not already present
  function injectSessionElements() {
    if (document.getElementById('ltb-session-overlay')) return;

    // Floating Session Badge
    const badge = document.createElement('div');
    badge.id = 'ltb-session-badge';
    badge.innerHTML = `
      <div style="
        position: fixed;
        bottom: 1.25rem;
        right: 1.25rem;
        background: #0f172a;
        color: #f8fafc;
        border: 1px solid #334155;
        border-radius: 999px;
        padding: 0.4rem 0.9rem;
        font-size: 0.78rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.18);
        z-index: 9998;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <span style="display:inline-block; width:8px; height:8px; background:#10b981; border-radius:50%; animation: pulseDot 1.5s infinite;"></span>
        <span>Active Session: <strong id="ltb-badge-time">60s</strong></span>
      </div>
    `;
    document.body.appendChild(badge);

    // Modal Warning Overlay
    const modal = document.createElement('div');
    modal.id = 'ltb-session-overlay';
    modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(10, 37, 64, 0.75);
      backdrop-filter: blur(4px);
      z-index: 99999;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    modal.innerHTML = `
      <div style="
        background: #ffffff;
        border-radius: 16px;
        max-width: 500px;
        width: 100%;
        padding: 2.25rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        border: 1px solid #cbd5e1;
        text-align: center;
      ">
        <div style="width: 56px; height: 56px; background: #fffbeb; border: 1.5px solid #fde68a; color: #b45309; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 1rem;">
          ⏱️
        </div>
        <h2 style="font-size: 1.4rem; color: #071c33; margin-bottom: 0.5rem; font-weight: 800;">
          Are you still working on this?
        </h2>
        <p style="color: #475569; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.25rem;">
          For your financial privacy and protection, your Legacy Trust Bank portal session will automatically end in:
        </p>

        <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #fef2f2; border: 1.5px solid #fecaca; color: #b91c1c; padding: 0.6rem 1.5rem; border-radius: 999px; font-weight: 800; font-size: 1.35rem; margin-bottom: 1.5rem; letter-spacing: 0.05em;">
          <span id="ltb-modal-countdown">15</span> seconds
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button id="ltb-btn-stay" type="button" style="
            background: #2563eb;
            color: #ffffff;
            border: none;
            padding: 0.85rem 1.75rem;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(37,99,235,0.3);
          ">
            Keep Me Signed In &rarr;
          </button>
          <a href="01-landing.html?session=expired" style="
            background: transparent;
            color: #475569;
            border: 1.5px solid #cbd5e1;
            padding: 0.85rem 1.5rem;
            border-radius: 6px;
            font-size: 0.95rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
          ">
            Log Out Now
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('ltb-btn-stay').addEventListener('click', function () {
      resetActivityTimer();
      hideModal();
    });
  }

  function resetActivityTimer() {
    lastActivityTime = Date.now();
    if (warningModalShown) {
      hideModal();
    }
  }

  function showModal() {
    const modal = document.getElementById('ltb-session-overlay');
    if (modal) {
      modal.style.display = 'flex';
      warningModalShown = true;
    }
  }

  function hideModal() {
    const modal = document.getElementById('ltb-session-overlay');
    if (modal) {
      modal.style.display = 'none';
      warningModalShown = false;
    }
  }

  function performLogout() {
    window.location.href = '01-landing.html?session=expired';
  }

  // Periodic tick check (runs every 500ms)
  function tick() {
    const elapsed = Date.now() - lastActivityTime;
    const remainingMs = Math.max(0, INACTIVITY_LIMIT_MS - elapsed);
    const remainingSec = Math.ceil(remainingMs / 1000);

    const badgeTime = document.getElementById('ltb-badge-time');
    if (badgeTime) {
      badgeTime.textContent = remainingSec + 's';
      if (remainingSec <= 15) {
        badgeTime.style.color = '#ef4444';
      } else {
        badgeTime.style.color = '#38bdf8';
      }
    }

    if (elapsed >= INACTIVITY_LIMIT_MS) {
      performLogout();
      return;
    }

    if (elapsed >= WARNING_THRESHOLD_MS && !warningModalShown) {
      showModal();
    }

    if (warningModalShown) {
      const countdownEl = document.getElementById('ltb-modal-countdown');
      if (countdownEl) {
        countdownEl.textContent = remainingSec;
      }
    }
  }

  // Listen for all user interaction events to track activity
  const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
  activityEvents.forEach((ev) => {
    window.addEventListener(ev, function () {
      // If modal is not active, reset timer. If modal is active, user must explicitly click "Keep Me Signed In".
      if (!warningModalShown) {
        lastActivityTime = Date.now();
      }
    }, { passive: true });
  });

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectSessionElements();
      setInterval(tick, 500);
    });
  } else {
    injectSessionElements();
    setInterval(tick, 500);
  }
})();
