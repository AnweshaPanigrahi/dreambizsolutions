/* ==========================================================================
   DreamBiz Solutions - Paid Consultation & Appointment Booking Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBookingPortal();
});

function initBookingPortal() {
  const bookingRoot = document.querySelector('#booking-app');
  if (!bookingRoot) return;

  const packageCards = bookingRoot.querySelectorAll('.pricing-card[data-package]');
  const slotButtons = bookingRoot.querySelectorAll('.slot-btn');
  const dateInput = bookingRoot.querySelector('#booking-date');
  const packageSelectedDisplay = bookingRoot.querySelector('#summary-package-name');
  const priceDisplay = bookingRoot.querySelector('#summary-price');
  const bookingForm = bookingRoot.querySelector('#consultation-booking-form');

  let selectedPackage = {
    name: '60-Min Comprehensive Video Consultation',
    price: '$149 / AED 550',
    id: 'video-60'
  };

  let selectedSlot = '11:00 AM (GST / UAE)';

  // Set default minimum date to tomorrow
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Package select
  packageCards.forEach(card => {
    const selectBtn = card.querySelector('.btn-select-package');
    if (!selectBtn) return;

    selectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      packageCards.forEach(c => c.classList.remove('featured'));
      card.classList.add('featured');

      const pkgName = card.getAttribute('data-package-name') || 'Consultation';
      const pkgPrice = card.getAttribute('data-package-price') || '$149';
      const pkgId = card.getAttribute('data-package');

      selectedPackage = { name: pkgName, price: pkgPrice, id: pkgId };

      if (packageSelectedDisplay) packageSelectedDisplay.textContent = selectedPackage.name;
      if (priceDisplay) priceDisplay.textContent = selectedPackage.price;

      // Scroll to booking form
      const step2 = document.querySelector('#booking-step-details');
      if (step2) {
        step2.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Slot buttons
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSlot = btn.textContent.trim();
    });
  });

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = bookingForm.querySelector('#client-name')?.value || 'Valued Client';
      const email = bookingForm.querySelector('#client-email')?.value || '';
      const phone = bookingForm.querySelector('#client-phone')?.value || '';
      const platform = bookingForm.querySelector('#client-platform')?.value || 'Google Meet';
      const date = dateInput ? dateInput.value : 'Tomorrow';

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Reserving Consultation Slot...</span>';
      }

      setTimeout(() => {
        // Show confirmation modal
        const confirmModal = document.querySelector('#booking-confirm-modal');
        if (confirmModal) {
          const detailsEl = confirmModal.querySelector('#confirm-details-text');
          if (detailsEl) {
            detailsEl.innerHTML = `
              <strong>Package:</strong> ${selectedPackage.name} (${selectedPackage.price})<br>
              <strong>Date & Time:</strong> ${date} at ${selectedSlot}<br>
              <strong>Platform:</strong> ${platform}<br>
              <strong>Attendee:</strong> ${name} (${email}, ${phone})<br><br>
              <span style="color:#10B981; font-weight:600;">✓ Calendar invite & payment link has been dispatched to your email & WhatsApp.</span>
            `;
          }
          confirmModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }

        bookingForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Confirm & Reserve Slot';
        }
      }, 1200);
    });
  }
}
