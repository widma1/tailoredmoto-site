// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') nav.classList.remove('open');
});

// Contact form via Web3Forms
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const key = form.querySelector('[name="access_key"]').value;
  if (key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    status.textContent = 'Form not connected yet — please text us instead.';
    return;
  }
  const captcha = form.querySelector('[name="h-captcha-response"]');
  if (captcha && !captcha.value) {
    status.textContent = 'Please check the "I am human" box first.';
    return;
  }
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error();
    form.reset();
    status.textContent = "Received. We'll get back to you within a business day.";
  } catch {
    status.textContent = "Something went wrong — please call or text us instead.";
  } finally {
    btn.disabled = false;
    if (window.hcaptcha) window.hcaptcha.reset();
  }
});
