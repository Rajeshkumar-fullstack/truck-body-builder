/**
 * PROJECT 69: TRUCK BODY BUILDER
 * Strict Contact & Quotation Enquiry Form Validation
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initQuoteFormValidation();
    checkPrefillFromCart();
  });

  function checkPrefillFromCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const descField = document.getElementById('projectDescription');
    const serviceField = document.getElementById('requiredService');
    const bodyTypeField = document.getElementById('truckBodyType');

    // 1. From shopping cart
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
      } else if (serviceParam.includes('maintenance')) {
        serviceField.value = 'fleet_contract';
      }
    }

    // 4. From Brochure download or bulk inquiry
    if (urlParams.get('brochure') === 'download' && descField && !descField.value) {
      descField.value = 'Requesting the complete Commercial Vehicle Body Building Technical Engineering Manual (PDF) and ARAI AIS-093 dimensional blueprints.';
    }
  }

  function initQuoteFormValidation() {
    const form = document.getElementById('truckQuoteForm');
    if (!form) return;

    const fields = {
      fullName: {
        el: document.getElementById('fullName'),
        validate: (val) => /^[a-zA-Z\s]{3,50}$/.test(val.trim()),
        msg: 'Please enter a valid full name (letters and spaces only, min 3 characters).'
      },
      emailAddress: {
        el: document.getElementById('emailAddress'),
        validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
        msg: 'Please provide a valid business email address (e.g. name@company.com).'
      },
      mobileNumber: {
        el: document.getElementById('mobileNumber'),
        // Exactly 10 digits starting with 6, 7, 8, or 9 for Indian mobile numbers
        validate: (val) => /^[6-9]\d{9}$/.test(val.trim()),
        msg: 'Please enter a valid 10-digit Indian mobile number starting with 6-9.'
      },
      truckBodyType: {
        el: document.getElementById('truckBodyType'),
        validate: (val) => val && val.trim() !== '' && val !== 'default',
        msg: 'Please select a truck body category.'
      },
      vehicleModel: {
        el: document.getElementById('vehicleModel'),
        validate: (val) => val.trim().length >= 2,
        msg: 'Please enter the vehicle chassis model (e.g. Tata Signa 4825, BharatBenz 2823).'
      },
      requiredService: {
        el: document.getElementById('requiredService'),
        validate: (val) => val && val.trim() !== '' && val !== 'default',
        msg: 'Please select the required engineering or fabrication service.'
      },
      projectDescription: {
        el: document.getElementById('projectDescription'),
        validate: (val) => val.trim().length >= 15,
        msg: 'Please provide at least 15 characters describing payload capacity, dimensions, or usage.'
      }
    };

    // Attach real-time validation on input/change
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (field.el) {
        const handler = () => validateSingleField(field);
        field.el.addEventListener('input', handler);
        field.el.addEventListener('change', handler);
        field.el.addEventListener('blur', handler);
      }
    });

    function validateSingleField(field) {
      if (!field.el) return true;
      const isValid = field.validate(field.el.value);
      const feedbackEl = field.el.parentElement.querySelector('.invalid-feedback');

      if (!isValid) {
        field.el.classList.add('is-invalid');
        field.el.classList.remove('is-valid');
        if (feedbackEl) {
          feedbackEl.textContent = field.msg;
        }
        return false;
      } else {
        field.el.classList.remove('is-invalid');
        field.el.classList.add('is-valid');
        return true;
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;
      let firstInvalidField = null;

      Object.keys(fields).forEach(key => {
        const field = fields[key];
        const valid = validateSingleField(field);
        if (!valid) {
          formIsValid = false;
          if (!firstInvalidField && field.el) {
            firstInvalidField = field.el;
          }
        }
      });

      if (!formIsValid) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      // Generate frontend demo quotation reference number
      const quoteTicket = 'TBB-QT-' + Math.floor(100000 + Math.random() * 900000);
      const customerName = fields.fullName.el.value.trim();
      const bodyType = fields.truckBodyType.el.options[fields.truckBodyType.el.selectedIndex].text;
      const service = fields.requiredService.el.options[fields.requiredService.el.selectedIndex].text;

      // Show professional confirmation modal or container
      showSubmissionConfirmation({
        ticket: quoteTicket,
        name: customerName,
        phone: fields.mobileNumber.el.value.trim(),
        email: fields.emailAddress.el.value.trim(),
        bodyType: bodyType,
        service: service
      });

      form.reset();
      Object.keys(fields).forEach(k => {
        if (fields[k].el) {
          fields[k].el.classList.remove('is-valid');
        }
      });
    });
  }

  function showSubmissionConfirmation(data) {
    let modal = document.getElementById('quotationConfirmationModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quotationConfirmationModal';
      modal.className = 'lightbox-modal active';
      modal.innerHTML = `
        <div class="lightbox-content-wrapper p-4 text-center bg-white" style="max-width: 620px; border-radius: 8px;">
          <div style="font-size: 3.5rem; color: #10B981; margin-bottom: 15px;">
            <i class="fas fa-check-circle"></i>
          </div>
          <h3 class="h4 mb-2 text-dark fw-bold">Commercial Quotation Request Received!</h3>
          <p class="text-muted mb-3">Thank you, <strong>${data.name}</strong>. Your fabrication enquiry has been successfully logged with reference number:</p>
          <div class="p-3 mb-3 bg-light rounded border text-monospace fs-5 fw-bold text-primary">
            ${data.ticket}
          </div>
          <p class="small text-secondary mb-4 text-start">
            <strong>Selected Specifications:</strong><br>
            • Truck Body: ${data.bodyType}<br>
            • Service: ${data.service}<br>
            • Contact: ${data.phone} (${data.email})<br>
            <em>Note: This is a frontend demo submission. In production, this securely dispatches an ERP fabrication lead to our technical estimation desk.</em>
          </p>
          <div class="d-flex justify-content-center gap-2">
            <button class="btn btn-industrial" id="closeConfirmModalBtn">Done</button>
            <a href="gallery.html" class="btn btn-outline-steel">View Project Gallery</a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('closeConfirmModalBtn').addEventListener('click', () => {
        modal.classList.remove('active');
        modal.remove();
      });
    }
  }
})();
