// ── NAV scroll shadow
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>20);
});

// ── Hamburger menu
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow=mobileMenu.classList.contains('open')?'hidden':'';
});
document.querySelectorAll('.mob-link,.mob-cta').forEach(el=>{
  el.addEventListener('click',()=>{
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow='';
  });
});

// ── Scroll reveal
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ── Contact Form — submits via Web3Forms
// Access key is safe to be public — it can only submit to this form.
const W3F_ACCESS_KEY = 'ffdcc896-2b4e-4f20-88bd-b9cc22549412';

async function submitForm(){
  const name    = document.getElementById('fname').value.trim();
  const company = document.getElementById('fcompany').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const service = document.getElementById('fservice').value;
  const budget  = document.getElementById('fbudget').value;
  const msg     = document.getElementById('fmsg').value.trim();

  if(!name||!email||!service||!msg){showFieldError();return;}

  const btn     = document.getElementById('formSubmitBtn');
  const btnText = document.getElementById('submitBtnText');
  btn.disabled  = true;
  btnText.textContent = 'Sending...';

  // Build FormData — Web3Forms reads field names directly
  const formData = new FormData();
  formData.append('access_key', W3F_ACCESS_KEY);
  formData.append('name',       name);
  formData.append('email',      email);
  formData.append('subject',    `New Lead: ${name} — ${service}`);
  formData.append('company',    company || 'N/A');
  formData.append('phone',      phone   || 'N/A');
  formData.append('service',    service);
  formData.append('budget',     budget  || 'Not specified');
  formData.append('message',    msg);
  // Honeypot — blocks spam bots
  formData.append('botcheck',   '');

  try{
    const res  = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body:   formData
    });
    const data = await res.json();

    if(res.ok && data.success){
      showSuccess();
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch(e){
    showError(`Could not send right now. Please email us directly at globalstackdigital@gmail.com`);
    console.error('Submit error:', e);
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
}

function showSuccess(){
  const el  = document.getElementById('fsuccess');
  const err = document.getElementById('ferror');
  if(err) err.style.display = 'none';
  el.style.display = 'block';
  ['fname','fcompany','femail','fphone','fservice','fbudget','fmsg'].forEach(id=>{
    const f = document.getElementById(id); if(f) f.value = '';
  });
  setTimeout(()=>el.style.display='none', 6000);
}

function showError(msg){
  let el = document.getElementById('ferror');
  if(!el){
    el = document.createElement('div');
    el.id = 'ferror';
    el.style.cssText = 'display:none;margin-top:1rem;padding:1rem 1.25rem;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;color:#dc2626;font-size:0.875rem;font-weight:500;line-height:1.5;';
    document.getElementById('fsuccess').insertAdjacentElement('afterend', el);
  }
  document.getElementById('fsuccess').style.display = 'none';
  el.textContent = '⚠️ ' + msg;
  el.style.display = 'block';
  setTimeout(()=>el.style.display='none', 9000);
}

function showFieldError(){
  ['fname','femail','fservice','fmsg'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el.value.trim()){
      el.style.borderColor  = '#ef4444';
      el.style.boxShadow    = '0 0 0 3px rgba(239,68,68,0.1)';
      el.addEventListener('input',()=>{
        el.style.borderColor = '';
        el.style.boxShadow   = '';
      },{once:true});
    }
  });
}
