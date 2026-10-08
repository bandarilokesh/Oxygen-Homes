/**
 * OXYGEN HOMES - INTERACTIVE CONVERSION ENGINE
 * High CTR, Frictionless Lead Capture, Real Estate Calculator & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPropertyTabs();
  initFloorplanViewer();
  initCalculator();
  initLeadForms();
  initSocialProofTicker();
  initExitIntent();
  initAdminDashboard();
});

// -------------------------------------------------------------
// 1. Navigation & Mobile Drawer
// -------------------------------------------------------------
function initNavbar() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
}

// -------------------------------------------------------------
// 2. Property Switcher Tabs (Oxygen City Villas vs Oxygen Pearl)
// -------------------------------------------------------------
function initPropertyTabs() {
  const tabCity = document.getElementById('tab-oxygen-city');
  const tabPearl = document.getElementById('tab-oxygen-pearl');
  const viewCity = document.getElementById('view-oxygen-city');
  const viewPearl = document.getElementById('view-oxygen-pearl');

  if (!tabCity || !tabPearl || !viewCity || !viewPearl) return;

  tabCity.addEventListener('click', () => {
    tabCity.classList.add('tab-active');
    tabPearl.classList.remove('tab-active');
    viewCity.classList.remove('hidden');
    viewPearl.classList.add('hidden');
  });

  tabPearl.addEventListener('click', () => {
    tabPearl.classList.add('tab-active');
    tabCity.classList.remove('tab-active');
    viewPearl.classList.remove('hidden');
    viewCity.classList.add('hidden');
  });
}

// -------------------------------------------------------------
// 3. Floor Plan Interactive Explorer
// -------------------------------------------------------------
const floorPlanData = {
  '168-east': {
    title: '168 Sq. Yds Triplex Villa — East Facing',
    subtitle: 'G+2 Luxury Villa | 100% Vastu | 3,150 Sft Super Built-up Area',
    image: 'assets/images/168-sq-yds-east-facing.jpg',
    features: ['Double-Height Living Hall', 'Private Sky Terrace & Deck', '2-Car Covered Porch', 'Modular Kitchen & Utility', 'Puja Room with East Influx']
  },
  '168-west': {
    title: '168 Sq. Yds Triplex Villa — West Facing',
    subtitle: 'G+2 Luxury Villa | Contemporary Architecture | 3,120 Sft Area',
    image: 'assets/images/168-sq-yds-west-facing-1.jpg',
    features: ['Grand Foyer Entrance', 'Home Theatre Lounge on 2nd Floor', 'Spacious Balconies with Scenic Views', 'Walk-in Wardrobe in Master Suite', 'Private Backyard Garden']
  },
  '200-east': {
    title: '200 Sq. Yds Signature Triplex Villa — East Facing',
    subtitle: 'G+2 Ultra-Luxury Villa | Expansive Living | 3,750 Sft Area',
    image: 'assets/images/200-sq-yds-east-facing.jpg',
    features: ['Spacious 4-BHK Master En-suites', 'Private Plunge Pool / Zen Court Ready', 'Elevator Shaft Provision', 'Outdoor Barbecue Terrace', 'Servant Quarters with Bath']
  },
  '200-west': {
    title: '200 Sq. Yds Signature Triplex Villa — West Facing',
    subtitle: 'G+2 Grand Estate Villa | Premium Plot | 3,720 Sft Area',
    image: 'assets/images/200-sq-yds-west-facing.jpg',
    features: ['Private Zen Landscaped Courtyard', 'Double Carport for Luxury SUVs', 'Dedicated Gym/Yoga Deck', 'Imported Marble Flooring Provisions', 'Smart Home Automation Ready']
  },
  'pearl-3bhk': {
    title: 'Oxygen Pearl — 3 BHK Luxury Apartment (2,100 Sft)',
    subtitle: '3.07-Acre High-Rise Gated Community | Pragathi Nagar',
    image: 'assets/images/Night-View-Oxygen-Pearl.webp',
    features: ['Wrap-Around Panoramic Balcony', 'Vastu Compliant Corner Units', 'Clubhouse & Infinity Pool Access', 'Acoustic Sound-Proof Glazing', '80% Open Green Space']
  }
};

function initFloorplanViewer() {
  const planButtons = document.querySelectorAll('.plan-btn');
  const planTitle = document.getElementById('fp-active-title');
  const planSubtitle = document.getElementById('fp-active-subtitle');
  const planImage = document.getElementById('fp-active-image');
  const planFeatures = document.getElementById('fp-active-features');

  if (!planButtons.length) return;

  planButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      planButtons.forEach(b => b.classList.remove('bg-gold-gradient', 'text-[#0A140F]', 'font-bold'));
      planButtons.forEach(b => b.classList.add('bg-[#15271E]', 'text-slate-300'));

      this.classList.remove('bg-[#15271E]', 'text-slate-300');
      this.classList.add('bg-gold-gradient', 'text-[#0A140F]', 'font-bold');

      const planKey = this.getAttribute('data-plan');
      const data = floorPlanData[planKey];
      if (data) {
        if (planTitle) planTitle.textContent = data.title;
        if (planSubtitle) planSubtitle.textContent = data.subtitle;
        if (planImage) {
          planImage.src = data.image;
          planImage.alt = data.title;
        }
        if (planFeatures) {
          planFeatures.innerHTML = data.features.map(f => `
            <li class="flex items-center gap-2 text-sm text-slate-300">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
              ${f}
            </li>
          `).join('');
        }
      }
    });
  });
}

// -------------------------------------------------------------
// 4. Dynamic EMI & Investment Appreciation Calculator
// -------------------------------------------------------------
function initCalculator() {
  const loanSlider = document.getElementById('calc-loan');
  const rateSlider = document.getElementById('calc-rate');
  const tenureSlider = document.getElementById('calc-tenure');

  const loanVal = document.getElementById('calc-loan-val');
  const rateVal = document.getElementById('calc-rate-val');
  const tenureVal = document.getElementById('calc-tenure-val');

  const emiDisplay = document.getElementById('calc-emi-result');
  const totalInterestDisplay = document.getElementById('calc-interest-result');
  const appreciationDisplay = document.getElementById('calc-appreciation-result');

  if (!loanSlider || !rateSlider || !tenureSlider) return;

  function formatCurrency(amount) {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  }

  function updateCalculations() {
    const P = parseFloat(loanSlider.value); // Principal in Rupees
    const R = parseFloat(rateSlider.value) / 12 / 100; // Monthly interest rate
    const N = parseFloat(tenureSlider.value) * 12; // Total months

    // Format display labels
    const pInLakhs = (P / 100000).toFixed(1);
    if (P >= 10000000) {
      loanVal.textContent = '₹' + (P / 10000000).toFixed(2) + ' Cr';
    } else {
      loanVal.textContent = '₹' + pInLakhs + ' Lakhs';
    }

    rateVal.textContent = rateSlider.value + '% p.a.';
    tenureVal.textContent = tenureSlider.value + ' Years';

    // EMI formula: P * R * (1+R)^N / [(1+R)^N - 1]
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    // Projected 5-Year Capital Growth at 13.5% CAGR in Bachupally/Pragathi Nagar
    const futureVal = P * Math.pow(1 + 0.135, 5);
    const estimatedGains = futureVal - P;

    if (emiDisplay) emiDisplay.textContent = formatCurrency(emi) + '/mo';
    if (totalInterestDisplay) totalInterestDisplay.textContent = formatCurrency(totalInterest);
    if (appreciationDisplay) appreciationDisplay.textContent = '+' + formatCurrency(estimatedGains);
  }

  loanSlider.addEventListener('input', updateCalculations);
  rateSlider.addEventListener('input', updateCalculations);
  tenureSlider.addEventListener('input', updateCalculations);

  updateCalculations();
}

// -------------------------------------------------------------
// 5. Lead Capture & Direct Dispatch Engine
// -------------------------------------------------------------
const PRIMARY_PHONE = '919010491049';
const SECONDARY_PHONE = '919010751075';

function getLeads() {
  try {
    return JSON.parse(localStorage.getItem('oxygen_captured_leads') || '[]');
  } catch (e) {
    return [];
  }
}

function saveLead(lead) {
  const leads = getLeads();
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const newLead = { ...lead, id: 'OXY-' + Date.now(), timestamp };
  leads.unshift(newLead);
  localStorage.setItem('oxygen_captured_leads', JSON.stringify(leads));
  return newLead;
}

function initLeadForms() {
  document.querySelectorAll('form[data-lead-form]').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn ? btn.innerHTML : 'Submit';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Securing Exclusive Access...`;
      }

      const formData = new FormData(this);
      const leadData = {
        name: formData.get('name') || 'Valued Buyer',
        phone: formData.get('phone') || '',
        email: formData.get('email') || '',
        interest: formData.get('interest') || 'Triplex Villa / Luxury Apartment',
        date: formData.get('date') || 'Earliest Convenience',
        source: this.getAttribute('data-lead-source') || 'Landing Page Form'
      };

      saveLead(leadData);

      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalText;
        }

        // Close any open modals
        closeAllModals();

        // Show Luxury Thank You Dialog
        showThankYouModal(leadData);

        // Reset form
        form.reset();
      }, 700);
    });
  });
}

function showThankYouModal(leadData) {
  const modal = document.getElementById('thank-you-modal');
  const leadNameSpan = document.getElementById('ty-lead-name');
  const whatsappLink = document.getElementById('ty-whatsapp-link');

  if (leadNameSpan) leadNameSpan.textContent = leadData.name;

  if (whatsappLink) {
    const waText = encodeURIComponent(
      `Hello Oxygen Homes, I am ${leadData.name}. I just requested the Phase-1 Pre-Launch details for ${leadData.interest}. Please share the official brochure and schedule my VIP site visit.`
    );
    whatsappLink.href = `https://wa.me/${PRIMARY_PHONE}?text=${waText}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// -------------------------------------------------------------
// 6. Generic Modal Handlers
// -------------------------------------------------------------
window.openModal = function(modalId, contextTitle) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (contextTitle) {
    const titleEl = modal.querySelector('.modal-dynamic-title');
    if (titleEl) titleEl.textContent = contextTitle;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
};

function closeAllModals() {
  document.querySelectorAll('.app-modal').forEach(m => {
    m.classList.add('hidden');
    m.classList.remove('flex');
  });
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('app-modal')) {
    closeAllModals();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// -------------------------------------------------------------
// 7. Social Proof Activity Ticker (FOMO & Real-Time Urgency)
// -------------------------------------------------------------
const socialEvents = [
  { text: 'Rajesh & Sangeetha V. from Kondapur just booked a VIP Site Visit for Saturday.', time: '4 mins ago' },
  { text: 'IT Director from HITEC City unlocked Phase-1 Villa Master Plan.', time: '11 mins ago' },
  { text: 'NRI Investor from Texas reserved Triplex Villa Plot #28.', time: '22 mins ago' },
  { text: 'Venkat Rao from Miyapur downloaded Oxygen Pearl 3-BHK Pricing.', time: '35 mins ago' },
  { text: 'Dr. Praveen K. scheduled a complimentary cab pickup for site tour.', time: '48 mins ago' }
];

function initSocialProofTicker() {
  const ticker = document.getElementById('social-proof-ticker');
  const tickerText = document.getElementById('ticker-text');
  const tickerTime = document.getElementById('ticker-time');

  if (!ticker || !tickerText) return;

  let index = 0;

  function showNextEvent() {
    const item = socialEvents[index % socialEvents.length];
    tickerText.textContent = item.text;
    if (tickerTime) tickerTime.textContent = item.time;

    ticker.classList.remove('hidden');
    ticker.classList.add('ticker-slide-in');

    setTimeout(() => {
      ticker.classList.add('hidden');
      index++;
    }, 5500);
  }

  // Initial delay 4s, then every 22 seconds
  setTimeout(showNextEvent, 4000);
  setInterval(showNextEvent, 22000);
}

// -------------------------------------------------------------
// 8. Exit-Intent Trigger (Encashment Retention)
// -------------------------------------------------------------
function initExitIntent() {
  let hasTriggered = sessionStorage.getItem('oxygen_exit_shown');
  if (hasTriggered) return;

  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 15 && !sessionStorage.getItem('oxygen_exit_shown')) {
      sessionStorage.setItem('oxygen_exit_shown', 'true');
      openModal('exit-intent-modal');
    }
  });
}

// -------------------------------------------------------------
// 9. Admin Lead Vault (Secret Hotkey & Exporter)
// -------------------------------------------------------------
function initAdminDashboard() {
  // Listen for Ctrl+Shift+L
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      e.preventDefault();
      openAdminVault();
    }
  });

  const exportBtn = document.getElementById('export-leads-csv');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportLeadsToCSV);
  }

  const clearBtn = document.getElementById('clear-leads-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all stored leads from this device?')) {
        localStorage.removeItem('oxygen_captured_leads');
        renderLeadsTable();
      }
    });
  }
}

window.openAdminVault = function() {
  renderLeadsTable();
  openModal('admin-leads-modal');
};

function renderLeadsTable() {
  const tbody = document.getElementById('admin-leads-tbody');
  const countBadge = document.getElementById('admin-leads-count');
  if (!tbody) return;

  const leads = getLeads();
  if (countBadge) countBadge.textContent = leads.length + ' Leads Captured';

  if (leads.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-400">No leads captured on this browser yet. Submit a test form on the page!</td></tr>`;
    return;
  }

  tbody.innerHTML = leads.map(l => `
    <tr class="border-b border-slate-800 text-xs hover:bg-[#15271E]">
      <td class="py-2.5 px-3 text-[#C5A880] font-mono">${l.id}</td>
      <td class="py-2.5 px-3 font-semibold text-white">${escapeHtml(l.name)}</td>
      <td class="py-2.5 px-3"><a href="tel:${escapeHtml(l.phone)}" class="text-emerald-400 hover:underline">${escapeHtml(l.phone)}</a></td>
      <td class="py-2.5 px-3">${escapeHtml(l.interest)}</td>
      <td class="py-2.5 px-3 text-slate-400">${escapeHtml(l.source)}</td>
      <td class="py-2.5 px-3 text-slate-400 font-mono">${escapeHtml(l.timestamp)}</td>
    </tr>
  `).join('');
}

function exportLeadsToCSV() {
  const leads = getLeads();
  if (!leads.length) {
    alert('No leads to export.');
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,ID,Name,Phone,Email,Interest,Source,Timestamp\n";
  leads.forEach(l => {
    const row = [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone.replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${l.interest.replace(/"/g, '""')}"`,
      `"${l.source.replace(/"/g, '""')}"`,
      `"${l.timestamp}"`
    ].join(',');
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Oxygen_Homes_Leads_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
