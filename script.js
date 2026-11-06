// ===== Header: scroll shadow + mobile menu =====
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
  })
);

// ===== Reveal on scroll =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ===== Counter animation =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => counterObserver.observe(c));

// ===== Why panel progress bars =====
const panel = document.querySelector('.why-panel');
if (panel) {
  new IntersectionObserver(([e], obs) => {
    if (e.isIntersecting) {
      panel.classList.add('visible');
      obs.disconnect();
    }
  }, { threshold: 0.3 }).observe(panel);
}

// ===== Typing code effect =====
const typedEl = document.getElementById('typed');
const codeLines = [
  '<span class="tk-c">// AiiFIGHTDev x AI Coding</span>',
  '<span class="tk-k">const</span> idea = <span class="tk-s">"แอปของคุณ"</span>;',
  '',
  '<span class="tk-k">async function</span> <span class="tk-f">build</span>(idea) {',
  '  <span class="tk-k">const</span> plan = <span class="tk-k">await</span> ai.<span class="tk-f">design</span>(idea);',
  '  <span class="tk-k">const</span> code = <span class="tk-k">await</span> ai.<span class="tk-f">generate</span>(plan);',
  '  <span class="tk-k">await</span> team.<span class="tk-f">review</span>(code);',
  '  <span class="tk-k">return</span> <span class="tk-f">deploy</span>(code); <span class="tk-c">// 🚀</span>',
  '}',
];

function typeCode() {
  const html = codeLines.join('\n');
  // พิมพ์ทีละตัวอักษร โดยข้ามแท็ก HTML ให้ครบในครั้งเดียว
  let i = 0;
  const step = () => {
    if (i >= html.length) return;
    if (html[i] === '<') i = html.indexOf('>', i);
    i++;
    typedEl.innerHTML = html.slice(0, i);
    setTimeout(step, 22);
  };
  step();
}
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typedEl.innerHTML = codeLines.join('\n');
} else {
  typeCode();
}

// ===== Contact form validation =====
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  let ok = true;
  fields.forEach((f) => {
    const valid = f.value.trim() !== '' && (f.type !== 'email' || /^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle('invalid', !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    msg.textContent = 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง';
    return;
  }
  msg.textContent = 'ขอบคุณค่ะ/ครับ เราได้รับข้อความแล้ว และจะติดต่อกลับโดยเร็ว 💜';
  form.reset();
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
