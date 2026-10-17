/* ==========================================================================
   DreamBiz Solutions - Interactive Cost & Service Estimator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCostCalculator();
});

function initCostCalculator() {
  const calcRoot = document.querySelector('#calculator');
  if (!calcRoot) return;

  const jurisdictionChips = calcRoot.querySelectorAll('[data-calc-group="jurisdiction"] .calc-chip');
  const visaChips = calcRoot.querySelectorAll('[data-calc-group="visas"] .calc-chip');
  const serviceChips = calcRoot.querySelectorAll('[data-calc-group="services"] .calc-chip');
  
  const priceDisplay = calcRoot.querySelector('#calc-total-price');
  const timeframeDisplay = calcRoot.querySelector('#calc-timeframe');
  const itemsList = calcRoot.querySelector('#calc-items-breakdown');
  const ctaBtn = calcRoot.querySelector('#calc-cta-btn');

  let state = {
    jurisdiction: 'freezone',
    jurisdictionCost: 12500,
    jurisdictionName: 'UAE Freezone License',
    visas: 1,
    visaCost: 3500,
    services: []
  };

  const serviceCatalog = {
    'ecommerce': { name: 'E-Commerce Marketplace Setup', cost: 4500 },
    'tech': { name: 'Custom Website & Tech Portal', cost: 6500 },
    'consulting': { name: 'DreamBiz MSME Growth Audit', cost: 3000 },
    'hr': { name: 'HR & Staff Recruitment Setup', cost: 2500 },
    'trade': { name: 'Import/Export Code & Customs', cost: 2000 }
  };

  function updateCalculations() {
    let total = state.jurisdictionCost + (state.visas * state.visaCost);
    let items = [
      { name: state.jurisdictionName, cost: state.jurisdictionCost },
      { name: `${state.visas}x Investor/Employment Visa(s)`, cost: state.visas * state.visaCost }
    ];

    state.services.forEach(svcKey => {
      if (serviceCatalog[svcKey]) {
        total += serviceCatalog[svcKey].cost;
        items.push({ name: serviceCatalog[svcKey].name, cost: serviceCatalog[svcKey].cost });
      }
    });

    // Determine estimated timeframe
    let timeframe = "3 – 5 Business Days";
    if (state.jurisdiction === 'mainland') timeframe = "5 – 7 Business Days";
    if (state.services.includes('tech') || state.services.includes('ecommerce')) timeframe = "7 – 14 Business Days";

    // Format AED / USD
    if (priceDisplay) {
      priceDisplay.textContent = `AED ${total.toLocaleString()}`;
    }
    if (timeframeDisplay) {
      timeframeDisplay.textContent = timeframe;
    }

    if (itemsList) {
      itemsList.innerHTML = items.map(it => `
        <li>
          <span>${it.name}</span>
          <strong>AED ${it.cost.toLocaleString()}</strong>
        </li>
      `).join('');
    }
  }

  // Jurisdiction click handlers
  jurisdictionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      jurisdictionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-value');
      state.jurisdiction = val;
      if (val === 'freezone') {
        state.jurisdictionCost = 12500;
        state.jurisdictionName = 'UAE Freezone License';
      } else if (val === 'mainland') {
        state.jurisdictionCost = 18500;
        state.jurisdictionName = 'UAE Mainland LLC License';
      } else if (val === 'offshore') {
        state.jurisdictionCost = 9500;
        state.jurisdictionName = 'Offshore / International Entity';
      }
      updateCalculations();
    });
  });

  // Visa click handlers
  visaChips.forEach(chip => {
    chip.addEventListener('click', () => {
      visaChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.visas = parseInt(chip.getAttribute('data-value'), 10) || 0;
      updateCalculations();
    });
  });

  // Service toggle handlers (multi-select)
  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-value');
      chip.classList.toggle('active');
      if (chip.classList.contains('active')) {
        if (!state.services.includes(val)) state.services.push(val);
      } else {
        state.services = state.services.filter(s => s !== val);
      }
      updateCalculations();
    });
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.querySelector('#quote-modal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  updateCalculations();
}
