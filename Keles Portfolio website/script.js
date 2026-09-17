

const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');


if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}


const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') body.classList.add('dark');

function updateThemeIcon() {
  if (themeToggle) themeToggle.textContent = body.classList.contains('dark') ? '☀' : '☾';
}
updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem(
      'portfolio-theme',
      body.classList.contains('dark') ? 'dark' : 'light'
    );
    updateThemeIcon();
  });
}


const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));


const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(button => button.classList.remove('active'));
    filter.classList.add('active');

    const selected = filter.dataset.filter;

    cards.forEach(card => {
      const matches = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !matches);
    });
  });
});


const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    formStatus.textContent = `Thanks, ${name || 'there'}! Your message has been prepared. Connect this form to a backend/form service to receive real submissions.`;
    contactForm.reset();
  });
}


document.querySelectorAll('#year').forEach(element => {
  element.textContent = new Date().getFullYear();
});
