// Menu
const burger = document.querySelector('.burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
}));

// "Pedir orçamento" já marca Evento no formulário
document.querySelectorAll('[data-tipo]').forEach(a => a.addEventListener('click', () => {
  const r = document.querySelector(`input[name=tipo][value="${a.dataset.tipo}"]`);
  if (r) r.checked = true;
}));

// Data mínima = hoje
const d = document.getElementById('f-data');
d.min = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

// Formulário -> WhatsApp
const form = document.getElementById('form');
const err = document.getElementById('form-err');
form.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form);
  const nome = f.get('nome').trim(), data = f.get('data'), pessoas = f.get('pessoas');
  if (!nome || !data || !pessoas) { err.hidden = false; form.querySelector(':invalid')?.focus(); return; }
  err.hidden = true;
  const dt = data.split('-').reverse().join('/');
  let msg = `Olá! Sou ${nome}. Gostaria de ${f.get('tipo') === 'Evento' ? 'um orçamento para evento' : 'reservar uma mesa'} no Aratu.\nData: ${dt}\nPessoas: ${pessoas}`;
  const obs = f.get('msg').trim();
  if (obs) msg += `\nObservações: ${obs}`;
  window.open(`https://wa.me/5582991152257?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// Entrada suave
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const els = document.querySelectorAll('.sec__head, .dish, .mosaic figure, .reviews blockquote, .press li, .split > *');
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -10% 0px' });
  els.forEach(el => { el.classList.add('rv'); io.observe(el); });
}
