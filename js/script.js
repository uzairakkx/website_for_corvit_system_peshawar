/* Corvit Systems Peshawar: interactive features */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Course data ---------- */
  const COURSES = [
    { id: 'ccna', cat: 'network', title: 'CCNA / CCNP Enterprise Networking', dur: '4 months (CCNA) + 4 months (CCNP)', level: 'Beginner to Advanced', mode: 'On-Campus Peshawar',
      blurb: 'Configure routers, switches and enterprise networks on real Cisco hardware.',
      syl: ['Network fundamentals and IP addressing', 'Switching, VLANs and STP', 'OSPF and EIGRP routing', 'ACLs, NAT and network security', 'Wireless, automation and CCNP ENCOR basics'],
      out: ['Network Engineer', 'NOC Engineer', 'Telecom Support Engineer'], pre: 'Basic computer skills. No networking experience needed for CCNA.' },
    { id: 'ceh', cat: 'cyber', title: 'Certified Ethical Hacker (CEH) & Cybersecurity', dur: '3 months', level: 'Intermediate', mode: 'On-Campus Peshawar',
      blurb: 'Learn to find and fix weaknesses with legal penetration-testing methods.',
      syl: ['Footprinting and reconnaissance', 'Scanning, enumeration and vulnerability analysis', 'System hacking and malware threats', 'Web application and wireless attacks', 'Reporting and defensive controls'],
      out: ['Penetration Tester', 'SOC Analyst', 'Security Consultant'], pre: 'Networking basics (CCNA level) and basic Linux commands.' },
    { id: 'mern', cat: 'dev', title: 'Full-Stack Web Development (MERN)', dur: '6 months', level: 'Beginner to Intermediate', mode: 'On-Campus Peshawar / Online',
      blurb: 'Build and deploy complete web apps with MongoDB, Express, React and Node.js.',
      syl: ['HTML, CSS and modern JavaScript', 'React components, hooks and routing', 'Node.js and Express REST APIs', 'MongoDB and authentication', 'Deployment and a capstone project'],
      out: ['Full-Stack Developer', 'Frontend Developer', 'Freelance Web Developer'], pre: 'Basic computer skills and logical thinking.' },
    { id: 'python', cat: 'dev', title: 'Python, Data Science & AI', dur: '5 months', level: 'Beginner to Intermediate', mode: 'On-Campus Peshawar / Online',
      blurb: 'Go from Python basics to data analysis and machine-learning projects.',
      syl: ['Python programming essentials', 'NumPy, Pandas and data cleaning', 'Visualization with Matplotlib', 'Machine learning with scikit-learn', 'Intro to deep learning and a final project'],
      out: ['Data Analyst', 'Junior ML Engineer', 'Python Developer'], pre: 'School-level mathematics. No programming experience needed.' },
    { id: 'cloud', cat: 'network', title: 'AWS & Microsoft Azure Cloud Computing', dur: '3 months', level: 'Intermediate', mode: 'On-Campus Peshawar / Online',
      blurb: 'Deploy, secure and monitor workloads on AWS and Azure.',
      syl: ['Cloud concepts and shared responsibility', 'Compute, storage and networking', 'Identity and access management', 'Monitoring, cost control and backups', 'Exam prep for AWS SAA and Azure AZ-104'],
      out: ['Cloud Engineer', 'DevOps Associate', 'Systems Administrator'], pre: 'Basic networking and operating-system knowledge.' },
    { id: 'seo', cat: 'design', title: 'Digital Marketing & SEO Mastery', dur: '3 months', level: 'Beginner', mode: 'On-Campus Peshawar / Online',
      blurb: 'Grow websites and brands with SEO, social media and paid ads.',
      syl: ['Keyword research and on-page SEO', 'Technical SEO and link building', 'Facebook and Google Ads', 'Content and email marketing', 'Analytics and reporting'],
      out: ['SEO Specialist', 'Social Media Manager', 'Freelance Marketer'], pre: 'Basic English and internet skills.' },
    { id: 'uiux', cat: 'design', title: 'Graphic Design & UI/UX', dur: '4 months', level: 'Beginner', mode: 'On-Campus Peshawar',
      blurb: 'Design logos, interfaces and prototypes with Figma and Adobe tools.',
      syl: ['Design principles, color and typography', 'Photoshop and Illustrator', 'Figma wireframes and prototypes', 'User research and usability testing', 'Portfolio building'],
      out: ['UI/UX Designer', 'Graphic Designer', 'Brand Designer'], pre: 'No prior experience needed.' },
    { id: 'flutter', cat: 'dev', title: 'Mobile App Development (Flutter)', dur: '4 months', level: 'Intermediate', mode: 'On-Campus Peshawar / Online',
      blurb: 'Build Android and iOS apps from one Dart codebase.',
      syl: ['Dart language fundamentals', 'Flutter widgets and layouts', 'State management', 'REST APIs and Firebase', 'Publishing to the Play Store'],
      out: ['Flutter Developer', 'Mobile App Developer'], pre: 'Basic programming knowledge in any language.' }
  ];

  const TESTIMONIALS = [
    { q: 'The real Cisco lab made everything click. Two months after CCNA I joined a telecom company in Peshawar as a network engineer.', n: 'Hamza Khan', r: 'CCNA graduate, now Network Engineer' },
    { q: 'The MERN course was project-first. My capstone became my portfolio and helped me land a job at a local software house.', n: 'Sana Gul', r: 'MERN graduate, now Junior Developer' },
    { q: 'CEH labs showed me how attacks really work. I now work in a security operations team and still use my lab notes.', n: 'Bilal Afridi', r: 'CEH graduate, now SOC Analyst' }
  ];

  /* ---------- Navigation ---------- */
  const burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('#menu a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Course catalog ---------- */
  const grid = $('#courseGrid');
  grid.innerHTML = COURSES.map(c => `
    <article class="card" data-cat="${c.cat}">
      <h3>${c.title}</h3>
      <p>${c.blurb}</p>
      <div class="tags"><span class="tag">⏱ ${c.dur}</span><span class="tag">${c.level}</span><span class="tag">${c.mode}</span></div>
      <div class="card-btns">
        <button class="btn btn-outline" data-details="${c.id}">Details</button>
        <button class="btn btn-primary" data-enroll="${c.id}">Enroll</button>
      </div>
    </article>`).join('');

  $('#filters').addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    $$('.chip').forEach(c => c.classList.toggle('active', c === chip));
    const f = chip.dataset.filter;
    $$('.card', grid).forEach(card => card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f));
  });

  /* ---------- Course modal ---------- */
  const modal = $('#modal');
  let current = null, lastFocus = null;
  const openModal = id => {
    current = COURSES.find(c => c.id === id); if (!current) return;
    lastFocus = document.activeElement;
    $('#mTitle').textContent = current.title;
    $('#mMeta').textContent = `${current.dur} · ${current.level} · ${current.mode}`;
    $('#mSyl').innerHTML = current.syl.map(s => `<li>${s}</li>`).join('');
    $('#mOut').innerHTML = current.out.map(s => `<li>${s}</li>`).join('');
    $('#mPre').textContent = current.pre;
    modal.hidden = false; document.body.style.overflow = 'hidden';
    $('#mClose').focus();
  };
  const closeModal = () => { modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  const enroll = id => {
    const c = COURSES.find(x => x.id === id);
    if (!modal.hidden) { modal.hidden = true; document.body.style.overflow = ''; }
    $('#fcourse').value = c.title;
    $('#admissions').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => $('#fname').focus({ preventScroll: true }), 600);
  };
  grid.addEventListener('click', e => {
    const d = e.target.closest('[data-details]'), n = e.target.closest('[data-enroll]');
    if (d) openModal(d.dataset.details);
    if (n) enroll(n.dataset.enroll);
  });
  $('#mClose').addEventListener('click', closeModal);
  $('#mEnroll').addEventListener('click', () => enroll(current.id));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  /* ---------- Stats counter (runs once when visible) ---------- */
  const counters = $$('[data-count]');
  const run = el => {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1600;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .6 });
    counters.forEach(c => io.observe(c));
  } else counters.forEach(c => c.textContent = (+c.dataset.count).toLocaleString('en-US'));

  /* ---------- Testimonial slider ---------- */
  const track = $('#track'), dots = $('#dots');
  track.innerHTML = TESTIMONIALS.map(t => `<div class="slide"><blockquote>“${t.q}”<cite><b>${t.n}</b>, ${t.r}</cite></blockquote></div>`).join('');
  dots.innerHTML = TESTIMONIALS.map((_, i) => `<button aria-label="Show testimonial ${i + 1}" data-i="${i}"></button>`).join('');
  let idx = 0, timer;
  const show = i => {
    idx = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === idx));
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => show(idx + 1), 6000); };
  $('#prev').addEventListener('click', () => { show(idx - 1); auto(); });
  $('#next').addEventListener('click', () => { show(idx + 1); auto(); });
  dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { show(+b.dataset.i); auto(); } });
  show(0); auto();

  /* ---------- Admission form ---------- */
  const form = $('#admissionForm'), sel = $('#fcourse');
  COURSES.forEach(c => sel.add(new Option(c.title, c.title)));

  const rules = {
    name: v => v.trim().length >= 3 || 'Enter your full name (at least 3 characters).',
    phone: v => /^(\+92|0092|0)?3\d{9}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a valid Pakistani mobile number, for example 0300 1234567.',
    course: v => v !== '' || 'Select the course you want to join.',
    shift: v => v !== '' || 'Choose a preferred shift.'
  };
  const val = n => n === 'shift' ? (form.querySelector('[name=shift]:checked') || {}).value || '' : form.elements[n].value;
  const check = n => {
    const res = rules[n](val(n)), msg = res === true ? '' : res;
    form.querySelector(`.err[data-for=${n}]`).textContent = msg;
    const field = form.elements[n]; if (n !== 'shift') field.classList.toggle('invalid', !!msg);
    return !msg;
  };
  Object.keys(rules).forEach(n => {
    const f = form.elements[n]; const nodes = f.length ? [...f] : [f];
    nodes.forEach(el => el.addEventListener('change', () => check(n)));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { const bad = form.querySelector('.invalid'); if (bad) bad.focus(); return; }
    const btn = $('#submitBtn'); btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() });
      if (!res.ok) throw new Error('Request failed');
      const first = form.elements.name.value.trim().split(' ')[0];
      form.innerHTML = `<div class="confirm" role="status"><h3>Thank you, ${first.replace(/[<>&"]/g, '')}!</h3><p>We received your admission request. A Corvit counselor will contact you on WhatsApp or phone within one working day.</p></div>`;
    } catch (err) {
      btn.disabled = false; btn.textContent = 'Send admission request';
      alert('Your request could not be sent. Check your connection and try again, or call +92 300 1234567.');
    }
  });
})();

/* ===== AI COUNSELOR (Dify via Netlify Function) ===== */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const fab = $('#aiFab'), panel = $('#aiPanel'), log = $('#aiLog'), form = $('#aiForm'),
        input = $('#aiInput'), send = $('#aiSend'), chips = $('#aiChips');
  const ENDPOINT = '/.netlify/functions/dify-chat';
  const CID = 'corvit_dify_conversation_id', UID = 'corvit_dify_user_id';
  const WELCOME = 'Assalam o Alaikum! I am the Corvit AI Counselor. Ask me about courses, duration, batch timings or how to apply.';
  const SUGGEST = ['Which course suits me?', 'Batch timings', 'How do I apply?'];

  /* Safe storage wrappers (storage can be blocked in private mode) */
  const ss = {
    get: k => { try { return sessionStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} },
    del: k => { try { sessionStorage.removeItem(k); } catch {} }
  };
  const userId = (() => {
    let id = null;
    try { id = localStorage.getItem(UID); } catch {}
    if (!id) {
      id = 'web-' + (window.crypto && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36));
      try { localStorage.setItem(UID, id); } catch {}
    }
    return id;
  })();

  /* Small, safe markdown renderer: escapes HTML first, then formats */
  const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const inline = s => esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const md = text => {
    const out = []; let list = null;
    const close = () => { if (list) { out.push(`</${list}>`); list = null; } };
    for (const raw of text.replace(/\r/g, '').split('\n')) {
      const line = raw.trimEnd(); let m;
      if ((m = line.match(/^\s*[-*•]\s+(.*)/))) {
        if (list !== 'ul') { close(); out.push('<ul>'); list = 'ul'; }
        out.push(`<li>${inline(m[1])}</li>`);
      } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)/))) {
        if (list !== 'ol') { close(); out.push('<ol>'); list = 'ol'; }
        out.push(`<li>${inline(m[1])}</li>`);
      } else {
        close();
        if (!line.trim()) continue;
        out.push((m = line.match(/^#{1,4}\s+(.*)/)) ? `<p><strong>${inline(m[1])}</strong></p>` : `<p>${inline(line)}</p>`);
      }
    }
    close();
    return out.join('');
  };

  /* Message helpers */
  const add = (cls, html, asText) => {
    const d = document.createElement('div');
    d.className = 'ai-msg ' + cls;
    asText ? (d.textContent = html) : (d.innerHTML = html);
    log.appendChild(d); log.scrollTop = log.scrollHeight;
    return d;
  };
  const typing = () => add('ai-bot ai-typing', '<i></i><i></i><i></i>');

  const autosize = () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; };
  const reset = () => {
    ss.del(CID); log.innerHTML = ''; add('ai-bot', md(WELCOME));
    chips.hidden = false;
  };

  /* Open / close */
  const toggle = open => {
    panel.hidden = !open; fab.hidden = open; fab.setAttribute('aria-expanded', open);
    if (open) input.focus(); else fab.focus();
  };
  fab.addEventListener('click', () => toggle(true));
  $('#aiClose').addEventListener('click', () => toggle(false));
  $('#aiReset').addEventListener('click', reset);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) toggle(false); });

  /* Chat */
  let busy = false;
  async function ask(text, retried) {
    text = text.trim();
    if (!text || (busy && !retried)) return;
    busy = true; send.disabled = true; chips.hidden = true;
    if (!retried) { add('ai-user', text, true); input.value = ''; autosize(); }
    const wait = typing();
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, conversation_id: ss.get(CID) || '', user: userId })
      });
      const data = await res.json().catch(() => ({}));
      // Expired/unknown conversation: start fresh once and resend
      if (res.status === 404 && ss.get(CID) && !retried) { ss.del(CID); wait.remove(); return ask(text, true); }
      if (!res.ok) throw new Error(data.error || 'Request failed');
      if (data.conversation_id) ss.set(CID, data.conversation_id);
      wait.remove();
      add('ai-bot', md(data.answer || 'Sorry, I have no answer for that. Please rephrase your question.'));
    } catch (err) {
      wait.remove();
      add('ai-bot ai-err', esc(err.message && err.message !== 'Failed to fetch' ? err.message : 'Connection problem. Check your internet and try again.'));
    } finally {
      busy = false; send.disabled = false; input.focus();
    }
  }

  form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
  input.addEventListener('input', autosize);
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); } });
  chips.innerHTML = SUGGEST.map(s => `<button type="button">${s}</button>`).join('');
  chips.addEventListener('click', e => { if (e.target.tagName === 'BUTTON') ask(e.target.textContent); });

  add('ai-bot', md(WELCOME));
})();
