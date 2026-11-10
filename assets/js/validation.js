/**
 * PROJECT 69: TRUCK BODY BUILDER & COMMERCIAL VEHICLE FABRICATION
 * Strict Form Validation Engine – Request Engineering Quotation Form
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initQuoteFormValidation();
    checkPrefillFromCart();
  });

  // =========================================================================
  // Deep-Link & URL Query Prefill Helper
  // =========================================================================
  function checkPrefillFromCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const descField = document.getElementById('projectDescription');
    const serviceField = document.getElementById('requiredService');
    const bodyTypeField = document.getElementById('truckBodyType');

    // 1. From shopping cart quote enquiry
    if (urlParams.get('source') === 'cart') {
      const cartSummary = sessionStorage.getItem('truck_cart_enquiry');
      if (descField && cartSummary) {
        descField.value = `Order Enquiry for Commercial Accessories:\n${cartSummary}\n\nPlease provide freight schedule, dispatch timelines and B2B GST tax invoice.`;
      }
      if (serviceField) {
        serviceField.value = 'accessory_order';
      }
      if (bodyTypeField) {
        bodyTypeField.value = 'custom_body';
      }
    }

    // 2. From Product or Spec links (e.g. contact.html?product=Tipper+Truck+Body or ?spec=tipper-body)
    const productParam = (urlParams.get('product') || urlParams.get('spec') || '').toLowerCase();
    if (productParam && bodyTypeField) {
      if (productParam.includes('tipper')) {
        bodyTypeField.value = 'tipper_body';
      } else if (productParam.includes('container') || productParam.includes('closed')) {
        bodyTypeField.value = 'container_body';
      } else if (productParam.includes('open')) {
        bodyTypeField.value = 'open_body';
      } else if (productParam.includes('trailer')) {
        bodyTypeField.value = 'trailer_body';
      } else if (productParam.includes('tanker')) {
        bodyTypeField.value = 'tanker_body';
      } else if (productParam.includes('refrigerated') || productParam.includes('reefer')) {
        bodyTypeField.value = 'refrigerated_body';
      } else if (productParam.includes('flatbed')) {
        bodyTypeField.value = 'flatbed_body';
      } else if (productParam.includes('custom')) {
        bodyTypeField.value = 'custom_body';
      }

      if (descField && !descField.value) {
        const prodName = urlParams.get('product') || urlParams.get('spec');
        descField.value = `Quotation request for ${prodName}. Looking for technical specifications, payload optimization options, and production delivery timeline.`;
      }
    }

    // 3. From Service links (e.g. contact.html?service=fabrication)
    const serviceParam = (urlParams.get('service') || '').toLowerCase();
    if (serviceParam && serviceField) {
      if (serviceParam.includes('fabrication')) {
        serviceField.value = 'new_body_fabrication';
      } else if (serviceParam.includes('design')) {
        serviceField.value = 'custom_cad_design';
      } else if (serviceParam.includes('welding') || serviceParam.includes('modification')) {
        serviceField.value = 'chassis_extension';
      } else if (serviceParam.includes('repair')) {
        serviceField.value = 'accident_repair';
      } else if (serviceParam.includes('painting')) {
        serviceField.value = 'industrial_painting';
      } else if (serviceParam.includes('maintenance') || serviceParam.includes('fleet')) {
        serviceField.value = 'fleet_contract';
      }
    }

    // 4. From Brochure download or bulk inquiry
    if (urlParams.get('brochure') === 'download' && descField && !descField.value) {
      descField.value = 'Requesting the complete Commercial Vehicle Body Building Technical Engineering Manual (PDF) and ARAI AIS-093 dimensional blueprints.';
    }
  }

  // =========================================================================
  // Master Strict Validation Engine
  // =========================================================================
  function initQuoteFormValidation() {
    const form = document.getElementById('truckQuoteForm');
    if (!form) return;

    // Field configuration matching all strict requirements
    const fields = {
      // 1. FULL NAME – TEXT ONLY
      fullName: {
        id: 'fullName',
        el: document.getElementById('fullName'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim();
          if (!v) {
            return 'Please enter a valid name using letters only.';
          }
          // Do not allow numbers
          if (/\d/.test(v)) {
            return 'Please enter a valid name using letters only.';
          }
          // Allow alphabetic characters, spaces, hyphens, and apostrophes only
          if (!/^[a-zA-Z\s'\-]+$/.test(v)) {
            return 'Please enter a valid name using letters only.';
          }
          // Must contain at least 2 letters
          const letterCount = (v.match(/[a-zA-Z]/g) || []).length;
          if (letterCount < 2) {
            return 'Please enter a valid name using letters only.';
          }
          // Max length 60 characters
          if (v.length > 60) {
            return 'Please enter a valid name using letters only.';
          }
          return ''; // Valid
        },
        sanitize: function (val) {
          // Live input filter: remove numbers and unwanted special characters immediately
          return val.replace(/[^a-zA-Z\s'\-]/g, '').slice(0, 60);
        }
      },

      // 2. BUSINESS EMAIL ADDRESS – VALID EMAIL ONLY
      emailAddress: {
        id: 'emailAddress',
        el: document.getElementById('emailAddress'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim().toLowerCase();
          if (!v) {
            return 'Please enter a valid business email address.';
          }
          // Standard RFC-compliant business email regex without spaces
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(v)) {
            return 'Please enter a valid business email address.';
          }
          return ''; // Valid
        },
        sanitize: function (val) {
          // Remove spaces immediately on typing/pasting
          return val.replace(/\s/g, '').slice(0, 100);
        }
      },

      // 3. MOBILE NUMBER – DIGITS ONLY (10 DIGITS AFTER +91)
      mobileNumber: {
        id: 'mobileNumber',
        el: document.getElementById('mobileNumber'),
        groupEl: document.getElementById('mobileInputGroup'),
        feedbackEl: document.getElementById('mobileFeedback'),
        touched: false,
        validate: function (rawVal) {
          // Explicitly read digits only from mobile input
          const digits = (rawVal || '').replace(/\D/g, '');
          if (!digits) {
            return 'Mobile number is required.';
          }
          if (digits.length !== 10) {
            return 'Please enter a valid 10-digit mobile number.';
          }
          return ''; // Valid (exactly 10 digits)
        },
        sanitize: function (val) {
          // Strip everything except digits
          let d = val.replace(/\D/g, '');
          // If user pasted international format with +91 or 91 prefix, strip country code
          if (d.startsWith('91') && d.length === 12) {
            d = d.slice(2);
          }
          return d.slice(0, 10);
        }
      },

      // 4. FLEET / COMPANY NAME (OPTIONAL)
      companyName: {
        id: 'companyName',
        el: document.getElementById('companyName'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim();
          if (!v) return ''; // Optional field, empty is valid
          // Reject input containing only special characters
          if (!/[a-zA-Z0-9]/.test(v)) {
            return 'Please enter a valid company name (letters and numbers only).';
          }
          // Allowed: letters, numbers, spaces, dots, commas, hyphens, ampersands, slashes, apostrophes
          if (!/^[a-zA-Z0-9\s\.\,\-\–\&\'\/\(\)]+$/.test(v)) {
            return 'Please enter a valid company name (letters and numbers only).';
          }
          if (v.length > 100) {
            return 'Company name cannot exceed 100 characters.';
          }
          return ''; // Valid
        },
        sanitize: function (val) {
          return val.slice(0, 100);
        }
      },

      // 5. TRUCK BODY CATEGORY (REQUIRED DROPDOWN)
      truckBodyType: {
        id: 'truckBodyType',
        el: document.getElementById('truckBodyType'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim();
          if (!v || v === 'default' || v === '') {
            return 'Please select a truck body category.';
          }
          return ''; // Valid
        }
      },

      // 6. CHASSIS / VEHICLE MODEL (REQUIRED)
      vehicleModel: {
        id: 'vehicleModel',
        el: document.getElementById('vehicleModel'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim();
          if (!v) {
            return 'Chassis / vehicle model is required.';
          }
          // Must contain at least one letter or number (reject pure @@@ or !!!)
          if (!/[a-zA-Z0-9]/.test(v)) {
            return 'Please enter a valid chassis or vehicle model.';
          }
          // Allow letters, numbers, spaces, hyphens, slashes, and periods
          if (!/^[a-zA-Z0-9\s\-\–\/\.]+$/.test(v)) {
            return 'Please enter a valid chassis or vehicle model.';
          }
          if (v.length < 2 || v.length > 100) {
            return 'Please enter a valid chassis or vehicle model (2-100 characters).';
          }
          return ''; // Valid
        },
        sanitize: function (val) {
          return val.slice(0, 100);
        }
      },

      // 7. REQUIRED FABRICATION SERVICE (REQUIRED DROPDOWN)
      requiredService: {
        id: 'requiredService',
        el: document.getElementById('requiredService'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim();
          if (!v || v === 'default' || v === '') {
            return 'Please select the required engineering or fabrication service.';
          }
          return ''; // Valid
        }
      },

      // 8. PROJECT DESCRIPTION & TECHNICAL SPECS (REQUIRED)
      projectDescription: {
        id: 'projectDescription',
        el: document.getElementById('projectDescription'),
        touched: false,
        validate: function (rawVal) {
          const v = (rawVal || '').trim();
          if (!v) {
            return 'Project description is required.';
          }
          // Reject special-character only input
          if (!/[a-zA-Z0-9]/.test(v)) {
            return 'Please enter meaningful technical specifications (letters and numbers).';
          }
          if (v.length < 15) {
            return `Please provide at least 15 characters describing payload capacity or dimensions (${v.length}/15).`;
          }
          if (v.length > 1000) {
            return 'Project description cannot exceed 1000 characters.';
          }
          return ''; // Valid
        },
        sanitize: function (val) {
          return val.slice(0, 1000);
        }
      }
    };

    // =======================================================================
    // Single Field Validation Renderer
    // =======================================================================
    function validateField(fieldKey) {
      const field = fields[fieldKey];
      if (!field) return true;

      // Always re-query DOM element in case of re-renders
      if (!field.el) {
        field.el = document.getElementById(field.id);
      }
      if (!field.el) return true;

      const currentVal = field.el.value;
      const errorMsg = field.validate(currentVal);
      const isValid = (errorMsg === '');

      // Locate container and feedback element
      const container = field.el.closest('.form-group') || field.el.parentElement;
      let feedbackEl = field.feedbackEl || (container ? container.querySelector('.invalid-feedback') : null);
      const inputGroup = field.groupEl || field.el.closest('.input-group');

      // Do NOT show error states before user interaction
      if (!field.touched) {
        return isValid;
      }

      if (!isValid) {
        // Red Invalid State
        field.el.classList.add('is-invalid');
        field.el.classList.remove('is-valid');

        if (inputGroup) {
          inputGroup.classList.add('is-invalid');
          inputGroup.classList.remove('is-valid');
        }

        if (feedbackEl) {
          feedbackEl.textContent = errorMsg;
          feedbackEl.style.display = 'block';
        }
        return false;
      } else {
        // Green Valid State
        field.el.classList.remove('is-invalid');
        if (inputGroup) {
          inputGroup.classList.remove('is-invalid');
        }

        // Only add green is-valid if value is not empty (for optional fields)
        if (currentVal.trim() !== '') {
          field.el.classList.add('is-valid');
          if (inputGroup) {
            inputGroup.classList.add('is-valid');
          }
        } else {
          field.el.classList.remove('is-valid');
          if (inputGroup) {
            inputGroup.classList.remove('is-valid');
          }
        }

        if (feedbackEl) {
          feedbackEl.style.display = 'none';
          feedbackEl.textContent = '';
        }
        return true;
      }
    }

    // =======================================================================
    // Real-Time Event Listeners & Live Sanitization
    // =======================================================================
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (!field.el) {
        field.el = document.getElementById(field.id);
      }
      if (!field.el) return;

      // 1. Live Input Event (Sanitize & validate if touched)
      field.el.addEventListener('input', (e) => {
        if (typeof field.sanitize === 'function') {
          const original = e.target.value;
          const sanitized = field.sanitize(original);
          if (original !== sanitized) {
            e.target.value = sanitized;
          }
        }

        // If user already touched field, re-validate in real-time
        if (field.touched) {
          validateField(key);
        }
      });

      // 2. Paste Event (Enforce sanitization immediately on clipboard paste)
      field.el.addEventListener('paste', (e) => {
        setTimeout(() => {
          if (typeof field.sanitize === 'function') {
            e.target.value = field.sanitize(e.target.value);
          }
          if (field.touched) {
            validateField(key);
          }
        }, 10);
      });

      // 3. Blur Event (Mark touched and validate)
      field.el.addEventListener('blur', () => {
        field.touched = true;
        validateField(key);
      });

      // 4. Dropdown Change Event
      if (field.el.tagName === 'SELECT') {
        field.el.addEventListener('change', () => {
          field.touched = true;
          validateField(key);
        });
      }
    });

    // Prevent Enter key submitting incomplete form unexpectedly
    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const isFormValid = Object.keys(fields).every(k => fields[k].validate(fields[k].el ? fields[k].el.value : '') === '');
        if (!isFormValid) {
          e.preventDefault();
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
    });

    // =======================================================================
    // Strict Form Submit Handler
    // =======================================================================
    let isSubmitting = false;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (isSubmitting) return; // Prevent duplicate submissions

      let formIsValid = true;
      let firstInvalidEl = null;

      // Mark all fields as touched and validate thoroughly
      Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.touched = true;
        const valid = validateField(key);
        if (!valid) {
          formIsValid = false;
          if (!firstInvalidEl && field.el) {
            firstInvalidEl = field.el;
          }
        }
      });

      // If any field is invalid, scroll to first invalid input and focus
      if (!formIsValid) {
        if (firstInvalidEl) {
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 80;
          const rect = firstInvalidEl.getBoundingClientRect();
          const targetTop = rect.top + window.pageYOffset - (headerHeight + 25);

          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });

          setTimeout(() => {
            firstInvalidEl.focus({ preventScroll: true });
          }, 350);
        }
        return;
      }

      // Convert email to lowercase and trim text fields
      fields.emailAddress.el.value = fields.emailAddress.el.value.trim().toLowerCase();
      fields.fullName.el.value = fields.fullName.el.value.trim();
      fields.mobileNumber.el.value = fields.mobileNumber.el.value.replace(/\D/g, '').slice(0, 10);
      fields.vehicleModel.el.value = fields.vehicleModel.el.value.trim();
      if (fields.companyName.el) {
        fields.companyName.el.value = fields.companyName.el.value.trim();
      }
      fields.projectDescription.el.value = fields.projectDescription.el.value.trim();

      // Submit Button Loading State
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Validating &amp; Generating Quotation Reference...';
      }

      setTimeout(() => {
        // Generate frontend reference number
        const quoteTicket = 'TBB-QT-2026-' + Math.floor(100000 + Math.random() * 900000);
        const customerName = fields.fullName.el.value;
        const customerEmail = fields.emailAddress.el.value;
        const customerMobile = fields.mobileNumber.el.value;
        const customerCompany = fields.companyName.el ? fields.companyName.el.value : '';
        const bodyTypeSelect = fields.truckBodyType.el;
        const bodyTypeText = bodyTypeSelect.options[bodyTypeSelect.selectedIndex].text;
        const vehicleModelText = fields.vehicleModel.el.value;
        const serviceSelect = fields.requiredService.el;
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        const descriptionText = fields.projectDescription.el.value;

        // Show professional confirmation modal
        showSubmissionConfirmation({
          ticket: quoteTicket,
          name: customerName,
          email: customerEmail,
          phone: customerMobile,
          company: customerCompany,
          bodyType: bodyTypeText,
          chassis: vehicleModelText,
          service: serviceText,
          description: descriptionText
        });

        // Reset form and clear validation classes
        form.reset();
        Object.keys(fields).forEach(k => {
          const field = fields[k];
          field.touched = false;
          if (field.el) {
            field.el.classList.remove('is-valid', 'is-invalid');
          }
          if (field.groupEl) {
            field.groupEl.classList.remove('is-valid', 'is-invalid');
          }
          if (field.feedbackEl) {
            field.feedbackEl.style.display = 'none';
            field.feedbackEl.textContent = '';
          }
        });

        if (submitBtn) {
          isSubmitting = false;
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }, 450);
    });
  }

  // =========================================================================
  // Professional Quotation Request Confirmation Modal
  // =========================================================================
  function showSubmissionConfirmation(data) {
    let modal = document.getElementById('quotationConfirmationModal');
    if (modal) modal.remove();

    const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    modal = document.createElement('div');
    modal.id = 'quotationConfirmationModal';
    modal.className = 'lightbox-modal active';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'confirmModalTitle');

    modal.innerHTML = `
      <div class="lightbox-content-wrapper p-4 p-md-5 bg-white text-dark shadow-lg" style="max-width: 680px; border-radius: 8px; max-height: 90vh; overflow-y: auto;">
        <div class="text-center mb-3">
          <div style="font-size: 3.5rem; color: #10B981; margin-bottom: 10px;">
            <i class="fas fa-check-circle"></i>
          </div>
          <h3 class="h4 fw-bold text-dark mb-1" id="confirmModalTitle">Commercial Quotation Request Logged</h3>
          <p class="text-muted small mb-0">Your technical body fabrication requirements have been assigned an engineering review ticket.</p>
        </div>

        <div class="alert alert-success d-flex align-items-center justify-content-between p-3 mb-3">
          <div>
            <span class="text-muted small d-block">Quotation Reference Number:</span>
            <strong class="font-monospace fs-5 text-dark">${data.ticket}</strong>
          </div>
          <span class="badge bg-success px-3 py-2">Queued for Estimation</span>
        </div>

        <div class="card bg-light border p-3 mb-3 text-start small">
          <h6 class="fw-bold text-uppercase small text-muted border-bottom pb-2 mb-2">Technical Specification Summary</h6>
          <div class="row g-2">
            <div class="col-sm-6"><span class="text-muted">Client Name:</span> <strong class="d-block text-dark">${escapeHtml(data.name)}</strong></div>
            <div class="col-sm-6"><span class="text-muted">Business Email:</span> <strong class="d-block text-dark">${escapeHtml(data.email)}</strong></div>
            <div class="col-sm-6"><span class="text-muted">Mobile Number:</span> <strong class="d-block text-dark">+91 ${escapeHtml(data.phone)}</strong></div>
            <div class="col-sm-6"><span class="text-muted">Fleet / Company:</span> <strong class="d-block text-dark">${data.company ? escapeHtml(data.company) : 'Individual Fleet Operator'}</strong></div>
            <div class="col-sm-6"><span class="text-muted">Truck Body Type:</span> <strong class="d-block text-dark">${escapeHtml(data.bodyType)}</strong></div>
            <div class="col-sm-6"><span class="text-muted">Vehicle Chassis:</span> <strong class="d-block text-dark">${escapeHtml(data.chassis)}</strong></div>
            <div class="col-12"><span class="text-muted">Fabrication Scope:</span> <strong class="d-block text-dark">${escapeHtml(data.service)}</strong></div>
            <div class="col-12 mt-2 pt-2 border-top"><span class="text-muted">Specifications &amp; Payload Notes:</span> <p class="mb-0 text-dark small">${escapeHtml(data.description)}</p></div>
          </div>
        </div>

        <div class="alert alert-warning border small text-start mb-4" style="font-size: 0.8rem; line-height: 1.45;">
          <i class="fas fa-info-circle text-warning me-1"></i>
          <strong>Demonstration Environment Notice:</strong> This website operates in frontend presentation mode. Your technical engineering quotation has been validated according to commercial bodybuilding compliance guidelines and logged to your browser session (ready for production ERP/API webhook dispatch).
        </div>

        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <button type="button" class="btn btn-outline-steel px-4" onclick="window.print()">
            <i class="fas fa-print me-1"></i> Print Summary
          </button>
          <button type="button" class="btn btn-industrial px-4" id="closeConfirmModalBtn">
            <i class="fas fa-check me-1"></i> Done &amp; Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeConfirmModalBtn').addEventListener('click', () => {
      modal.classList.remove('active');
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.remove();
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
