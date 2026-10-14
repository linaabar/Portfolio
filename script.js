/* =========================================================
   Portfolio Lina Abarou : interactions
   ========================================================= */

/* ---------- Menu burger ---------- */
const burger = document.querySelector('.burger');
const nav = document.getElementById('menu');

function setMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('is-open', open);
}

burger.addEventListener('click', () => {
  setMenu(burger.getAttribute('aria-expanded') !== 'true');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setMenu(false);
});

/* ---------- Lien actif dans le menu ---------- */
const navLinks = [...nav.querySelectorAll('a')];
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));

/* ---------- Filtrage des projets ---------- */
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    projects.forEach(p => {
      const cats = p.dataset.cat.split(' ');
      p.hidden = value !== 'all' && !cats.includes(value);
    });
  });
});

/* ---------- Copier l'adresse e-mail ---------- */
const copyBtn = document.querySelector('.copy-btn');

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const text = copyBtn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Adresse copiée';
    } catch (e) {
      copyBtn.textContent = text;
    }
    setTimeout(() => { copyBtn.textContent = "Copier l'adresse"; }, 2500);
  });
}

/* ---------- Année du pied de page ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
