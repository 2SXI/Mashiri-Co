// Shared site script — loaded on every page. Each block guards on the
// elements it needs so it works whether or not a given page contains them.

// ===== Header scroll state =====
const header = document.getElementById('site-header');
if (header) {
  const updateHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 40);
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

// ===== Mobile menu =====
const menuToggle = document.getElementById('menu-toggle');
const navPanel = document.getElementById('nav-mobile-panel');
if (menuToggle && navPanel) {
  menuToggle.addEventListener('click', () => {
    const open = navPanel.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  navPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navPanel.classList.remove('mobile-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ===== Document Library (credentials.html and services.html) =====
const docLibraryItems = document.querySelectorAll('.doc-library-list li[data-file]');
docLibraryItems.forEach(li => {
  const file = li.getAttribute('data-file');
  const status = li.querySelector('.doc-library-status');
  fetch(file, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        li.innerHTML = `<span class="doc-library-name">${li.querySelector('.doc-library-name').textContent}</span><a href="${file}" download class="doc-library-download">Download PDF</a>`;
      } else {
        throw new Error('not found');
      }
    })
    .catch(() => {
      if (status) status.textContent = 'Not yet uploaded';
      if (status) status.classList.add('pending');
    });
});

// ===== Document Verification Lightbox (credentials.html only) =====
const docOverlay = document.getElementById('doc-overlay');
const docLightbox = document.getElementById('doc-lightbox');
const docClose = document.getElementById('doc-close');
const docTitle = document.getElementById('doc-lightbox-title');
const docBody = document.getElementById('doc-lightbox-body');

if (docOverlay && docLightbox && docClose && docTitle && docBody) {
  const docContent = {
    'cert-reg': {
      title: 'Certificate of Re-registration',
      file: 'documents/certificate-of-reregistration.pdf',
      html: `
        <div class="doc-detail-grid">
          <div><span class="dd-label">Entity name</span><span class="dd-value">Mashiri &amp; Company Registered Public Accountants (Private) Limited</span></div>
          <div><span class="dd-label">Entity number</span><span class="dd-value mono">62045A02102025</span></div>
          <div><span class="dd-label">Date of incorporation</span><span class="dd-value">24 June 2019</span></div>
          <div><span class="dd-label">Date of re-registration</span><span class="dd-value">6 October 2025</span></div>
          <div><span class="dd-label">Status</span><span class="dd-value status-ok">Registered</span></div>
          <div><span class="dd-label">Issuing authority</span><span class="dd-value">Chief Registrar of Companies, Zimbabwe</span></div>
        </div>
        <p class="doc-verify-line">Verify at <span class="mono">cipz.gov.zw</span> using the entity number above or the certificate's QR code.</p>
      `
    },
    'cert-practice': {
      title: 'Practising Certificate No. 148',
      file: 'documents/practising-certificate.pdf',
      html: `
        <div class="doc-detail-grid">
          <div><span class="dd-label">Certificate holder</span><span class="dd-value">Mashiri, Cleopas T.</span></div>
          <div><span class="dd-label">Authorised to practise as</span><span class="dd-value">Public Accountant</span></div>
          <div><span class="dd-label">Certificate number</span><span class="dd-value mono">148</span></div>
          <div><span class="dd-label">Issued</span><span class="dd-value">10 January 2001</span></div>
          <div><span class="dd-label">Conditions</span><span class="dd-value">Nil</span></div>
          <div><span class="dd-label">Issuing body</span><span class="dd-value">Public Accountants and Auditors Board, Zimbabwe</span></div>
        </div>
        <p class="doc-verify-line">Issued under the Public Accountants and Auditors Act [Chapter 27:12].</p>
      `
    },
    'cert-tax': {
      title: 'ZIMRA Tax Clearance Certificate (ITF263)',
      file: 'documents/zimra-tax-clearance.pdf',
      html: `
        <div class="doc-detail-grid">
          <div><span class="dd-label">Taxpayer name</span><span class="dd-value">Mashiri &amp; Company Registered Public Accountants</span></div>
          <div><span class="dd-label">TIN</span><span class="dd-value mono">2001676523</span></div>
          <div><span class="dd-label">Tax position</span><span class="dd-value status-ok">Satisfactory — no tax should be withheld</span></div>
          <div><span class="dd-label">Validity period</span><span class="dd-value">1 January 2026 — 30 June 2026</span></div>
          <div><span class="dd-label">Issued</span><span class="dd-value">27 December 2025</span></div>
          <div><span class="dd-label">Authentication code</span><span class="dd-value mono">48983509</span></div>
        </div>
        <p class="doc-verify-line">Verify at <span class="mono">mytaxselfservice.zimra.co.zw</span> using the authentication code or QR code on the certificate.</p>
      `
    },
    'cert-entity': {
      title: 'Entity Summary & Directors',
      file: 'documents/entity-summary.pdf',
      html: `
        <div class="doc-detail-grid">
          <div><span class="dd-label">Registered office</span><span class="dd-value">10773 Budiriro 5, Harare</span></div>
          <div><span class="dd-label">Major object</span><span class="dd-value">Accounting, taxation, auditing, company secretarial and financial advisory services</span></div>
          <div><span class="dd-label">Liability</span><span class="dd-value">Limited by shares</span></div>
          <div><span class="dd-label">Authorised shares</span><span class="dd-value">2,000 ordinary shares</span></div>
          <div><span class="dd-label">Director — Managing</span><span class="dd-value">Cleopas Tsvakayi Mashiri, appointed 24 June 2019</span></div>
          <div><span class="dd-label">Director</span><span class="dd-value">Portifa Musekiwa, appointed 8 October 2025</span></div>
          <div><span class="dd-label">Secretary / Principal Officer</span><span class="dd-value">Cleopas Tsvakayi Mashiri, appointed 6 October 2025</span></div>
        </div>
        <p class="doc-verify-line">Source: Entity Summary Document, The Companies Office of Zimbabwe.</p>
      `
    }
  };

  let lastDocTrigger = null;

  const getFocusable = (container) =>
    Array.from(container.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.disabled && el.offsetParent !== null);

  function openDoc(key, triggerEl) {
    const data = docContent[key];
    if (!data) return;
    lastDocTrigger = triggerEl || document.activeElement;
    docTitle.textContent = data.title;
    docBody.innerHTML = data.html + '<div class="doc-file-area" id="doc-file-area"><p class="doc-file-loading">Checking for uploaded document&hellip;</p></div>';
    docLightbox.classList.add('open');
    docOverlay.classList.add('open');
    docClose.focus();

    const fileArea = document.getElementById('doc-file-area');
    if (data.file) {
      fetch(data.file, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            fileArea.innerHTML = `
              <div class="doc-file-found">
                <iframe src="${data.file}" title="${data.title} (PDF)" loading="lazy"></iframe>
                <a href="${data.file}" download class="btn-secondary doc-download">Download PDF</a>
              </div>`;
          } else {
            throw new Error('not found');
          }
        })
        .catch(() => {
          fileArea.innerHTML = '<p class="doc-file-pending">The scanned document for this certificate hasn&rsquo;t been uploaded yet &mdash; the details above are accurate and verifiable directly with the issuing authority in the meantime.</p>';
        });
    } else {
      fileArea.remove();
    }
  }
  function closeDoc() {
    docLightbox.classList.remove('open');
    docOverlay.classList.remove('open');
    if (lastDocTrigger) lastDocTrigger.focus();
  }
  document.querySelectorAll('.cred-item').forEach(card => {
    card.addEventListener('click', () => openDoc(card.getAttribute('data-doc'), card));
  });
  docClose.addEventListener('click', closeDoc);
  docOverlay.addEventListener('click', closeDoc);
  document.addEventListener('keydown', (e) => {
    if (!docLightbox.classList.contains('open')) return;
    if (e.key === 'Escape') { closeDoc(); return; }
    if (e.key === 'Tab') {
      const focusable = getFocusable(docLightbox);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
}

// ===== Contact form (contact.html only) =====
// NOTE: this is a static page with no backend. Submitting opens the visitor's
// own email client (mailto:) with the message pre-filled — nothing is silently
// "sent" without the visitor's own confirmation. A WhatsApp quick-action is
// offered alongside it since the firm already lists WhatsApp numbers.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const FIRM_EMAIL = 'acaciafinancials@gmail.com';
  const FIRM_WHATSAPP = '263783545876'; // international format, no leading +

  const formStatus = document.getElementById('form-status');
  const whatsappLink = document.getElementById('whatsapp-link');

  function buildMessageBody() {
    const name = contactForm.name.value.trim();
    const contact = contactForm.contact.value.trim();
    const company = contactForm.company.value.trim();
    const service = contactForm.service.value;
    const message = contactForm.message.value.trim();
    let body = `Name: ${name}\nReachable at: ${contact}\n`;
    if (company) body += `Company: ${company}\n`;
    body += `Service of interest: ${service}\n\nMessage:\n${message}`;
    return { name, message, body };
  }

  function updateWhatsAppLink() {
    if (!whatsappLink) return;
    const { body } = buildMessageBody();
    const text = contactForm.message.value.trim() ? body : 'Hi, I\'d like to enquire about your services.';
    whatsappLink.href = `https://wa.me/${FIRM_WHATSAPP}?text=${encodeURIComponent(text)}`;
  }
  contactForm.addEventListener('input', updateWhatsAppLink);
  updateWhatsAppLink();

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const { name, body } = buildMessageBody();
    const subject = `Consultation request from ${name}`;
    const mailto = `mailto:${FIRM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) formStatus.textContent = 'Opening your email app to send this — nothing has been sent yet.';
    window.location.href = mailto;
  });
}
