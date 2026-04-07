document.addEventListener('DOMContentLoaded', () => {

  // ── TYPED TEXT ──
  const roles = [
    'Cybersecurity Student',
    'Web Developer',
    'Based in Nepal',
    'Networking Enthusiast',
    'Always Learning...'
  ];
  let ri = 0, ci = 0, deleting = false;
  let typingTimer = null;
  const typedEl = document.getElementById('typed');

  function type() {
    if (!typedEl) return;
    const cur = roles[ri];
    if (!deleting) {
      typedEl.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; typingTimer = setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    typingTimer = setTimeout(type, deleting ? 45 : 75);
  }
  if (typedEl) typingTimer = setTimeout(type, 1200);

  // ── SCROLL REVEAL ──
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .section-heading').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      io.observe(el);
    }
  });

  // ── ACTIVE NAV ──
  const sections = document.querySelectorAll('section[id]');
  const navIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const link = document.querySelector(`nav a[href="#${e.target.id}"]`);
      if (link) link.classList.toggle('nav-active', e.isIntersecting);
    });
  }, { threshold: [0, 0.1] });
  sections.forEach(s => navIo.observe(s));

  // ── STICKY NOTE WOBBLE ──
  document.querySelectorAll('.sticky').forEach(card => {
    let r = null;
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px) rotate(0.3deg)';
      r = card.getBoundingClientRect();
    });
    card.addEventListener('mousemove', e => {
      if (!r) return;
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      card.style.transform = `rotate(${x * 1.8}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      r = null;
    });
  });

});
